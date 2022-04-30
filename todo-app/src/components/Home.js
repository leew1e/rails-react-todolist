import React from 'react';
import axios from 'axios'
import '../App.css';
import { Link } from 'react-router-dom'
import TodosContainer from './TodosContainer'

const Home = (props) => {

    const handleClick = () => {
        console.log("innerHandle", props.isLoggedIn)
        axios.delete('http://localhost:3000/logout', { withCredentials: true })
            .then(response => {
                props.handleLogout()
                props.history.push('/')
            })
            .catch(error => console.log(error))
    }

    console.log("home", props)

    return (
        <div>
            <Link to='/login'>Log In</Link>
            <br></br>
            <Link to='/signup'>Sign Up</Link>
            <br></br>
            {
                props.isLoggedIn ?
                    <Link to='/' onClick={handleClick}>Log Out</Link> : null
            }

            <div className='main-container'>
                <div>
                    <h1>Todo list:</h1>
                </div>
                <TodosContainer />
            </div>

        </div>
    );
};
export default Home;