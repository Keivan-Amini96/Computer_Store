import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';


function HomePage() {
    return (
        <div>
            <h1>Welcome to the store</h1>
            <li><a href="/htmls/homePage.html">Home</a></li>
        </div>
    );
}

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
            </Routes>
        </Router>
    );
}

export default App;
