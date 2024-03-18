import express from 'express';
require("dotenv").config();
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import mongoose from 'mongoose';
import bookRouter from './router/bookRouter';
//import orderRouter from './router/orderRoutes';

const app = express();
app.use(
    cors({
        origin: 'http://localhost:8080',
    })
);

//middleware
app.use(morgan('tiny'));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('api/books', bookRouter);
//app.use('api/order', orderRouter);


const start = async () => {
    if (!process.env.MONGO_URI) throw new Error('MONGO_URI is required')
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Database connection error:', err);
        throw new Error('database eror')
    }
    app.listen(8080, () => console.log('Server running http://localhost:8080/'))

}

start()

