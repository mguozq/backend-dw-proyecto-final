'use strict'
//importar librerias
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');



//uso de librerias
const app = express();
require('dotenv').config();




//Middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());




//conexion a mongodb
mongoose.connect(process.env.DATABASE,{
  useNewUrlParser:true,
  useCreateIndex:true,
  useUnifiedTopology:true
}).then( ()=>{console.log('Conexion a base de datos:....... OK!')} );




//Routes
app.use('/jmautos/carros', require('./routes/rutas.carros'));
app.use('/jmautos/contactos', require('./routes/rutas.contactos'));
app.use('/jmautos/session', require('./routes/ruta.session'));




//Listen port
const port = process.env.PORT;
app.listen(port, () => {
  console.log('Estado de servidor:........OK!');
});
