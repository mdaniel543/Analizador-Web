const  procesarReporte = require('./AST/Interprete').procesarReporte;
const ReporteT = require('./AST/Reporte').tokens;
var T = require('./AST/Interprete').T;
var parser2 = require('./Analizador/r');

function r(req, res) {
    const entrada  = req.body.resultado;
    var ast2 = parser2.parse(entrada.toString());
    //fs.writeFileSync('./ast2.json', JSON.stringify(ast2, null, 2));
    procesarReporte(ast2);
    var reporte = ReporteT(T);
   
    console.log(entrada.toString());
    
    if(req.err) throw err;
    return res.send(reporte);
}

module.exports = r;