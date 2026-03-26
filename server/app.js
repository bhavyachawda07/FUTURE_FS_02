const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const errorHandler = require('./middleware/errorMiddleware');

// Load env vars
dotenv.config();

const app = express();

// Body parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Enable CORS
const corsOptions = {
    origin: process.env.CLIENT_URL ? process.env.CLIENT_URL.split(',') : '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));

// Route files
const auth = require('./routes/authRoutes');
const leads = require('./routes/leadRoutes');
const dashboard = require('./routes/dashboardRoutes');

// Mount routers
app.use('/api/auth', auth);
app.use('/api/leads', leads);
app.use('/api/dashboard', dashboard);

// Error handler
app.use(errorHandler);

module.exports = app;
