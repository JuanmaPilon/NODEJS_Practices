const express = require('express');
const { config } = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
config();

const gameRoutes = require('./routes/game.routes');

// uso express para middlewares
const app = express();
app.use(bodyParser.json());


// BD
mongoose.connect(process.env.MONGO_URL, { dbName: process.env.MONGO_DB_NAME });
const db = mongoose.connection;


app.use('/games', gameRoutes);

const port = process.env.PORT || 3000;  // 3000 bcz its default

app.listen(port, () => {
    console.log(`Servidor corriendo en el ${port}`);
});