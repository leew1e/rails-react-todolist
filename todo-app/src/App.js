import React, { Component } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom'
import Home from './components/Home';
import Signup from './components/registrations/Signup';
import Login from './components/registrations/Login';
import { Routes, Route } from 'react-router-dom';
import AuthenticationForm from './components/AuthenticationForm';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      user: {}
    };
  };

  handleLogin = (data) => {
    this.setState({
      isLoggedIn: true,
      user: data.user
    })
  }

  handleLogout = () => {
    this.setState({
      isLoggedIn: false,
      user: {}
    })
  }

  loginStatus = () => {
    const checkLogin = 'http://localhost:3000/logged_in';
    axios.get(checkLogin, { withCredentials: true })
      .then(response => {
        if (response.data.logged_in) {
          this.handleLogin(response.data)
        } else {
          this.handleLogout()
        }
      })
      .catch(error => console.log('api errors:', error))
  };

  componentDidMount() {
    this.loginStatus()
  }

  render() {
    return (
      <div class="">
        <Routes>
          <Route path='/home' 
            element={<Home 
                user_id = {this.state.user.id} 
                isLoggedIn = {this.state.isLoggedIn} 
                handleLogout = {this.handleLogout}/>} 
          />
          <Route path='/auth' 
            element={<AuthenticationForm />} 
          /> 
            <Route path='/login' 
              element={<Login 
                isLoggedIn = {this.state.isLoggedIn} 
                handleLogin = {this.handleLogin}/>} 
            />
            <Route path='/signup' 
              element={<Signup 
                isLoggedIn = {this.state.isLoggedIn} 
                handleLogin = {this.handleLogin}/>} 
            />   
            <Route path='*' 
              element={<Navigate to="/home" />} 
            />    
        </Routes>
      </div>
    );
  }
};
