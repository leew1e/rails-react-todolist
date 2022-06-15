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
    localStorage.setItem('token', data.token)
  }

  handleLogout = () => {
    this.setState({
      isLoggedIn: false,
      user: {}
    })
    localStorage.removeItem('token')
  }

  loginStatus = () => {
    axios.get("/api/v1/logged_in", { withCredentials: true })
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
    const auth = this.state.isLoggedIn;

    return (
      <div class="">
        <Routes>
          <Route path='/home'
            element={auth
              ? <Home
                user_id={this.state.user.id}
                isLoggedIn={this.state.isLoggedIn}
                handleLogout={this.handleLogout} />
              : <Navigate to="/auth" replace />
            }
          />
          <Route path='/auth'
            element={!auth
              ? <AuthenticationForm />
              : <Navigate to="/home" replace />
            }
          />
          <Route path='/login'
            element={!auth
              ? <Login
                isLoggedIn={this.state.isLoggedIn}
                handleLogin={this.handleLogin} />
              : <Navigate to="/home" replace />
            }
          />
          <Route path='/signup'
            element={!auth
              ? <Signup
                isLoggedIn={this.state.isLoggedIn}
                handleLogin={this.handleLogin} />
              : <Navigate to="/home" replace />
            }
          />
          <Route path='*'
            element={<Navigate to="/auth" />}
          />
        </Routes>
      </div>
    );
  }
};
