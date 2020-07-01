import React,{useState,useContext,useEffect} from 'react'
import{Tasklistcontext} from '../context/Tasklistcontext'
import Taskuser from './Taskuser'

 const Taskform = () => {
     const{edititem,updateItem}=useContext(Tasklistcontext)
      const [task,setTask]=useState("")
      
       const formonSubmit=(e)=>{
         e.preventDefault()
         console.log('Form submitted')

         if(edititem!==null){
           
             updateItem(edititem._id,task)

         }
         else{
               

               fetch('http://localhost:5000/home',{
             method:'post',
            
            
          
             headers:{
                 'Accept':'application/json',
                 'Authorization':'Bearer '+JSON.parse(localStorage.getItem('token')),
                 'Content-Type':'application/json',
                 
             },
             body:JSON.stringify({
              task,
             })
           
         }).then(res=> res.json()).then(data=> alert(data.message)).catch(err=>{
            
             console.log(err)
         })


         setTask("")
               
         }
        
         
             
       

         
     }

       const handleOnChange=(data)=>{
         
         setTask(data)
         console.log(task)

     }

     useEffect(()=>{
         if(edititem!==null){
             setTask(edititem.task)
         }
         else{
             setTask("")
         }
     },[edititem])
    return (
        <div>
                 <form onSubmit={(e)=>{
                formonSubmit(e)
            }}>
                       <div className="form-group">
                           <label htmlFor="">Task:</label>
                           <input type="text" className="form-control" value={task} autoFocus onChange={(e)=>{
                               handleOnChange(e.target.value)
                           }}/>
                       </div>

                       <div className="form-group">
                        <button type="submit" className="btn btn-md btn-success">{edititem?('Update'):('Add')}</button>
                       </div>
                   </form>
                   <Taskuser/>
        </div>
    )
}

export default Taskform
