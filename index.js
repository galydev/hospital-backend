const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { dbConnection } = require('./database/config');

const app = express();

app.use(cors());

//database
dbConnection();

//Rutas
app.get('/', (req, res) => {
    res.json({
        ok:true,
        msg:'hola mundo'
    })
});

app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
});