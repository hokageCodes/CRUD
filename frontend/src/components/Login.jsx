import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css'


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
        const response = await axios.post('http://localhost:5000/api/auth/login', {
            email,
            password,
        });

        console.log(response.data);
        } catch (err) {
        setError(err.response.data.error);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                </div>
                <div>
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                </div>
                <button type="submit">Login</button>
            </form>
            <p>
                Dont have an account? <Link to="/signup">Signup</Link>
            </p>
        </div>
    );
};

export default Login;
