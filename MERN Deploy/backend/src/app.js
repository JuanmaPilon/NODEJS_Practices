import express from 'express';
import mongoose from 'mongoose';
import Product from './models/product.js';

const app = express();
const port = process.env.PORT || 3000;

app.get('/products', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

mongoose.connect('mongodb://localhost/mongodbany');

app.listen(port);
console.log('Server started on: ' + port);