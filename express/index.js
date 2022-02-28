require('dotenv').config();
//
const express = require('express');
const { connectToMongoDB, closeSubscribe } = require('../express/config/db');
const routerApi  = require('./routes');
const cors = require('cors')
//
const app = express();
const port = process.env.PORT || 9000;


//Config  middleware para express
app.use(express.json());//Procesar peticiones de cuerpo json
app.use(express.urlencoded());//Procesar parámetros codificados en la URL


//Settings connections to MongoDB
connectToMongoDB();
app.use(cors());


//Routers of the API
routerApi(app);


//Setting watchers to close connection when the back-end is ended 
closeSubscribe();


//Access to controllers
app.listen(port, () => {
    console.log(`Backend está corriendo en el puerto: ${port}`);
});