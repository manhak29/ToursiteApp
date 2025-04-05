import React, { useState } from 'react';
import Home from './Home';
import { saveUser, doesUserExist, isUserValid } from './database';

const App: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showAuthForm, setShowAuthForm] = useState(false);

    const toggleForm = () => {
        setIsLogin(!isLogin);
        setErrorMessage('');
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (isUserValid(email, password)) {
            setIsAuthenticated(true);
            setShowAuthForm(false);
        } else {
            setErrorMessage('Invalid email or password. Please try again.');
        }
    };

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();
        if (doesUserExist(email)) {
            setErrorMessage('User already exists. Please log in.');
        } else {
            saveUser({ email, password });
            setIsAuthenticated(true);
            setShowAuthForm(false);
        }
    };

    return (
        <div>
            <Home />
            {!isAuthenticated && (
                <button
                    className="button"
                    style={{
                        position: 'fixed',
                        top: '20px',
                        right: '20px',
                        zIndex: 1000,
                        padding: '10px 20px',
                    }}
                    onClick={() => setShowAuthForm(!showAuthForm)}
                >
                    {showAuthForm ? 'Close' : 'Login/Signup'}
                </button>
            )}

            {showAuthForm && (
                <div
                    style={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: 'white',
                        padding: '20px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                        zIndex: 1000,
                        borderRadius: '8px',
                    }}
                >
                    {isLogin ? (
                        <div>
                            <h2>Login</h2>
                            <form onSubmit={handleLogin}>
                                <div>
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        style={{
                                            padding: '10px',
                                            margin: '10px 0',
                                            width: '100%',
                                        }}
                                    />
                                </div>
                                <div>
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        style={{
                                            padding: '10px',
                                            margin: '10px 0',
                                            width: '100%',
                                        }}
                                    />
                                </div>
                                {errorMessage && (
                                    <p style={{ color: 'red', margin: '10px 0' }}>
                                        {errorMessage}
                                    </p>
                                )}
                                <button className="button" type="submit">
                                    Login
                                </button>
                            </form>
                        </div>
                    ) : (
                        <div>
                            <h2>Signup</h2>
                            <form onSubmit={handleSignup}>
                                <div>
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        style={{
                                            padding: '10px',
                                            margin: '10px 0',
                                            width: '100%',
                                        }}
                                    />
                                </div>
                                <div>
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        style={{
                                            padding: '10px',
                                            margin: '10px 0',
                                            width: '100%',
                                        }}
                                    />
                                </div>
                                {errorMessage && (
                                    <p style={{ color: 'red', margin: '10px 0' }}>
                                        {errorMessage}
                                    </p>
                                )}
                                <button className="button" type="submit">
                                    Signup
                                </button>
                            </form>
                        </div>
                    )}
                    <button
                        className="button"
                        style={{ marginTop: '10px' }}
                        onClick={toggleForm}
                    >
                        {isLogin ? 'Switch to Signup' : 'Switch to Login'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default App;