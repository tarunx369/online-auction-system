import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Import Components
import Navbar from './components/Navbar';
import Home from './components/Home';
import ItemDetail from './components/ItemDetail';
import CreateItem from './components/CreateItem';
import Login from './components/Login';
import Register from './components/Register';

function App() {
    return (
        <Router>
            <Navbar />
            <div className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/item/:id" element={<ItemDetail />} />
                    <Route path="/create" element={<CreateItem />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;