import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchItems } from '../api';

const Home = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const getItems = async () => {
            try {
                const { data } = await fetchItems();
                setItems(data);
            } catch (error) {
                console.error("Failed to fetch items:", error);
            }
        };
        getItems();
    }, []);

    return (
        <div>
            <h1 style={{ color: '#bb86fc', textAlign: 'center' }}>Auction Items</h1>
            <div className="item-list">
                {items.length > 0 ? (
                    items.map((item) => (
                        <div key={item._id} className="item-card">
                            <img src={item.imageUrl} alt={item.name} className="item-card-image" />
                            <div className="item-card-content">
                                <h3>{item.name}</h3>
                                <p className="bid-info">Current Bid: ${item.currentBid}</p>
                                <p>Auction ends: {new Date(item.auctionEndTime).toLocaleDateString()}</p>
                                <Link to={`/item/${item._id}`}>View Details</Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No items up for auction yet. Be the first to list one!</p>
                )}
            </div>
        </div>
    );
};

export default Home;