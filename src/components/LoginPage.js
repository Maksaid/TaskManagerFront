// src/components/LoginPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('stringstr');
    const [password, setPassword] = useState('stringG!1');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://localhost:7260/api/Auth/Login', { email, password });
            console.log(response);
            if (response.status == 200) {
                // Save token or user info if needed
                localStorage.setItem("user_id", response.data.id);
                localStorage.setItem("org_id", response.data.organizationId);

                navigate('/home');
            } else {
                setError('Login failed. Please check your credentials.');
            }
        } catch (err) {
            setError('Login failed. Please check your credentialseoierjtioerjiteriotjreite.');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="text-center mb-4">Login</h2>
                            {error && <div className="alert alert-danger">{error}</div>}
                            <form onSubmit={handleLogin}>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        className="form-control"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary btn-block">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
