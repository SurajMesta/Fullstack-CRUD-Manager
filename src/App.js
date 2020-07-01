import React from 'react';
import logo from './logo.svg';
import './App.css';
import Signin from './components/Signin'
import Signup from './components/Signup'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Taskuser from './components/Taskuser'
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
import TasklistContextProvider from './context/Tasklistcontext'

class App extends React.Component{
  render(){
     return(
       <Router>
         <Navbar/>
         <TasklistContextProvider>
           <Switch>
           <Route exact path="/" component={Signup}/>
           <Route exact path="/signup" component={Signup}/>
           <Route exact path="/signin" component={Signin} />
            <Route exact path="/home" component={Home} />
        
         </Switch>
         </TasklistContextProvider>
       
       </Router>
     )
  }
}

export default App;
