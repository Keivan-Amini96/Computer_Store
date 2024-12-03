import React from 'react';

function HomePage() {
    return (
        <div>
            <h1>Home Page with External HTML</h1>
            <iframe src="/htmls/.html" width="100%" height="500px" title="Home Page" />
        </div>
    );
}

export default HomePage;