import express from 'express';
import http from 'http';
require("dotenv").config();
import cors from 'cors';
import compression from 'compression'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'

const app = express();
app.use(
    cors({
        credentials: true,
    })
);

app.use(compression());
app.use(express.json());
app.use(cookieParser());

const server = http.createServer(app)




mongoose.Promise = Promise
mongoose.connect(process.env.MONGO_URI)
mongoose.connection.on('error', (error: Error) => console.log(error))

app.listen(8080, () => {
    console.log('Server running http://localhost:8080/')
})