import React ,{useState}from 'react'
import {Link,useHistory} from 'react-router-dom'

const Signin = () => {
    const history=useHistory()
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")

    const emailChange=(val)=>{
        setEmail(val)
        console.log(email)

    }

    const passChange=(pass)=>{
        setPassword(pass)
        console.log(password)
    }

    const handleSubmit=(e)=>{
        e.preventDefault()

        fetch('http://localhost:5000/signin',{
            method:'post',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
            },
            body:JSON.stringify({
                email,
                password
            })
        }).then(res=>res.json()).then(data=>{
            console.log(data.token)
            if(data.token===undefined){
                alert(data.message)
                console.log('Token Invalid')
            }
            else{
              localStorage.setItem('token',JSON.stringify(data.token))
              console.log('Token valid')
              localStorage.setItem('user',JSON.stringify(email)) /*Added to test*/
            }

           
            if(data.message===undefined){
                alert('Signin Success')
                history.push('/home')
                window.location.reload()
            }
            else{
                alert(data.message)
                history.push('/signin')
                
            }
        }).catch(err=>console.log(err))


    }
    return (
          <div className="container">
            <div className="card" style={{width:'50%',margin:'auto',marginTop:'40px'}}>
                <div className="card-title text-center">SignIn</div>
                <div className="card-body">
                   <form onSubmit={(e)=>{
                   handleSubmit(e)
                   }}>
                   
                      <div className="form-group">
                        <label htmlFor="">Email</label>
                        <input type="email" className="form-control" name="email" value={email} placeholder="someone@example.com"  autoFocus onChange={(e)=>{
                       emailChange(e.target.value)
                        }}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="">Password:</label>
                        <input type="password" className="form-control" value={password} name="password" placeholder="Please Enter Password"  onChange={(e)=>{
                       passChange(e.target.value)
                        }}/>
                    </div>
                 
                    <div className="form-group text-center">
                        <button type="submit" className="btn btn-md btn-success">Submit</button>
                    </div>
                   </form>
                </div>

                <div className="card-footer text-center">
                    <Link to="/signup" style={{textDecoration:'none'}}>Don't Have an Account?</Link>
                </div>
            </div>
        </div>
    )
}

export default Signin
