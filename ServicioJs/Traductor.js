const procesar = require('./AST/Interprete').procesar;
var parser = require('./Analizador/Gramatica');

function traductor(req, res) {
    const entrada  = req.body.resultado;
    console.log(entrada.toString());
    
    const ast = parser.parse(entrada.toString());
    const traduccion = procesar(ast);
    console.log(traduccion);
    if(req.err) throw err;
    return res.send(traduccion);
}

module.exports = traductor;