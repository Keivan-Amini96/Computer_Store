import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import LoginPage from './Login';
function App() {
    const [username, setUsername] = useState(null);

    // Update username when login page is accessed
    React.useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        setUsername(storedUsername);
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage username={username} />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </Router>
    );
}

export default App;