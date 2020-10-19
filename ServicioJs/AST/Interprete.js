const { ECANCELED } = require('constants');
var fs = require('fs');
var parser = require('../Analizador/Gramatica')
//const { TIPO_INSTRUCCION, TIPO_OPERACION, TIPO_VALOR } = require('./Instrucciones/Instruccion');

const Tipo_Instruccion = require('./Instrucciones/Instruccion').TIPO_INSTRUCCION;
const TIPO_Operacion = require('./Instrucciones/Instruccion').TIPO_OPERACION;
const Tipo_Valor = require('./Instrucciones/Instruccion').TIPO_VALOR;
const instruccionesAPI = require('./Instrucciones/Instruccion').instruccionesAPI;
  
var cou = 0;
//var ast;

function analizar(req, res) {
    const entrada  = req.body.resultado;
    const traduccion = "";
    if (entrada == undefined) {
        console.log('========================== HAY ERRORES LEXICOS ======================================');
    }else{
        traduccion = procesar(entrada);
    }
    console.log(entrada);
    console.log(traduccion);
    if(req.err) throw err;
    return res.send(traduccion);
}

//module.exports = analizar;

try {
    const entrada = fs.readFileSync('../JavaApplication1.java');
    console.log(entrada.toString());
    ast = parser.parse(entrada.toString());
    fs.writeFileSync('./ast.json', JSON.stringify(ast, null, 2));
    const traduccione = procesar(ast);

} catch (e) {
    console.error(e);
    return;
}

function crearTraduccion(contenido){
    fs.writeFile("Traduccion.js", contenido, function(err) {
        if (err) {
          return console.log(err);
        }
        console.log("El archivo fue creado correctamente");
      });
}

function tabu(tab){
    var Traduccion = "";
    for(var i = 0; i<tab; i++){
        Traduccion = Traduccion + '\t';
    }
    return Traduccion;
}


function procesar(instrucciones) {
    var Traduccion = "";

    instrucciones.forEach(instruccion => {
        if(instruccion.tipoIns === Tipo_Instruccion.CLASS){
            Traduccion = Traduccion + procesarClass(instruccion).linea;
        }
    });

    console.log(Traduccion);
    crearTraduccion(Traduccion);
    return Traduccion;
}

function procesarAnidacion(tabulacion, Traduccion, instrucciones) {
    instrucciones.forEach(instruccion => {
        if(instruccion.tipoIns === Tipo_Instruccion.IMETODO){
            Traduccion = Traduccion + tabu(tabulacion) + procesarMetodos(instruccion).linea;
        }else if(instruccion.tipoIns === Tipo_Instruccion.MAIN){

        }else if(instruccion.tipoIns === Tipo_Instruccion.DECLARACION){
            Traduccion = Traduccion + tabu(tabulacion) + procesarDEC(instruccion).linea;
        }else if(instruccion.tipoIns === Tipo_Instruccion.ASIGNACION){
            Traduccion = Traduccion + tabu(tabulacion) + procesarASIG(instruccion).linea;
        }else if(instruccion.tipoIns === Tipo_Instruccion.FOR){
            Traduccion = Traduccion + tabu(tabulacion) + procesarFOR(instruccion).linea;
        }else if(instruccion.tipoIns === Tipo_Instruccion.WHILE){
            Traduccion = Traduccion + tabu(tabulacion) + procesarWHILE(instruccion).linea;
        }else if(instruccion.tipoIns === Tipo_Instruccion.DO){
            Traduccion = Traduccion + tabu(tabulacion) + procesarDO(instruccion).linea;
        }else if(instruccion.tipoIns === Tipo_Instruccion.IF){
            Traduccion = Traduccion + tabu(tabulacion) + procesarIF(instruccion).linea;
        }else if(instruccion.tipoIns === Tipo_Instruccion.BREAK){
            Traduccion = Traduccion + tabu(tabulacion) + procesarBreak(instruccion).linea;
        }else if(instruccion.tipoIns === Tipo_Instruccion.CONTINUE){
            Traduccion = Traduccion + tabu(tabulacion) + procesarContinue(instruccion).linea;
        }else if(instruccion.tipoIns === Tipo_Instruccion.RETURN){
            Traduccion = Traduccion + tabu(tabulacion) + procesarReturn(instruccion).linea;
        }else if(instruccion.tipoIns === Tipo_Instruccion.PRINT){
            Traduccion = Traduccion + tabu(tabulacion) + procesarPrint(instruccion).linea;
        }else if(instruccion.tipoIns === Tipo_Instruccion.LLAMADA_M){
            Traduccion = Traduccion + tabu(tabulacion) + procesarLlamada(instruccion).linea;
        }
    });

    return { linea: Traduccion };
}

