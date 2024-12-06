import React from 'react';

function App() {
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

export default App;
