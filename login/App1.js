import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HomePage from './HomePage';
import Login from './Login';
import ProductList from './ProductList'

function App() {
    const [user, setUser] = useState(null);  // Store the logged-in user

    const handleLogin = (username) => {
        setUser(username);  // Update user state after login
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage/>} />
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
                <Route path="/prodcutlist" element={<ProductList/>} />
            </Routes>
        </Router>
    );
}

export default App;