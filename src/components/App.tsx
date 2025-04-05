import React, { useState } from 'react';
import Home from './Home';
import { saveUser, doesUserExist, isUserValid } from './database';

const App: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const toggleForm = () => {
        setIsLogin(!isLogin);
        setErrorMessage('');
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (isUserValid(email, password)) {
            setIsAuthenticated(true);
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
        }
    };

    if (isAuthenticated) {
        return <Home />;
    }

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h1>Welcome to the Tourist App</h1>
            <p>Explore various tourist destinations and plan your trips!</p>

            <div style={{ marginTop: '20px' }}>
                <button
                    className="button"
                    onClick={toggleForm}
                    style={{ marginRight: '10px' }}
                >
                    {isLogin ? 'Switch to Signup' : 'Switch to Login'}
                </button>
            </div>

            <div style={{ marginTop: '20px' }}>
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
                                    style={{ padding: '10px', margin: '10px 0', width: '200px' }}
                                />
                            </div>
                            <div>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    style={{ padding: '10px', margin: '10px 0', width: '200px' }}
                                />
                            </div>
                            {errorMessage && (
                                <p style={{ color: 'red', margin: '10px 0' }}>{errorMessage}</p>
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
                                    style={{ padding: '10px', margin: '10px 0', width: '200px' }}
                                />
                            </div>
                            <div>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    style={{ padding: '10px', margin: '10px 0', width: '200px' }}
                                />
                            </div>
                            {errorMessage && (
                                <p style={{ color: 'red', margin: '10px 0' }}>{errorMessage}</p>
                            )}
                            <button className="button" type="submit">
                                Signup
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default App;