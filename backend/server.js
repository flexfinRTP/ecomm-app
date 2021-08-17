const express = require('express');
const dontenv = require('dotenv');
const { notFound, errorHandler }= require('./middleware/errorMiddleware');
const connectDB = require('./config/db');

const productRoutes = require('./routes/productsRoutes');

dontenv.config();

connectDB();

const app = express();

app.get('/', (req, res) => {
    res.send('API is running')
});

app.use('/api/products', productRoutes);

app.use(notFound);

app.use(errorHandler);

// app.get('/api/products', (req, res) => {
//     res.json(products);
// });

// app.get('/api/products/:id', (req, res) => {
//     const product = products.find(p => p._id === req.params.id)
//     res.json(product);
// });

app.listen(5000, console.log('Server running on port 5000'));