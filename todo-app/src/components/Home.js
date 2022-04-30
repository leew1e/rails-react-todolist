import React from 'react';
import axios from 'axios'
import '../App.css';
import { Link } from 'react-router-dom'
import TodosContainer from './TodosContainer'

const Home = (props) => {

    const handleClick = () => {
        axios.delete('http://localhost:3000/logout', { withCredentials: true })
            .then(response => {
                props.handleLogout()
                props.history.push('/')
            })
            .catch(error => console.log(error))
    }
    console.log("home", props)

    // HACK: uses for debug, will be changed later
    let accountButton;
    if(props.isLoggedIn){
        accountButton = <Link to='/' onClick={handleClick}>Log Out</Link>
    } else {
        accountButton = <Link to='/login'>Log In</Link>
    }

    return (
        <div>
            {accountButton}
            <br></br>
            <TodosContainer {...{user_id: props.user_id}}/>

        </div>
    );
};
export default Home;