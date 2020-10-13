var fs = require('fs');
var parser = require('./Analizador/Gramatica');

function analizar(req, res) {
    const entrada = fs.readFileSync('./JavaApplication1.java');
    console.log(entrada.toString());
    ast = parser.parse(entrada.toString());
    return res.send(JSON.stringify(ast, null, 2));
}

module.exports = analizar;