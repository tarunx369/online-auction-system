import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../api';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
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
            await register(formData);
            navigate('/login'); // Redirect to login page after successful registration
        } catch (err) {
            setError(err.response?.data?.msg || 'Failed to register. Please try again.');
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <input
                name="name"
                type="text"
                placeholder="Name"
                onChange={handleChange}
                required
            />
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
                minLength="6"
                onChange={handleChange}
                required
            />
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;