/**
 * Función que se encarga de procesar la instrucción Class
 * @param {*} instruccion 
 */
function procesarClass(instruccion) {

    var linea = "";
    var aux ="";
    
    linea = linea + 'class ' + instruccion._ID + '{ \n';
    linea = linea + '\tconstructor(){ \n \t} \n'; 
    if(instruccion.estado == 'lleno'){
        cou++;
        aux = aux + procesarAnidacion(cou, aux, instruccion._AyM).linea;
        linea = linea + aux;
        cou --;
    }
    linea = linea + '\n} \n';

    return { linea : linea };
}

/**
 * Función que se encarga de procesar la instrucción Metodo
 * @param {*} instruccion 
 */
function procesarMetodos(instruccion){
    var linea = "";
    var aux ="";
    if(instruccion._Parametros == undefined){//si no tienen parametros
        linea = linea + 'function ' + instruccion._ID + '() { \n';
        if(instruccion.estado == 'lleno'){
            cou++;
            aux = aux + procesarAnidacion(cou, aux, instruccion._Sentencias).linea;
            linea = linea + aux;
            cou --;
        }
    }else{
        linea = linea + 'function ' + instruccion._ID + '(';
        instruccion._Parametros.forEach(param => {
            if(param._Coma == undefined){
                linea = linea + param._ID.tipo;
            }else{
                linea = linea + param._ID.tipo + ', ';
            }
        });
        linea = linea + ') { \n';
        if(instruccion.estado == 'lleno'){
            cou++;
            aux = aux + procesarAnidacion(cou, aux, instruccion._Sentencias).linea;
            linea = linea + aux;
            cou --;
        }
    }
    linea = linea +"\n" + tabu(cou) +  "}\n";

    return { linea : linea };
}
/**
 * Función que se encarga de procesar la instrucción Metodo
 * @param {*} instruccion 
 */
function procesarDEC(instruccion){
    
    var linea = "";
    linea = linea + 'var ';
    instruccion._LD.forEach(dec => {
        linea = linea + dec._ID ;
        if(dec._Igual == undefined){
            if (dec._Coma != undefined){
                linea = linea + ', ';
            }
        }else{
            linea = linea + ' = ';
            if(dec._ID1 == undefined){
                if(dec._expresion.operandoIzq != undefined){
                    linea = linea + recorrerExp(dec._expresion.operandoIzq, "").linea;
                    linea = linea + dec._expresion.tipo;
                    linea = linea + recorrerExp(dec._expresion.operandoDer, "").linea;
                    
                }else{
                    linea = linea + dec._expresion.tipo;
                    
                }
            }else{
                linea = linea + dec._ID1 + '('
                if(dec._Parametros != undefined){
                    dec._Parametros.forEach(param => {
                        if(param._Coma == undefined){
                            linea = linea + param._ID.tipo;
                        }else{
                            linea = linea + param._ID.tipo + ', ';
                        }
                    });
                }
                linea = linea +  ")";
            }
            if (dec._Coma != undefined){
                linea = linea + ', ';
            }
        }
    });
    linea = linea + ";\n";

    return { linea : linea };
}
/**
 * Función que se encarga de procesar la instrucción Metodo
 * @param {*} instruccion 
 */
function procesarASIG(instruccion){
    
    var linea = "";
    linea = linea + instruccion._ID + ' = ';
    if(instruccion._expresion != undefined){
        if(instruccion._expresion.operandoIzq != undefined){
            linea = linea + recorrerExp(instruccion._expresion.operandoIzq, "").linea;
            linea = linea + instruccion._expresion.tipo;
            linea = linea + recorrerExp(instruccion._expresion.operandoDer, "").linea;
        }else{
            linea = linea + instruccion._expresion.tipo;
        }
    }else{
        linea = linea + instruccion._ID1 + '('
        if(instruccion._Parametros != undefined){
            instruccion._Parametros.forEach(param => {
                if(param._Coma == undefined){
                    linea = linea + param._ID.tipo;
                }else{
                    linea = linea + param._ID.tipo + ', ';
                }
            });
        }
        linea = linea +  ")";
    }

    linea = linea + ";\n";

    return { linea : linea };
}
/**
 * Función que se encarga de procesar la instrucción Metodo
 * @param {*} instruccion 
 */
