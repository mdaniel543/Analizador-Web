var fs = require('fs');
var parser = require('../Analizador/Gramatica')


const Tipo_Instruccion = require('../AST/Instrucciones/Instruccion').TIPO_INSTRUCCION;

var cou = 0;
var ast;



/*try {
    const entrada = fs.readFileSync('../JavaApp.java');
    console.log(entrada.toString());
    ast = parser.parse(entrada.toString());
    fs.writeFileSync('./ast.json', JSON.stringify(ast, null, 2));
    const traduccione = procesar(ast);
    crearTraduccion(traduccione);
} catch (e) {
    console.error(e);
    return;
}*/

function crearTraduccion(contenido){
    fs.writeFile("Resultado.py", contenido, function(err) {
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
        }else if(instruccion.tipoIns === Tipo_Instruccion.INTERFACE){
            Traduccion = Traduccion + procesarInterface(instruccion).linea;
        }
    });

    console.log(Traduccion);
    
    return Traduccion;
}

function procesarAnidacion(tabulacion, Traduccion, instrucciones) {
    instrucciones.forEach(instruccion => {
        if(instruccion.tipoIns === Tipo_Instruccion.IMETODO){
            Traduccion = Traduccion + tabu(tabulacion) + procesarMetodos(instruccion).linea;
        }else if(instruccion.tipoIns === Tipo_Instruccion.MAIN){
            Traduccion = Traduccion + tabu(tabulacion) + procesarMain(instruccion).linea;
        }else if(instruccion.tipoIns === Tipo_Instruccion.DMETODO){
            Traduccion = Traduccion + tabu(tabulacion) + procesarMetodosD(instruccion).linea;
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
    
    linea = linea + 'class ' + instruccion._ID + ': \n';
    if(instruccion.estado == 'lleno'){
        cou++;
        aux = aux + procesarAnidacion(cou, aux, instruccion._AyM).linea;
        linea = linea + aux;
        cou --;
    }
    linea = linea + '\n';

    return { linea : linea };
}
/**
 * Función que se encarga de procesar la instrucción Class
 * @param {*} instruccion 
 */
function procesarInterface(instruccion) {

    var linea = "";
    var aux ="";
    
    linea = linea + 'class ' + instruccion._ID + ': \n';
    if(instruccion._M_IN != undefined){
        cou++;
        aux = aux + procesarAnidacion(cou, aux, instruccion._M_IN).linea;
        linea = linea + aux;
        cou --;
    }
    linea = linea + ' \n';

    return { linea : linea };
}
/**
 * Función que se encarga de procesar la instrucción Metodo
 * @param {*} instruccion 
 */
function procesarMetodosD(instruccion){
    var linea = "";
    if(instruccion._Parametros == undefined){//si no tienen parametros
        linea = linea + 'self ' + instruccion._ID + '();';
    }else{
        linea = linea + 'self ' + instruccion._ID + '(';
        instruccion._Parametros.forEach(param => {
            if(param._Coma == undefined){
                linea = linea + param._ID.tipo;
            }else{
                linea = linea + param._ID.tipo + ', ';
            }
        });
        linea = linea + ');';

    }
    linea = linea +"\n";

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
        linea = linea + 'def ' + instruccion._ID + '(): \n';
        if(instruccion.estado == 'lleno'){
            cou++;
            aux = aux + procesarAnidacion(cou, aux, instruccion._Sentencias).linea;
            linea = linea + aux;
            cou --;
        }
    }else{
        linea = linea + 'def ' + instruccion._ID + '(';
        instruccion._Parametros.forEach(param => {
            if(param._Coma == undefined){
                linea = linea + param._ID.tipo;
            }else{
                linea = linea + param._ID.tipo + ', ';
            }
        });
        linea = linea + '): \n';
        if(instruccion.estado == 'lleno'){
            cou++;
            aux = aux + procesarAnidacion(cou, aux, instruccion._Sentencias).linea;
            linea = linea + aux;
            cou --;
        }
    }
    linea = linea +"\n";

    return { linea : linea };
}
/**
 * Función que se encarga de procesar la instrucción Metodo
 * @param {*} instruccion 
 */
function procesarMain(instruccion){
    var linea = "";
    var aux ="";
    linea = linea + 'if __name__ = "__main__": \n';
        
    if(instruccion._Sentencias != undefined){
        cou++;
        aux = aux + procesarAnidacion(cou, aux, instruccion._Sentencias).linea;
        linea = linea + aux;
        cou --;
    }
   
    linea = linea +"\n";

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
                    if(dec._expresion.tipo == '&&'){
                        linea = linea + ' and ';
                    }else if(dec._expresion.tipo == '||'){
                        linea = linea + ' or ';
                    }else if(dec._expresion.tipo == '^'){
                        linea = linea + ' xor ';
                    }else{
                        linea = linea + dec._expresion.tipo;
                    }
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
    linea = linea + "\n";

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
            if(instruccion._expresion.tipo == '&&'){
                linea = linea + ' and ';
            }else if(instruccion._expresion.tipo == '||'){
                linea = linea + ' or ';
            }else if(instruccion._expresion.tipo == '^'){
                linea = linea + ' xor ';
            }else{
                linea = linea + instruccion._expresion.tipo;
            }
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

    linea = linea + "\n";

    return { linea : linea };
}
/**
 * Función que se encarga de procesar la instrucción Metodo
 * @param {*} instruccion 
 */
function recorrerExp(instruccion, aux){
    if(instruccion.operandoIzq != undefined){
        aux = aux + recorrerExp(instruccion.operandoIzq, "").linea;
        if(instruccion.tipo == '&&'){
            aux = aux + ' and ';
        }else if(instruccion.tipo == '||'){
            aux = aux + ' or ';
        }else if(instruccion.tipo == '^'){
            aux = aux + ' xor ';
        }else{
            aux = aux + instruccion.tipo;
        }
        aux = aux + recorrerExp(instruccion.operandoDer, "").linea;
    }else{
        if(instruccion.tipo == '&&'){
            aux = aux + ' and ';
        }else if(instruccion.tipo == '||'){
            aux = aux + ' or ';
        }else if(instruccion.tipo == '^'){
            aux = aux + ' xor ';
        }else{
            aux = aux + instruccion.tipo;
        }
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
        linea = linea + 'for ' + dec._ID + ' in range (';
        if(dec._expresion.operandoIzq != undefined){
            linea = linea + recorrerExp(dec._expresion.operandoIzq, "").linea;
            if(dec._expresion.tipo == '&&'){
                linea = linea + ' and ';
            }else if(dec._expresion.tipo == '||'){
                linea = linea + ' or ';
            }else if(dec._expresion.tipo == '^'){
                linea = linea + ' xor ';
            }else{
                linea = linea + dec._expresion.tipo;
            }
            linea = linea + recorrerExp(dec._expresion.operandoDer, "").linea;
            linea = linea + ', ';
        }else{
            if(dec._expresion.tipo == '&&'){
                linea = linea + ' and ';
            }else if(dec._expresion.tipo == '||'){
                linea = linea + ' or ';
            }else if(dec._expresion.tipo == '^'){
                linea = linea + ' xor ';
            }else{
                linea = linea + dec._expresion.tipo;
            }
            linea = linea + ',';
        }
    });
    if(instruccion._expresion1.operandoIzq != undefined){
        linea = linea + recorrerExp(instruccion._expresion1.operandoIzq, "").linea;
        if(instruccion._expresion1.tipo == '&&'){
            linea = linea + ' and ';
        }else if(instruccion._expresion1.tipo == '||'){
            linea = linea + ' or ';
        }else if(instruccion._expresion1.tipo == '^'){
            linea = linea + ' xor ';
        }else{
            linea = linea + instruccion._expresion1.tipo;
        }
        linea = linea + recorrerExp(instruccion._expresion1.operandoDer, "").linea;
    }else{
        linea = linea + instruccion._expresion1.tipo;
    }
    linea = linea + ') : \n';
    if(instruccion._Sentencias != undefined){
        cou++;
        aux = aux + procesarAnidacion(cou, aux, instruccion._Sentencias).linea;
        linea = linea + aux;
        cou --;
    }
    linea = linea +"\n";

    return { linea : linea };
}

/**
 * Función que se encarga de procesar la instrucción Metodo
 * @param {*} instruccion 
 */
function procesarWHILE(instruccion){
    
    var linea = "";
    var aux ="";
    linea = linea + 'while '
    if(instruccion._expresion.operandoIzq != undefined){
        linea = linea + recorrerExp(instruccion._expresion.operandoIzq, "").linea;
        if(instruccion._expresion.tipo == '&&'){
            linea = linea + ' and ';
        }else if(instruccion._expresion.tipo == '||'){
            linea = linea + ' or ';
        }else if(instruccion._expresion.tipo == '^'){
            linea = linea + ' xor ';
        }else{
            linea = linea + instruccion._expresion.tipo;
        }
        linea = linea + recorrerExp(instruccion._expresion.operandoDer, "").linea;
    }else{
        linea = linea + instruccion._expresion.tipo;
    }
    linea = linea + ': \n';
    if(instruccion._Sentencias != undefined){
        cou++;
        aux = aux + procesarAnidacion(cou, aux, instruccion._Sentencias).linea;
        linea = linea + aux;
        cou --;
    }
    linea = linea +"\n";

    return { linea : linea };
}

/**
 * Función que se encarga de procesar la instrucción Metodo
 * @param {*} instruccion 
 */
function procesarDO(instruccion){
    
    var linea = "";
    var aux ="";
    linea = linea + 'while '
    if(instruccion._expresion.operandoIzq != undefined){
        linea = linea + recorrerExp(instruccion._expresion.operandoIzq, "").linea;
        if(instruccion._expresion.tipo == '&&'){
            linea = linea + ' and ';
        }else if(instruccion._expresion.tipo == '||'){
            linea = linea + ' or ';
        }else if(instruccion._expresion.tipo == '^'){
            linea = linea + ' xor ';
        }else{
            linea = linea + instruccion._expresion.tipo;
        }
        linea = linea + recorrerExp(instruccion._expresion.operandoDer, "").linea;
    }else{
        linea = linea + instruccion._expresion.tipo;
    }
    linea = linea + ': \n';
    if(instruccion._Sentencias != undefined){
        cou++;
        aux = aux + procesarAnidacion(cou, aux, instruccion._Sentencias).linea;
        linea = linea + aux;
        cou --;
    }
    linea = linea +"\n";

    return { linea : linea };
}

/**
 * Función que se encarga de procesar la instrucción Metodo
 * @param {*} instruccion 
 */
function procesarBreak(instruccion){
    
    var linea = "";
    linea = linea + instruccion._break +'\n';

    return { linea : linea };
}

/**
 * Función que se encarga de procesar la instrucción Metodo
 * @param {*} instruccion 
 */
function procesarContinue(instruccion){
    
    var linea = "";
    linea = linea + instruccion._continue+ ' \n';

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
            if(instruccion._expresion.tipo == '&&'){
                linea = linea + ' and ';
            }else if(instruccion._expresion.tipo == '||'){
                linea = linea + ' or ';
            }else if(instruccion._expresion.tipo == '^'){
                linea = linea + ' xor ';
            }else{
                linea = linea + instruccion._expresion.tipo;
            }
            linea = linea + recorrerExp(instruccion._expresion.operandoDer, "").linea;
        }else{
            linea = linea + instruccion._expresion.tipo;
        }
    }
    linea = linea + '\n'; 
    return { linea : linea };
}

