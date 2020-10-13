var fs = require('fs');
var parser = require('../Analizador/Gramatica')

const TIPO_INSTRUCCION = require('./Instrucciones/Instruccion').instruccionesAPI;
const TIPO_OPERACION = require('./Instrucciones/Instruccion').TIPO_OPERACION;
const TIPO_VALOR = require('./Instrucciones/Instruccion').TIPO_VALOR;


let ast;
try {
    const entrada = fs.readFileSync('../JavaApplication1.java');
    console.log(entrada.toString());
    ast = parser.parse(entrada.toString());
    fs.writeFileSync('./ast.json', JSON.stringify(ast, null, 2));
} catch (e) {
    console.error(e);
    return;
}


