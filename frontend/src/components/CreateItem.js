import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createItem } from '../api';

const CreateItem = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        startingBid: '',
        auctionEndTime: '',
        imageUrl: '',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createItem(formData);
            navigate('/');
        } catch (error) {
            console.error('Failed to create item', error);
            alert('Failed to create item. Make sure you are logged in.');
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <h2>List a New Item</h2>

                <div className="form-group">
                    <label htmlFor="name">Item Name</label>
                    <input id="name" name="name" placeholder="e.g., Vintage Watch" onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea id="description" name="description" placeholder="e.g., A classic 1980s Red Bull collectible" onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label htmlFor="startingBid">Starting Bid ($)</label>
                    <input id="startingBid" name="startingBid" type="number" placeholder="e.g., 50" onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label htmlFor="imageUrl">Image URL</label>
                    <input id="imageUrl" name="imageUrl" placeholder="e.g., https://example.com/image.jpg" onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label htmlFor="auctionEndTime">Auction End Time</label>
                    <input id="auctionEndTime" name="auctionEndTime" type="datetime-local" onChange={handleChange} required />
                </div>
                
                <button type="submit" className="form-btn">List Item</button>
            </form>
        </div>
    );
};

export default CreateItem;