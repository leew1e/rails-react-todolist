import React from 'react';
import axios from 'axios'
import '../App.css';
import { Link, useNavigate } from 'react-router-dom'
import TodosContainer from './TodosContainer'

function Home (props) {
    const navigate = useNavigate();

    // Unauthorized access
    if (!props.isLoggedIn) navigate("/auth");

    const handleClick = () => {
        axios.delete('http://localhost:3000/logout', { withCredentials: true })
            .then(response => {
                props.handleLogout()
                navigate("/auth")
            })
            .catch(error => console.log(error))
    }

    return (
        <div>
            {props.isLoggedIn && <button className='btn btn-exit' onClick={handleClick}>Log Out</button>}
            <br></br>
            <TodosContainer user_id = {props.user_id}/>
        </div>
    );
};
export default Home;