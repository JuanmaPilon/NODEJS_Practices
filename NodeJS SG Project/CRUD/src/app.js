const express = require('express');
const { config } = require('dotenv');
config();

const app = express();

const port = process.env.PORT || 3000;  // 3000 bcz its default

app.listen(port, () => {
    console.log(`Servidor corriendo en el ${port}`);
});