import React ,{useContext}from 'react'
import {Tasklistcontext} from '../context/Tasklistcontext'

 const Taskdisp = (props) => {
  
     const {item}=props
     const {setEdititem,deleteFun}= useContext(Tasklistcontext)

    const onClickedit=(id)=>{
       
        setEdititem(id)

    }

    const delItem=(id)=>{
        deleteFun(id)
    }

    

    return (
        <div>
         
         <ul className="list-group" key={item._id}>
          <li className="list-group-item">{item.task}
          <div>
           <button className="btn btn-sm btn-info glyphicon glyphicon-edit" onClick={()=>{
               onClickedit(item._id)
           }}>Edit</button>
          <button className="btn btn-sm btn-warning glyphicon glyphicon-trash" onClick={()=>{
            delItem(item._id)
          }}>Delete</button>
          </div>
      
          </li>
          </ul>
        </div>
 
                
    
    )
}


export default Taskdisp
