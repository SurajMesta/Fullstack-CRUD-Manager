import React,{useContext,useEffect,useState} from 'react'
import {useHistory} from 'react-router-dom'

import{Tasklistcontext} from '../context/Tasklistcontext'
import Taskdisp from './Taskdisp'
import Taskform from './Taskform'

  
 const Home = () => {
     const{tasks}=useContext(Tasklistcontext)
     const[disp,setDisp]=useState(false)
    
    let token=""
    const history=useHistory()
   
 

     useEffect(()=>{
       
     
          if(localStorage.getItem('token')){
         
          token='Bearer '+JSON.parse(localStorage.getItem('token'))
          fetch('http://localhost:5000/home',{
              method:'GET',
              headers:{
                  'Content-Type':'application/json',
                  'Authorization':token
              }
          }).then(res=> res.json()).then(data=> history.push('/home') ).catch(err=> console.log(err))
          }
          else{
              alert('Please login')
              history.push('/signin')

          }
      
       
     },[token])



    

    return (
       <div style={{width:'50%',margin:"auto"}}>
          <Taskform/>
           <button onClick={()=>{
        
               setDisp(true)
           }} className="btn btn-md btn-success">View Tasks</button>
           <button className="btn btn-md btn-warning" onClick={()=>{
               setDisp(false)
           }}>Close Tasks</button>

           {disp?(
                <div>
            
                 {tasks.length?(
                     <div>
                    
                         {tasks.map((item)=>{
                            
                            return <Taskdisp item={item} key={item._id} />
                             
                             
                         })}
                     </div>
                 ):(<div>
                     <h2>No Tasks Yet....</h2>
                 </div>)}
           </div>
           ):(null)}
          
      
       </div>
    )
}

export default Home
