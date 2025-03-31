import express from 'express';
import Product from './models/product.js';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/products', async (req, res) => {
    try {  const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.json({ message: error.message });
    }
});

app.post('/products', async (req, res) => {
    const {name, price, description} = req.body;
    const products = await Product.create({name, price, description});
    res.json(products);
});

export default app;