import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errors: ''
        };
    }

    handleChange = (event) => {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    };

    handleSubmit = (event) => {
        event.preventDefault()

        const { username, password } = this.state

        let user = {
            username: username,
            password: password
        }

        axios.post('http://localhost:3000/login', { user }, { withCredentials: true })
            .then(response => {
                if (response.data.logged_in) {
                    this.props.handleLogin(response.data)
                    this.redirect()
                } else {
                    this.setState({
                        errors: response.data.errors
                    })
                }
            })
            .catch(error => console.log('API errors:', error))
    };

    redirect = () => {
        this.props.history.push('/')
    }

    componentWillMount() {
        return this.props.isLoggedIn ? this.redirect() : null
    }

    handleErrors = () => {
        return (
            <div>
                <ul>
                    {this.state.errors.map(error => {
                        return <li key={error}>{error}</li>
                    })}
                </ul>
            </div>
        )
    };

    render() {
        const { username, password } = this.state
        console.log("login", this.props)
        return (
            <div>
                <h1>Log In</h1>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label for="username">User</label>
                        <input
                            placeholder="username"
                            type="text"
                            name="username"
                            id="username"
                            value={username}
                            onChange={this.handleChange} />
                    </div>
                    <div>
                        <label for="password">Password</label>
                        <input
                            placeholder="password"
                            type="password"
                            name="password"
                            id="password"
                            value={password}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <button placeholder="submit" type="submit">
                            Log In
                        </button>
                    </div>
                    <div>
                        or <Link to='/signup'>Sign up</Link>
                    </div>

                </form>
                <div>
                    {
                        this.state.errors ? this.handleErrors() : null
                    }
                </div>
            </div>
        );
    }
}
export default Login;