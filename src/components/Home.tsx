import React from 'react';

const Home: React.FC = () => {
    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h1>Welcome to the Tourist App Home Page</h1>
            <p>Explore amazing tourist destinations and plan your trips with ease!</p>
            <button
                className="button"
                onClick={() => alert('Start Exploring!')}
                style={{ marginTop: '20px' }}
            >
                Explore Now
            </button>
        </div>
    );
};

export default Home;