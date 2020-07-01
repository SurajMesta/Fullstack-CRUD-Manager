const express= require('express')
const router=express.Router()
const bcrypt= require('bcryptjs')
const mongoose=require('mongoose')
const User= mongoose.model('User')
const joi= require('@hapi/joi')
const jwt= require('jsonwebtoken')
const {TOKEN_SECRET}=require('../config/config')





const userCheck={
    signupValidation:joi.object({
        username:joi.string().required().max(10).min(3),
        password:joi.string().required().max(20).min(5),
        email:joi.string().required().email().max(40).min(10)
    })
}

router.post('/signup',(req,res)=>{

    const {username,password,email}=req.body
    if(!username || !password || !email){
        res.json({message:"Please Enter all the fields "})
    }
    else{
           User.findOne({email:email}).then(data=>{
        if(data){
            res.json({message:"Email Already exists please use a different one"})
        }
        else{
            let valid=userCheck.signupValidation.validate(req.body)

            if(valid.error){
                res.json({message:valid.error.details[0].message})
            }
            else{
                    bcrypt.genSalt(10,(err,salt)=>{
                bcrypt.hash(password,salt,(err,hash)=>{
                    if(err){
                        res.send(err) 
                    }
                    else{
                        let user= new User({username,password:hash,email})
                        user.save().then(myData=>{
                            res.status(200).json({message:"Signup Successful.Please Login"})
                        }).catch(err=>{
                            res.status(400).json({message:"Signup Failed.Please Try again later"})
                        })
                    }
                })
            })

            }
        
        }
    })

    }

 
   
})

router.post('/signin',(req,res)=>{
    const {email,password}=req.body

    if(!email || !password){
        res.status(401).json({message:"Please Enter Email and Password"})
    }

    else{
     User.findOne({email:email}).then(data=>{
         if(data){
             bcrypt.compare(password,data.password,(err,isMatch)=>{
                 if(isMatch){
                     
                     let token=jwt.sign({_id:data._id},TOKEN_SECRET)
                     res.json({token:token})
        
                 }
                 else{
                     res.status(400).json({message:"Email/Password is Wrong"})
                 }
             })
         }
         else{
             res.status(400).json({message:"Email/Password is Wrong"})
         }
     }).catch(err=>{
         res.status(400).json({message:"Email/Password is Wrong"})
     })
    }
})








module.exports=router