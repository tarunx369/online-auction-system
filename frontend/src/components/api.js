import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) {
        req.headers['x-auth-token'] = token;
    }
    return req;
});

export const login = (formData) => API.post('/auth/login', formData);
export const register = (formData) => API.post('/auth/register', formData);

export const fetchItems = () => API.get('/items');

// --- THIS IS THE CORRECTED LINE ---
export const fetchItem = (id) => API.get(`/items/${id}`);

export const createItem = (itemData) => API.post('/items', itemData);
export const placeBid = (id, bidData) => API.post(`/items/${id}/bid`, bidData);
export const deleteItem = (id) => API.delete(`/items/${id}`);
export const fetchBidsForItem = (id) => API.get(`/items/${id}/bids`);