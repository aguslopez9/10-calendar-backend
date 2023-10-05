

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config')

//crear servidor de express
const app = express();

//base de datos
dbConnection();

//cors
app.use(cors());

//directorio publico
app.use(express.static('public'));

//lectura y parseo del body
app.use(express.json());


//rutas
app.use('/api/auth', require('./routes/auth')) //todo lo exportado en routes/auth se habilita en api/auth 
// CRUD: eventos
app.use('/api/events', require('./routes/events'))

//escuchar peticiones
app.listen(process.env.PORT, ()=>{
    console.log(`servidor corriendo en puerto ${process.env.PORT}`)
})
