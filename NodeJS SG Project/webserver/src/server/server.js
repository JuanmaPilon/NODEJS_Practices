//const path = require('path');
//const express = require('express');
import express from 'express';
import path from 'path';

export const startServer = (options) => {
    const { PORT, PUBLIC_PATH = 'public' } = options;
    console.log(PORT, PUBLIC_PATH);

    const app = express();


    app.use(express.static(PUBLIC_PATH));

    app.get('/', (req, res) => {
       const indexPath = path.join(__dirname, PUBLIC_PATH, 'index.html');
       res.sendFile(indexPath);
    })

    app.listen(PORT, () => {
        console.log(`Corriendo en el http://localhost:${PORT}`);
    });
}