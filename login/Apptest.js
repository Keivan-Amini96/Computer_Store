import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';


function HomePage() {
    const backgroundStyle = {
        backgroundImage: 'url("/img/img/bc.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
    };

    return (
        <div style={backgroundStyle}>
            <h1>Welcome to the Computer Store</h1>
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
