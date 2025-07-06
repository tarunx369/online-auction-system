import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchItem, placeBid, deleteItem, fetchBidsForItem } from '../api'; // <-- Import fetchBidsForItem
import { jwtDecode } from 'jwt-decode';

const ItemDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [item, setItem] = useState(null);
    const [bids, setBids] = useState([]); // <-- New state for bid history
    const [bidAmount, setBidAmount] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            setUserId(decodedToken.user.id);
        }
    }, []);

    useEffect(() => {
        const fetchItemAndBids = async () => {
            try {
                // Fetch item details
                const itemRes = await fetchItem(id);
                setItem(itemRes.data);
                setBidAmount(Math.floor(itemRes.data.currentBid) + 1);

                // Fetch bid history
                const bidsRes = await fetchBidsForItem(id);
                setBids(bidsRes.data);
            } catch (err) {
                setError('Could not fetch item details or bids.');
            }
        };

        fetchItemAndBids();
    }, [id]);

    const handleBidSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!localStorage.getItem('token')) {
            setError('You must be logged in to place a bid.');
            return;
        }
        try {
            const updatedItem = await placeBid(id, { bidAmount });
            setItem(updatedItem.data); // Update item with new bid info
            setSuccess('Bid placed successfully!');

            // Refetch bid history to show the new bid
            const bidsRes = await fetchBidsForItem(id);
            setBids(bidsRes.data);

        } catch (err) {
            setError(err.response?.data?.msg || 'Error placing bid.');
        }
    };

    const handleDelete = async () => {
        // ... (handleDelete function remains the same)
        if (window.confirm('Are you sure you want to delete this item?')) {
            try {
                await deleteItem(id);
                alert('Item deleted successfully.');
                navigate('/');
            } catch (err) {
                setError('Failed to delete the item.');
            }
        }
    };

    if (!item) return <div>Loading...</div>;

    const isAuctionOver = new Date() > new Date(item.auctionEndTime);

    return (
        <div className="item-detail-container">
            {/* Left side with item info remains mostly the same */}
            <img src={item.imageUrl} alt={item.name} className="item-detail-image" />
            <div className="item-detail-info">
                <h1>{item.name}</h1>
                <p>Listed by: {item.seller?.name || 'Unknown'}</p>
                <p>{item.description}</p>
                <p>Starting Bid: ${item.startingBid}</p>
                <h2 style={{ color: '#03dac6' }}>Current Bid: ${item.currentBid}</h2>
                <p>Auction Ends: {new Date(item.auctionEndTime).toLocaleString()}</p>

                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}

                {/* Bidding Form and Delete Button... */}
                 {!isAuctionOver && (
                     <form onSubmit={handleBidSubmit}>
                        <div className="form-group" style={{ flexGrow: 1, marginBottom: 0 }}>
                            <input type="number" value={bidAmount} onChange={(e) => setBidAmount(e.target.value)} required />
                        </div>
                        <button type="submit" className="form-btn" style={{ width: 'auto' }}>Place Bid</button>
                    </form>
                 )}

                 {userId && item.seller && userId === item.seller._id && (
                    <button onClick={handleDelete} className="form-btn" style={{ backgroundColor: '#cf6679', marginTop: '1rem' }}>
                        Delete Item
                    </button>
                 )}
            </div>

            {/* --- New Bidding History Section --- */}
            <div className="bidding-history">
                <h3>Bidding History</h3>
                {bids.length > 0 ? (
                    <ul>
                        {bids.map((bid) => (
                            <li key={bid._id}>
                                <span>{bid.user?.name || 'A User'}</span> bid <strong>${bid.amount}</strong>
                                <small>{new Date(bid.createdAt).toLocaleString()}</small>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No bids placed yet. Be the first!</p>
                )}
            </div>
        </div>
    );
};

export default ItemDetail;