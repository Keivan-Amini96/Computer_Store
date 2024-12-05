import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';


function HomePage() {
    const backgroundStyle = {
        backgroundImage: 'url("/img/img/bg.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
    };

    return (
        <div style={backgroundStyle}>
            <li><a href="/htmls/homePage.html">Welcome To The computer Store</a></li>
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
