const mongoose=require('mongoose')
const {ObjectId}=mongoose.Schema.Types


const taskSchema= new mongoose.Schema({
    task:{type:String,required:true},
    createdby:{
        type:ObjectId,
        ref:"User"
    }
})

mongoose.model("Tasks",taskSchema)