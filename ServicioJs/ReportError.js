const  procesarReporte = require('./AST/Interprete').procesarReporte;
const ReporteE = require('./AST/Reporte').erroes;
var E = require('./AST/Interprete').errores;
var parser = require('./Analizador/Gramatica')

function r(req, res) {
    const entrada  = req.body.resultado;
    var ast = parser.parse(entrada.toString());
    //fs.writeFileSync('./ast2.json', JSON.stringify(ast2, null, 2));
    procesarReporte(ast);
    var reporte = ReporteE(E);
    console.log(entrada.toString());
    
    if(req.err) throw err;
    return res.send(reporte);
}

module.exports = r;