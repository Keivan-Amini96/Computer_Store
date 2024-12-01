import React, { useState } from 'react';
import axios from 'axios';
import './css/login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // post
            const response = await axios.post('http://ec2-user@ec2-3-87-9-58.compute-1.amazonaws.com:5000/login', {
                username,
                password
            });

            // next web page
            // if is a customer
            // if is an admin
            localStorage.setItem('authToken', response.data.token);
            alert('Login Successful');
        } catch (error) {
            setErrorMessage(error.response ? error.response.data.message : 'Something went wrong');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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

            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
    );
};

export default Login;
