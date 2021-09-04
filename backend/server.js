const path = require('path'); //nodejs module to work with file paths
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const { notFound, errorHandler }= require('./middleware/errorMiddleware');
const connectDB = require('./config/db');

const productRoutes = require('./routes/productsRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const uploadRoutes = require('./routes/uploadRoutes');


dotenv.config()

connectDB()

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

const folder = path.resolve()
app.use('/uploads', express.static(path.join(folder, '/uploads')))

app.get('/', (req, res) => {
  res.send('API is running')
})

app.use(notFound)
app.use(errorHandler)

app.listen(5000, console.log('Server running on port 5000'))