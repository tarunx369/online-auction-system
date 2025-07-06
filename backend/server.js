const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// DB Config & Connection
const db = process.env.MONGO_URI;
mongoose.connect(db)
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/items', require('./routes/items'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));