function recorrerExp(instruccion, aux){
    if(instruccion.operandoIzq != undefined){
        aux = aux + recorrerExp(instruccion.operandoIzq, "").linea;
        aux = aux + instruccion.tipo;
        aux = aux + recorrerExp(instruccion.operandoDer, "").linea;
    }else{
        aux = aux + instruccion.tipo;
    } 
    return { linea : aux };
}

/**
 * Función que se encarga de procesar la instrucción Metodo
 * @param {*} instruccion 
 */
function procesarFOR(instruccion){
    
    var linea = "";
    var aux ="";

    instruccion._DEC._LD.forEach(dec => {
        linea = linea + 'var ' + dec._ID + '; \n';
        linea = linea + tabu(cou) + 'for (' + dec._ID + ' = ';
        if(dec._expresion.operandoIzq != undefined){
            linea = linea + recorrerExp(dec._expresion.operandoIzq, "").linea;
            linea = linea + dec._expresion.tipo;
            linea = linea + recorrerExp(dec._expresion.operandoDer, "").linea;
            linea = linea + '; ';
        }else{
            linea = linea + dec._expresion.tipo;
            linea = linea + '; ';
        }
    });
    if(instruccion._expresion1.operandoIzq != undefined){
        linea = linea + recorrerExp(instruccion._expresion1.operandoIzq, "").linea;
        linea = linea + instruccion._expresion1.tipo;
        linea = linea + recorrerExp(instruccion._expresion1.operandoDer, "").linea;
        linea = linea + '; ';
    }else{
        linea = linea + instruccion._expresion1.tipo + '; ';
    }
    linea = linea +  instruccion._expresion2.operandoIzq.tipo + instruccion._expresion2.tipo + ') { \n';
    if(instruccion._Sentencias != undefined){
        cou++;
        aux = aux + procesarAnidacion(cou, aux, instruccion._Sentencias).linea;
        linea = linea + aux;
        cou --;
    }
    linea = linea +"\n" + tabu(cou) +  "}\n";

    return { linea : linea };
}

/**
 * Función que se encarga de procesar la instrucción Metodo
 * @param {*} instruccion 
 */
function procesarWHILE(instruccion){
    
    var linea = "";
    var aux ="";
    linea = linea + 'while ( '
    if(instruccion._expresion.operandoIzq != undefined){
        linea = linea + recorrerExp(instruccion._expresion.operandoIzq, "").linea;
        linea = linea + instruccion._expresion.tipo;
        linea = linea + recorrerExp(instruccion._expresion.operandoDer, "").linea;
    }else{
        linea = linea + instruccion._expresion.tipo;
    }
    linea = linea + ') {\n';
    if(instruccion._Sentencias != undefined){
        cou++;
        aux = aux + procesarAnidacion(cou, aux, instruccion._Sentencias).linea;
        linea = linea + aux;
        cou --;
    }
    linea = linea +"\n" + tabu(cou) +  "}\n";

    return { linea : linea };
}

/**
 * Función que se encarga de procesar la instrucción Metodo
 * @param {*} instruccion 
 */
function procesarDO(instruccion){
    
    var linea = "";
    var aux ="";
    linea = linea + 'do { \n' 
    if(instruccion._Sentencias != undefined){
        cou++;
        aux = aux + procesarAnidacion(cou, aux, instruccion._Sentencias).linea;
        linea = linea + aux;
        cou --;
    }
    linea = linea +"\n" + tabu(cou) +  "}\n";
    linea = linea + 'while ( '
    if(instruccion._expresion.operandoIzq != undefined){
        linea = linea + recorrerExp(instruccion._expresion.operandoIzq, "").linea;
        linea = linea + instruccion._expresion.tipo;
        linea = linea + recorrerExp(instruccion._expresion.operandoDer, "").linea;
    }else{
        linea = linea + instruccion._expresion.tipo;
    }
    linea = linea + ');\n';

    return { linea : linea };
}

/**
 * Función que se encarga de procesar la instrucción Metodo
 * @param {*} instruccion 
 */
