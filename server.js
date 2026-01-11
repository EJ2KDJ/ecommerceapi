require('dotenv').config();

const express = require('express');
const app = express();

const { sequelize } = require('./sequelize/models');

// Routes
const userRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/product.routes');
const cartRoutes = require('./routes/cart.routes');
const orderRoutes = require('./routes/order.routes');

// Middleware
app.use(express.json());

// Server test
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Server is running' });
})

// Mount for use of routes
app.use('/api/auth', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);


const PORT = 3000;

(
    async () => {
        try {
            await sequelize.authenticate();
            console.log('Connection has been established successfully.');

            app.listen(PORT, () => {
                console.log(`Server is running on port ${PORT}`);
            });
        } catch (err) {
            console.error('Unable to connect to the database:', err);
        }
    }
)()