/**
 * Función que se encarga de procesar la instrucción Metodo
 * @param {*} instruccion 
 */
function procesarPrint(instruccion){
    
    var linea = "";

    linea = linea + 'print( ';
    if(instruccion._expresion != undefined){
        if(instruccion._expresion.operandoIzq != undefined){
            linea = linea + recorrerExp(instruccion._expresion.operandoIzq, "").linea;
            if(instruccion._expresion.tipo == '&&'){
                linea = linea + ' and ';
            }else if(instruccion._expresion.tipo == '||'){
                linea = linea + ' or ';
            }else if(instruccion._expresion.tipo == '^'){
                linea = linea + ' xor ';
            }else{
                linea = linea + instruccion._expresion.tipo;
            }
            linea = linea + recorrerExp(instruccion._expresion.operandoDer, "").linea;
        }else{
            linea = linea + instruccion._expresion.tipo;
        }
    }
    linea = linea + ') \n'; 

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
    linea = linea +  ") \n";

    return { linea : linea };
}

/**
 * Función que se encarga de procesar la instrucción Metodo
 * @param {*} instruccion 
 */
function procesarIF(instruccion){
    
    var linea = "";
    var aux = "";
    linea = linea + 'if ';
    if(instruccion._expresion.operandoIzq != undefined){
        linea = linea + recorrerExp(instruccion._expresion.operandoIzq, "").linea;
        if(instruccion._expresion.tipo == '&&'){
            linea = linea + ' and ';
        }else if(instruccion._expresion.tipo == '||'){
            linea = linea + ' or ';
        }else if(instruccion._expresion.tipo == '^'){
            linea = linea + ' xor ';
        }else{
            linea = linea + instruccion._expresion.tipo;
        }
        linea = linea + recorrerExp(instruccion._expresion.operandoDer, "").linea;
    }else{
        linea = linea + instruccion._expresion.tipo;
    }
    linea = linea + ': \n';
    if(instruccion._Sentencias != undefined){
        cou++;
        aux = aux + procesarAnidacion(cou, aux, instruccion._Sentencias).linea;
        linea = linea + aux;
        cou --;
    }
    if(instruccion._else != undefined){
        instruccion._else.forEach(ei => {
            aux = "";
            if(ei._if == undefined){
                linea = linea + tabu(cou) + 'else \n'
                if(ei._Sentencias != undefined){
                    cou++;
                    aux = aux + procesarAnidacion(cou, aux, ei._Sentencias).linea;
                    linea = linea + aux;
                    cou --;
                }
            }else{
                linea = linea +  tabu(cou) +  'elif '
                if(ei._expresion.operandoIzq != undefined){
                    linea = linea + recorrerExp(ei._expresion.operandoIzq, "").linea;
                    if(instruccion._expresion.tipo == '&&'){
                        linea = linea + ' and ';
                    }else if(instruccion._expresion.tipo == '||'){
                        linea = linea + ' or ';
                    }else if(instruccion._expresion.tipo == '^'){
                        linea = linea + ' xor ';
                    }else{
                        linea = linea + instruccion._expresion.tipo;
                    }
                    linea = linea + recorrerExp(ei._expresion.operandoDer, "").linea;
                }else{
                    linea = linea + ei._expresion.tipo;
                }
                linea = linea + ': \n';
                if(ei._Sentencias != undefined){
                    cou++;
                    aux = aux + procesarAnidacion(cou, aux, ei._Sentencias).linea;
                    linea = linea + aux;
                    cou --;
                }
            }
        });
    }
    
    return { linea : linea };
}



module.exports.procesar = procesar;