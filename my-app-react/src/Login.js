import React, {useState} from 'react';
import axios from 'axios';
import './css/login.css';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
    const [is_admin, setIsAdmin] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // post
            const response = await axios.post('http://ec2-user@ec2-34-207-161-171.compute-1.amazonaws.com:5000/login', {
                username,
                password,
                is_admin
            });
            // next web page
            // if is a customer
            // if is an admin
            localStorage.setItem('authToken', response.data.token);
            onLogin(username);
            navigate('/');
        } catch (error) {
            setErrorMessage(error.response ? error.response.data.message : 'Something went wrong');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <div className="roleSelection">
                        <label className="roleLabel">
                            <input
                                type="radio"
                                value="1"
                                checked={is_admin === 1}
                                onChange={(e) => setIsAdmin(1)}
                            />
                            Administrator
                        </label>
                        <label className="roleLabel">
                            <input
                                type="radio"
                                value="customer"
                                checked={is_admin === 0}
                                onChange={(e) => setIsAdmin(0)}
                            />
                            Customer
                        </label>
                    </div>
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

            {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}
        </div>
    );
};

export default Login;

