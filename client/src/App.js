import React, { useState } from 'react';
import './App.css';
import Login from './conponents/login/login';
import axios from 'axios';
import { Redirect, Switch, Route } from 'react-router-dom';
import Profile from './conponents/Profile/Profile';

function App() {

  let [redirectToProfile, setRedirectToProfile] = useState(false);
  let [redirectToSignup, setRedirectToSignup] = useState(false);

  const loginButtonClickHandler = (event, isLogin, username, password) => {
    event.preventDefault();
    if (isLogin) {
      loginUser('http://localhost:4000/login', username, password);
    }
    else {
      loginUser('http://localhost:4000/signup', username, password);
    }
  }

  const loginUser = (url, username, password) => {
    axios.post(url, {
      username,
      password
    }).then((res) => {
      if (res.data.success) {
        console.log(res);
        setRedirectToProfile(true)
      }
      else
        setRedirectToSignup(true)
    }).catch(err => {
      console.log(err);
      setRedirectToSignup(true)
    })
  }

  return (
    <div>
    <Switch>
      <Route path='/login' render={()=><Login click={loginButtonClickHandler} isLogin={true} />} />
      <Route path='/signup' render={()=><Login click={loginButtonClickHandler} isLogin={false} />} />
      <Route path='/profile' component={Profile} />
    </Switch>
    <div className="App">
      <Redirect from='/' to='/login'/>
      {redirectToProfile ?
        <Redirect to='/profile' /> :
        redirectToSignup ?
          <Redirect to='/signup' /> :
          null
      }
    </div>
    </div>
  );
}

export default App;
