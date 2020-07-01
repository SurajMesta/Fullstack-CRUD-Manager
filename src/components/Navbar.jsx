import React,{useState,useEffect}from 'react'
import {Link,useHistory} from 'react-router-dom'



 const Navbar = () => {
   const[user,setUser]=useState("Not Yet Available")
   const[status,setStatus]=useState("signed-out")
   let history=useHistory()

  const clearItems=()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('user')

  }

  useEffect(()=>{
    if(localStorage.getItem('user')){
      setUser(JSON.parse(localStorage.getItem('user')))
      setStatus('Logged In')

    }
    else{
      setUser("No User Available")
      setStatus("No Status Available")
    }
  },[user])


    return (
    <nav className="navbar navbar-expand-md bg-dark navbar-dark">
  <Link to="#" className="navbar-brand">TaskManager</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="collapsibleNavbar">
    <ul className="navbar-nav ml-auto">
        <li className="nav-item" id="p-li">
        <Link className="nav-link">Profile <i class="fas fa-user-circle fa-2x"></i></Link>
      
    <div id="c-li"><p className="text-center" style={{color:'snow',padding:'10px'}}>User: {user}</p>
    <p style={{color:'snow'}} className="text-center">Status: {status}</p>
       
        
        </div>
      </li>
      <li className="nav-item">
        <Link className="nav-link"  onClick={()=>{
           clearItems()
           history.push('/signin')
           window.location.reload()
        }}>Logout<i class="fas fa-sign-out-alt fa-2x"></i></Link>
      </li>
      
   
     
       
    </ul>
  </div>  
</nav>
       
    )
}

export default Navbar
