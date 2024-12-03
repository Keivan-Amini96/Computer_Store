import React from 'react';

function LoginHtml() {
    const navigateToExternalPage = () => {
        // Replace with your HTML page URL
        window.location.href = '/your-external-page.html';
    };

    return (
        <div>
            <h1>Welcome to the React HomePage</h1>
            <button onClick={navigateToExternalPage}>Open External HTML Page</button>
        </div>
    );
}

export default HomePage;