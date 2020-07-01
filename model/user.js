const mongoose= require('mongoose')


let userSchema= new mongoose.Schema({
    username:{type:String,required:true,max:10,min:3},
    password:{type:String,required:true,max:20,min:5},
    email:{type:String,required:true,max:40,min:10}
})



mongoose.model('User',userSchema)