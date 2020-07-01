const express= require('express')
const route=express.Router()

const verifyToken = require('./verifyToken')
const mongoose= require('mongoose')
const Task= mongoose.model('Tasks')





route.get('/home',verifyToken,(req,res)=>{
    Task.find({createdby:req.user._id}).populate("createdby","username email").then(data=>{
        if(data[0]==null){
       res.json({message:"No Task Found Yet...."})
      
        }
        else{
          res.json(data)
               
            
        }
        
    }).catch(err=>{
        res.send(err)
    })
})

route.post('/home',verifyToken,(req,res)=>{
    const{task}=req.body

    const taskfeed= new Task({task,
        createdby:req.user})
    taskfeed.save().then(data=>{
        res.json({message:"Task Saved"})
    }).catch(err=>{
        res.json({message:"Task Failed"})
    })


})

route.put('/home',verifyToken,(req,res)=>{
  
Task.findByIdAndUpdate({_id:req.body._id},{$set:{task:req.body.task}}).then(data=> res.json({message:"Update Success"})).catch(err=> res.json({message:'Update Failed'}))
 
})

route.delete('/home',verifyToken,(req,res)=>{
    Task.findByIdAndDelete({_id:req.body._id}).then(data=>{
        res.json({message:"Deletion Success"})
    }).catch(err=>{
        res.json({message:"Deletion Failed"})
    })
})

module.exports=route