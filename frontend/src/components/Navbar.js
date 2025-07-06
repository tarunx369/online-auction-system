import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
        window.location.reload();
    };

    return (
        <nav className="navbar">
            <Link to="/" className="navbar-brand">Auction App</Link>
            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/create">List Item</Link>
                {token ? (
                    <button onClick={handleLogout}>Logout</button>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;