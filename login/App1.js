import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HomePage from './HomePage';
import Login from './Login';

function App() {
    const [user, setUser] = useState(null);  // Store the logged-in user

    const handleLogin = (username) => {
        setUser(username);  // Update user state after login
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage user={user}/>} />
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
            </Routes>
        </Router>
    );
}

export default App;