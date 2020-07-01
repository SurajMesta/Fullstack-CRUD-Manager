import React,{useState} from 'react'
import {Link,useHistory} from 'react-router-dom'




 const Signup = () => {
     const[username,setName]=useState("")
     const[password,setPassword]=useState("")
     const[email,setEmail]=useState("")
     const history=useHistory()

     const usernameChange=(val)=>{
       setName(val)
       console.log(username)
     }

         const passwordChange=(val)=>{
       setPassword(val)
       console.log(password)
     }

         const emailChange=(val)=>{
       setEmail(val)
       console.log(email)
     }

     const handleonSubmit=(e)=>{
         e.preventDefault()
        
         fetch('http://localhost:5000/signup',{
             method:'post',
            
            
          
             headers:{
                 'Accept':'application/json',
                 'Content-Type':'application/json',
                 
             },
             body:JSON.stringify({
                 username,
                 password,
                email
             })
           
         }).then(res=> res.json()).then(data=> {alert(data.message)
         history.push('/signin')}
         ).catch(err=>{
            
             console.log(err)
         })

     }

     
    return (
        <div className="container">
            <div className="card" style={{width:'50%',margin:'auto',marginTop:'40px'}}>
                <div className="card-title text-center">Signup</div>
                <div className="card-body">
                   <form onSubmit={(e)=>{
                       handleonSubmit(e)
                   }}>
                    <div className="form-group">
                        <label htmlFor="">Username:</label>
                        <input type="text" className="form-control"  name="name" value={username} placeholder="Please Enter Username" autoFocus  onChange={(e)=>{
                            usernameChange(e.target.value)
                        }}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Password:</label>
                        <input type="password" className="form-control"  name="password" value={password} placeholder="Please Enter Password"   onChange={(e)=>{
                         passwordChange(e.target.value)
                        }}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Email</label>
                        <input type="email" className="form-control" name="email"  value={email} placeholder="someone@example.com"  onChange={(e)=>{
                              emailChange(e.target.value)
                        }}/>
                    </div>
                    <div className="form-group text-center">
                        <button type="submit" className="btn btn-md btn-success">Submit</button>
                    </div>
                   </form>
                </div>

                <div className="card-footer text-center">
                    <Link to="/signin" style={{textDecoration:'none'}}>Already Have an Account?</Link>
                </div>
            </div>
        </div>
    )
}

export default Signup
