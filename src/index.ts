import express from 'express';
require("dotenv").config();
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import mongoose from 'mongoose';
import bookRouter from './router/bookRouter';

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


const start = async () => {
    if (!process.env.MONGO_URI) throw new Error('MONGO_URI is required')
    try {
        await mongoose.connect(process.env.MONGO_URI)
    } catch (err) {
        throw new Error('database eror')
    }
    app.listen(8080, () => console.log('Server running http://localhost:8080/'))

}
// mongoose.Promise = Promise
// mongoose.connect(process.env.MONGO_URI)
// mongoose.connection.on('error', (error: Error) => console.log(error))
//  check what this is for from the preveios vd

start()

