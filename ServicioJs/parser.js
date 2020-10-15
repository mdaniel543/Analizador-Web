var parser = require('./Analizador/Gramatica');

function analizar(req, res) {
    const entrada  = req.body.contenido;
    console.log(entrada);
    if(req.err) throw err;
    return res.send({resultado: parser.parse(entrada.toString())});
}

module.exports = analizar;