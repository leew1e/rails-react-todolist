import React from 'react';
import axios from 'axios'
import '../App.css';
import { Link, useNavigate } from 'react-router-dom'
import TodosContainer from './TodosContainer'

function Home (props) {
    const navigate = useNavigate();
    const handleClick = () => {
        axios.delete('/logout', { withCredentials: true })
            .then(response => {
                props.handleLogout()
                navigate("/")
            })
            .catch(error => console.log(error))
    }

    return (
        <div>
            {props.isLoggedIn 
                && <button className='btn btn-danger btn-exit' onClick={handleClick}>Log Out</button>}

            <TodosContainer user_id = {props.user_id}/>
        </div>
    );
};
export default Home;