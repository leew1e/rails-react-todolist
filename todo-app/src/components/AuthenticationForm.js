import { Link } from 'react-router-dom'

export default function AuthenticationForm() {
    return (
        <div className='main-container'>
            <h3>Welcome!</h3>
            <h4>Please log in to continue</h4>

            <Link to='/login' className='btn w-10'>
                Log in
            </Link>
            <Link to='/signup' className='btn w-10'>
                Sign up
            </Link>
        </div>
    );
}