function procesarBreak(instruccion){
    
    var linea = "";
    linea = linea + instruccion._break +';\n';

    return { linea : linea };
}

/**
 * Función que se encarga de procesar la instrucción Metodo
 * @param {*} instruccion 
 */
function procesarContinue(instruccion){
    
    var linea = "";
    linea = linea + instruccion._continue+ '; \n';

    return { linea : linea };
}

/**
 * Función que se encarga de procesar la instrucción Metodo
 * @param {*} instruccion 
 */
function procesarReturn(instruccion){
    
    var linea = "";
    linea = linea + instruccion._return + ' ';
    if(instruccion._expresion != undefined){
        if(instruccion._expresion.operandoIzq != undefined){
            linea = linea + recorrerExp(instruccion._expresion.operandoIzq, "").linea;
            linea = linea + instruccion._expresion.tipo;
            linea = linea + recorrerExp(instruccion._expresion.operandoDer, "").linea;
        }else{
            linea = linea + instruccion._expresion.tipo;
        }
    }
    linea = linea + ';\n'; 
    return { linea : linea };
}

/**
 * Función que se encarga de procesar la instrucción Metodo
 * @param {*} instruccion 
 */
function procesarPrint(instruccion){
    
    var linea = "";

    linea = linea + 'console.log( ';
    if(instruccion._expresion != undefined){
        if(instruccion._expresion.operandoIzq != undefined){
            linea = linea + recorrerExp(instruccion._expresion.operandoIzq, "").linea;
            linea = linea + instruccion._expresion.tipo;
            linea = linea + recorrerExp(instruccion._expresion.operandoDer, "").linea;
        }else{
            linea = linea + instruccion._expresion.tipo;
        }
    }
    linea = linea + '); \n'; 

    return { linea : linea };
}

/**
 * Función que se encarga de procesar la instrucción Metodo
 * @param {*} instruccion 
 */
function procesarLlamada(instruccion){
    
    var linea = "";
    
    linea = linea + instruccion._ID + '('
    if(instruccion._Parametros != undefined){//si no tienen parametros
        instruccion._Parametros.forEach(param => {
            if(param._Coma == undefined){
                linea = linea + param._ID.tipo;
            }else{
                linea = linea + param._ID.tipo + ', ';
            }
        });
    }
    linea = linea +  "); \n";

    return { linea : linea };
}

/**
 * Función que se encarga de procesar la instrucción Metodo
 * @param {*} instruccion 
 */
function procesarIF(instruccion){
    
    var linea = "";
    var aux = "";
    linea = linea + 'if (';
    if(instruccion._expresion.operandoIzq != undefined){
        linea = linea + recorrerExp(instruccion._expresion.operandoIzq, "").linea;
        linea = linea + instruccion._expresion.tipo;
        linea = linea + recorrerExp(instruccion._expresion.operandoDer, "").linea;
    }else{
        linea = linea + instruccion._expresion.tipo;
    }
    linea = linea + ') { \n';
    if(instruccion._Sentencias != undefined){
        cou++;
        aux = aux + procesarAnidacion(cou, aux, instruccion._Sentencias).linea;
        linea = linea + aux;
        cou --;
    }
    linea = linea + "\n" + tabu(cou) +  "}\n";
    if(instruccion._else != undefined){
        instruccion._else.forEach(ei => {
            aux = "";
            if(ei._if == undefined){
                linea = linea + tabu(cou) + 'else { \n'
                if(ei._Sentencias != undefined){
                    cou++;
                    aux = aux + procesarAnidacion(cou, aux, ei._Sentencias).linea;
                    linea = linea + aux;
                    cou --;
                }
            }else{
                linea = linea +  tabu(cou) +  'else if ('
                if(ei._expresion.operandoIzq != undefined){
                    linea = linea + recorrerExp(ei._expresion.operandoIzq, "").linea;
                    linea = linea + ei._expresion.tipo;
                    linea = linea + recorrerExp(ei._expresion.operandoDer, "").linea;
                }else{
                    linea = linea + ei._expresion.tipo;
                }
                linea = linea + ') { \n';
                if(ei._Sentencias != undefined){
                    cou++;
                    aux = aux + procesarAnidacion(cou, aux, ei._Sentencias).linea;
                    linea = linea + aux;
                    cou --;
                }
            }
            linea = linea + "\n" + tabu(cou) +  "}\n";
        });
    }
    
    return { linea : linea };
}