const Express = require('express');
const Router = Express.Router();

const saludo = require('./saludo');

// metodos post
const analizar = require('./parser');

// router get
Router.get('/saludo', saludo);

// router post
Router.get('/analizar', analizar);


module.exports = Router;
