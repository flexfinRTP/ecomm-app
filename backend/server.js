const path = require('path'); //nodejs module to work with file paths
const express = require('express');
const dontenv = require('dotenv');
const { notFound, errorHandler }= require('./middleware/errorMiddleware');
const connectDB = require('./config/db');

const productRoutes = require('./routes/productsRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const uploadRoutes = require('./routes/uploadRoutes');


dontenv.config();

connectDB();

const app = express();

app.use(express.json())

app.get('/', (req, res) => {
    res.send('API is running')
});

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

const folder = path.resolve();
app.use('/uploads', express.static(path.join(folder, '/uploads')));

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