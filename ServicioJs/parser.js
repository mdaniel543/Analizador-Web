var fs = require('fs');
var parser = require('./Analizador/Gramatica');

fs.readFile('JavaApplication1.java', 'utf8',
    function(err, data) {
        console.log(data);
        analizar(data);
        console.log('Analisis terminado.')
    }
)

function analizar(req, res) {
    const entrada  = req.body.operaciones;
    console.log(entrada);
    if(req.err) throw err;
    return res.send({resultado: parser.parse(entrada.toString())});
}

module.exports = analizar;