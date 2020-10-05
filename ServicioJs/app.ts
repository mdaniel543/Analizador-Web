var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');

import { Response, Request } from "express";
import { Errores } from "./AST/Error";

var app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));


app.listen(3000, function(){
    console.log('Servidor en el puerto 3000');
}); 

