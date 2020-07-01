const express= require('express')
const app= express()
const PORT= Number(process.env.PORT || 5000)
const mongoose= require('mongoose')
const {DB}=require('./config/config')

require('./model/user')
require('./model/taskslist')

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/taskList'))


mongoose.connect(DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

mongoose.connection.on('connected',()=>{
    console.log('DB Connection Success')
})

mongoose.connection.on('error',(err)=>{
    console.log('DB Connection Failed')
})

app.listen(PORT,()=>{
    console.log(`Server started at PORT ${PORT}`)
})