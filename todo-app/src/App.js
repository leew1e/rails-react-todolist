/*
import React, { Component } from 'react';
import './App.css';
// Импорт пользовательского компонента
import TodosContainer from './components/TodosContainer'

function App() {
  return (
    <div className='main-container'>
      <div>
        <h1>Todo list:</h1>
      </div>
      <TodosContainer />
    </div>
  );
}

export default App;
*/

import React, { Component } from 'react';
import axios from 'axios'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './components/Home';
import Signup from './components/SignUp';

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
          this.handleLogin(response)
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
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={<Home/>} />
            <Route exact path='/login' component={<Login/>} />
            <Route exact path='/signup' component={<Signup/>} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
};
export default App;
