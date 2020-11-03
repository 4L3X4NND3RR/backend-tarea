import express from "express";
import morgan from "morgan";
import mysql from "mysql";
import bodyParser from 'body-parser';
import router from "./config/routes.js";
import myConnection from "express-myconnection";
import cors from 'cors'
const app = express();
const corsUrl = {origin: '*'};

// configuracion
app.set('port', 3000);

// middleware
app.use(morgan('dev'));
app.use(myConnection(mysql, {
    host: 'db4free.net',
    user: 'desaweb2020',
    password: 'desaweb2020',
    port: 3306,
    database: 'umg4desaweb'
}, 'single'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// rutas
app.use('/api/', cors(corsUrl), router);

// iniciando servidor
app.listen(app.get('port'), () => {
    console.log('Server on port: ', app.get('port'));
});
