const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
require('dotenv').config();

const { dbConnection } = require('./database/config');

const app = express();

// default options
app.use(fileUpload());

// Add cors
app.use(cors());

//Add json conver body
app.use(express.json());

//Database
dbConnection();

//public directory
app.use(express.static('public'));
//Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/hospitals', require('./routes/hospitals'));
app.use('/api/doctors', require('./routes/doctors'));
app.use('/api/todo', require('./routes/searchs'));
app.use('/api/uploads', require('./routes/uploads'));


app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
});