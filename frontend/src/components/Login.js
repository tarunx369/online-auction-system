import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const { data } = await login(formData);
            localStorage.setItem('token', data.token); // Save the token
            navigate('/'); // Redirect to homepage after login
            window.location.reload(); // Refresh to update navbar state
        } catch (err) {
            setError(err.response?.data?.msg || 'Failed to login. Please check your credentials.');
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <input
                name="email"
                type="email"
                placeholder="Email"
                onChange={handleChange}
                required
            />
            <input
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
                required
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;