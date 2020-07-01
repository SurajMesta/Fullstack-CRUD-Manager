const jwt= require('jsonwebtoken')
const {TOKEN_SECRET}= require('../config/config')
const mongoose= require('mongoose')
const User=mongoose.model('User')

module.exports=(req,res,next)=>{

const {authorization}= req.headers

if(!authorization){
    res.send('Please login....')
}

else{
    const token= authorization.replace("Bearer ","")
    jwt.verify(token,TOKEN_SECRET,(err,payload)=>{
        if(err){
            res.send('Please Login...')
        }
        else{
            const {_id}=payload

            User.findById({_id}).then(data=>{
                req.user=data
                next()
            })
        }
    })
}

}
