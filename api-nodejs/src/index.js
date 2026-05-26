require('dotenv').config();
const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/product.routes');
const healthRoutes = require('./routes/health.routes');
const { errorHandler } = require('./middlewares/error.middleware');
const { requestLogger } = require('./middlewares/logger.middleware');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(requestLogger);

// Routes
app.use('/api/products', productRoutes);
app.use('/health', healthRoutes);

// Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;