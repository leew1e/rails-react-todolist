import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Signup from './components/registrations/Signup';
import Login from './components/registrations/Login';

class App extends Component {
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
    axios.get('http://localhost:3000/logged_in', { withCredentials: true })
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
      <div>
        {console.log("app", this.state)}
        
        <BrowserRouter>
          <Routes>
            <Route
            path='/'
            element={<Home {...{user_id: this.state.user.id, isLoggedIn: this.state.isLoggedIn, handleLogout: this.handleLogout}} />}
            />
            <Route
              path='/login'
              element={<Login {...{isLoggedIn: this.state.isLoggedIn, handleLogin: this.handleLogin}}/>}
            />
            <Route
              path='/signup'
              element={<Signup {...{isLoggedIn: this.state.isLoggedIn, handleLogin: this.handleLogin}}/>}
            />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
};
export default App;
