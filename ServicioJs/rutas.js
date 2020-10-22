const Express = require('express');
const Router = Express.Router();

const saludo = require('./saludo');

// metodos post
const analizar = require('./parser');

const traductor = require('./Traductor');

const RE = require('./ReportError');

const RT = require('./ReporteTokens');

const traductor2 = require('./Traductor2');

// router get
Router.get('/saludo', saludo);

// router post
Router.post('/analizar', analizar);

Router.post('/traductor', traductor);

Router.post('/reporterror', RE);

Router.post('/reportetoken', RT);

Router.post('/traductorpy', traductor2);

module.exports = Router;
