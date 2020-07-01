import React,{createContext,useState,useEffect} from 'react'

export const Tasklistcontext= createContext()

const TasklistContextProvider=(props)=>{
   const[tasks,setTasks] =useState([])
   const[edititem,setTheEdititem]=useState(null)
   let token=""



   useEffect(()=>{
          if(localStorage.getItem('token')){
          
          token='Bearer '+JSON.parse(localStorage.getItem('token'))
          fetch('http://localhost:5000/home',{
              method:'GET',
              headers:{
                  'Content-Type':'application/json',
                  'Authorization':token
              }
          }).then(res=> res.json()).then(data=> {
              setTasks(data)
          
          } ).catch(err=> console.log(err))
          }
           
      
       
     })

     const setEdititem=(id)=>{
         console.log('-------')
        const foundData=tasks.find((item)=>item._id===id)
         console.log(foundData)
        setTheEdititem(foundData)
        console.log(edititem)




     }

     const updateItem=(_id,task)=>{
         fetch('http://localhost:5000/home',{
             method:'put',
             headers:{
                 'Accept':'application/json',
                 'Authorization':'Bearer '+JSON.parse(localStorage.getItem('token')),
                 'Content-Type':'application/json',
             },
             body:JSON.stringify({
                 _id,
                 task,

             })
         }
         

         ).then(res=> res.json()).then(data=> alert(data.message)).catch(err=>{
             alert(err.message)
         })
       
         setTheEdititem(null)
     }

     const deleteFun=(_id)=>{
         fetch('http://localhost:5000/home',{
             method:'delete',
             headers:{
                 'Accept':'application/json',
                 'Authorization':'Bearer '+JSON.parse(localStorage.getItem('token')),
                 'Content-Type':'application/json'
             },
             body:JSON.stringify({
                 _id,
             })
         }).then(res=> res.json()).then(data=> alert(data.message)).catch(err=> alert(err.message))
      

         
        
     }





   
 return(
     <Tasklistcontext.Provider value={{tasks,setEdititem,edititem,updateItem,deleteFun,updateItem}}>
         {props.children}
     </Tasklistcontext.Provider>
 )

}

export default TasklistContextProvider