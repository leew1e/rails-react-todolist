import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'


export default class Signup extends Component {
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

        axios.post('http://localhost:3000/users', { user }, { withCredentials: true })
            .then(response => {
                if (response.data.status === 'created') {
                    this.props.handleLogin(response.data)
                } else {
                    this.setState({
                        errors: response.data.errors
                    })
                }
            })
            .catch(error => console.log('API errors:', error))
    };

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
        return (
            <>
                <div className='main-container text-center'>
                    <h1>Sign Up</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <label for="username">User</label><br />
                            <input
                                placeholder="Type your username..."
                                type="text"
                                name="username"
                                id="username"
                                value={username}
                                onChange={this.handleChange} />
                        </div>
                        <div>
                            <label for="password">Password</label><br />
                            <input
                                placeholder="Type your password..."
                                type="password"
                                name="password"
                                id="password"
                                value={password}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div>
                            <button className='btn' placeholder="submit" type="submit">
                                Sign Up
                            </button>
                        </div>
                        <div>
                            or <Link to='/login'>Log in</Link>
                        </div>
                    </form>
                    <div className='text-danger'>
                        {
                            this.state.errors ? this.handleErrors() : null
                        }
                    </div>
                </div>
            </>
        );
    }
}