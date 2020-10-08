// Constantes para los tipos de 'valores' que reconoce nuestra gramática.
const TIPO_VALOR = {
	NUMERO:         'VAL_NUMERO',
	IDENTIFICADOR:  'VAL_IDENTIFICADOR',
    CADENA:         'VAL_CADENA',
    CARACTER:       'VAL_CARACTER',
    TRUE:           'VAL_TRUE',
    FALSE:          'VAL_FALSE',
    //NOT:            'VAL_NOT',
}

// Constantes para los tipos de 'operaciones' que soporta nuestra gramática.
const TIPO_OPERACION = {
	SUMA:           'OP_SUMA',
	RESTA:          'OP_RESTA',
	MULTIPLICACION: 'OP_MULTIPLICACION',
    DIVISION:       'OP_DIVISION',
    XOR:            'OP_XOR',         
    
    NEGATIVO:       'OP_NEGATIVO',
    
	MAYOR_QUE:      'OP_MAYOR_QUE',
    MENOR_QUE:      'OP_MENOR_QUE',
    IGUAL:          'OP_IGUAL_IGUAL',
    MAYOR_IGUAL :   'OP_MAYOR_IGUAL',
    MENOR_IGUAL :   'OP_MENOR_IGUAL',
    NO_IGUAL :      'OP_NO_IGUAL',

    AND :           'OP_AND',
    OR :            'OP_OR',
    NOT :           'OP_NOT',

    INCREMENTACION: 'OP_INCRE',
    DISMINUCION:    'OP_DISMI',     

}

// Constantes para los tipos de 'instrucciones' válidas en nuestra gramática.
const TIPO_INSTRUCCION = {
	CLASS:       'INSTR_CLASS',
	INTERFACE:   'INSTR_INTERFACE',
	IMETODO:     'INSTR_IMETODO', //Metodo implementado
    DMETODO:     'INSTR_DMETODO', //Metodo declarados+
    MAIN:        'INSTR_MAIN',
    DECLARACION: 'INSTR_DECLA',
    
    FOR:         'INSTR_FOR',
    WHILE:       'INSTR_WHILE',
    DO:          'INSTR_DO',
    IF:          'INSTR_IF',
    BREAK:       'INSTR_BREAK',
    CONTINUE:    'INSTR_CONTINUE',
    RETURN:      'INSTR_RETURN',
    PRINT:       'INSTR_PRINT',
    ASIGNACION:  'INSTR_ASIG',
    LLAMADA_M:   'INSTR_LLA_M',
}


/**
 * Esta función se encarga de crear objetos tipo Operación.
 * Recibe como parámetros el operando izquierdo y el operando derecho.
 * También recibe como parámetro el tipo del operador
 * @param {*} operandoIzq 
 * @param {*} operandoDer 
 * @param {*} tipo 
 */

function nuevaOperacion(operandoIzq, operandoDer, tipo) {
	return {
		operandoIzq: operandoIzq,
		operandoDer: operandoDer,
		tipo: tipo
	}
}



/**
 * El objetivo de esta API es proveer las funciones necesarias para la construcción de operaciones e instrucciones.
 */

const instruccionesAPI = {


    /**
	 * Crea un nuevo objeto tipo Operación para las operaciones binarias válidas.
	 * @param {*} operandoIzq 
	 * @param {*} operandoDer 
	 * @param {*} tipo 
	 */
	nuevoOperacionBinaria: function(operandoIzq, operandoDer, tipo) {
		return nuevaOperacion(operandoIzq, operandoDer, tipo);
	},

	/**
	 * Crea un nuevo objeto tipo Operación para las operaciones unarias válidas
	 * @param {*} operando 
	 * @param {*} tipo 
	 */
	nuevoOperacionUnaria: function(operando, tipo) {
		return nuevaOperacion(operando, undefined, tipo);
    },
    

    /**
	 * Crea un nuevo objeto tipo Valor, esto puede ser una cadena, un número o un identificador
	 * @param {*} valor 
	 * @param {*} tipo 
	 */
	nuevoValor: function(valor, tipo) {
		return {
			tipo: tipo,
			valor: valor
		}
    },

    //---------------------------------CLASS---------------------------------
    /**
     * Creo un nuevo objeto para classs 
     * @param {*} _public
     * @param {*} _clase
     * @param {*} _ID
     * @param {*} _LL_ABRE
     * @param {*} _AyM
     * @param {*} _LL_CIERRA
     */

	nuevoClase: function(_public, _clase, _ID, _LL_ABRE, _AyM, _LL_CIERRA) {
		return {
			tipoIns: TIPO_INSTRUCCION.CLASS,
            _public = _public,
            _clase = _clase,
            _ID = _ID,
            _LL_ABRE = _LL_ABRE,
            _AyM = _AyM,
            _LL_CIERRA = _LL_CIERRA
		}
    },

    /**
     * Creo un nuevo objeto para classs vacia
     * @param {*} _public
     * @param {*} _clase
     * @param {*} _ID
     * @param {*} _LL_ABRE
     * @param {*} _LL_CIERRA
     */
	nuevoClase: function(_public, _clase, _ID, _LL_ABRE, _LL_CIERRA) {
		return {
			tipoIns: TIPO_INSTRUCCION.CLASS,
            _public = _public,
            _clase = _clase,
            _ID = _ID,
            _LL_ABRE = _LL_ABRE,
            _LL_CIERRA = _LL_CIERRA
		}
    },
    
    //--------------------------------INTERFACE------------------------------
    /**
     * Creo un nuevo objeto para interfaces 
     * @param {*} _public
     * @param {*} _interface
     * @param {*} _ID
     * @param {*} _LL_ABRE
     * @param {*} _M_IN
     * @param {*} _LL_CIERRA
     */
	nuevoClase: function(_public, _interface, _ID, _LL_ABRE, _M_IN, _LL_CIERRA) {
		return {
			tipoIns: TIPO_INSTRUCCION.INTERFACE,
            _public = _public,
            _interface = _interface,
            _ID = _ID,
            _LL_ABRE = _LL_ABRE,
            _M_IN = _M_IN,
            _LL_CIERRA = _LL_CIERRA
		}
    },
    /**
     * Creo un nuevo objeto para interfaces vacias
     * @param {*} _public
     * @param {*} _interface
     * @param {*} _ID
     * @param {*} _LL_ABRE
     * @param {*} _LL_CIERRA
     */
	nuevoClase: function(_public, _interface, _ID, _LL_ABRE, _LL_CIERRA) {
		return {
			tipoIns: TIPO_INSTRUCCION.INTERFACE,
            _public = _public,
            _interface = _interface,
            _ID = _ID,
            _LL_ABRE = _LL_ABRE,
            _LL_CIERRA = _LL_CIERRA
		}
    },

    //------------------Declaraciones e implementaciones de metodos ---------------
    
    /**
     * Creo un objeto para los metodos implementados
     * @param {*} _public
     * @param {*} _S4
     * @param {*} _ID
     * @param {*} _P_ABRE
     * @param {*} _Parametros
     * @param {*} _P_CIERRA
     * @param {*} _LL_ABRE
     * @param {*} _Sentencias
     * @param {*} _LL_CIERRA
     */
    nuevoMI_P: function(_public, _S4, _ID, _P_ABRE, _Parametros, _P_CIERRA, _LL_ABRE, _Sentencias, _LL_CIERRA){
        return{
            tipoIns: TIPO_INSTRUCCION.IMETODO,
            _public = _public,
            _S4 = _S4,
            _ID = _ID,
            _P_ABRE = _P_ABRE,
            _Parametros = _Parametros,
            _P_CIERRA = _P_CIERRA,
            _LL_ABRE = _LL_ABRE,
            _Sentencias = _Sentencias,
            _LL_CIERRA = _LL_CIERRA
        }
    },

    /**
     * Creo un objeto para los metodos implementados sin parametros
     * @param {*} _public
     * @param {*} _S4
     * @param {*} _ID
     * @param {*} _P_ABRE
     * @param {*} _P_CIERRA
     * @param {*} _LL_ABRE
     * @param {*} _Sentencias
     * @param {*} _LL_CIERRA
     */
    nuevoMI_SP: function(_public, _S4, _ID, _P_ABRE, _P_CIERRA, _LL_ABRE, _Sentencias, _LL_CIERRA){
        return{
            tipoIns: TIPO_INSTRUCCION.IMETODO,
            _public = _public,
            _S4= _S4,
            _ID = _ID,
            _P_ABRE = _P_ABRE,
            _P_CIERRA = _P_CIERRA,
            _LL_ABRE = _LL_ABRE,
            _Sentencias = _Sentencias,
            _LL_CIERRA = _LL_CIERRA
        }
    },
    /**
     * Creo un objeto para los metodos declarados
     * @param {*} _public
     * @param {*} _S4
     * @param {*} _ID
     * @param {*} _P_ABRE
     * @param {*} _Parametros
     * @param {*} _P_CIERRA
     * @param {*} _PyC
     */
    nuevoMD_P: function(_public, _S4, _ID, _P_ABRE, _Parametros, _P_CIERRA, _PyC){
        return{
            tipoIns: TIPO_INSTRUCCION.DMETODO,
            _public = _public,
            _S4 = _S4,
            _ID = _ID,
            _P_ABRE = _P_ABRE,
            _Parametros = _Parametros,
            _P_CIERRA = _P_CIERRA,
            _PyC = _PyC
        }
    },

    /**
     * Creo un objeto para los metodos declarados sin parametros
     * @param {*} _public
     * @param {*} _S4
     * @param {*} _ID
     * @param {*} _P_ABRE
     * @param {*} _P_CIERRA
     * @param {*} _PyC
     */
    nuevoMD_SP: function(_public, _S4, _ID, _P_ABRE, _P_CIERRA, _PyC){
        return{
            tipoIns: TIPO_INSTRUCCION.DMETODO,
            _public = _public,
            _S4= _S4,
            _ID = _ID,
            _P_ABRE = _P_ABRE,
            _P_CIERRA = _P_CIERRA,
            _PyC = _PyC
        }
    },


    //-------------------------Implementacion del main-------------------------
    /**
     * Creo un objeto para el main
     * @param {*} _public
     * @param {*} _void 
     * @param {*} _main
     * @param {*} _P_ABRE
     * @param {*} _String
     * @param {*} _C_ABRE
     * @param {*} _C_CIERRA
     * @param {*} _args
     * @param {*} _P_CIERRA
     * @param {*} _LL_ABRE
     * @param {*} _Sentencias
     * @param {*} _LL_CIERRA
     */
    nuevoMAIN: function(_public, _void, _main, _P_ABRE, _String, _C_ABRE, _C_CIERRA, _args, _P_CIERRA, _LL_ABRE, _Sentencias, _LL_CIERRA){
        return{
            tipoIns: TIPO_INSTRUCCION.MAIN,
            _public = _public,
            _void= _void,
            _main = _main,
            _P_ABRE = _P_ABRE,
            _String = _String,
            _C_ABRE = _C_ABRE,
            _C_CIERRA = _C_CIERRA,
            _args = _args,
            _P_CIERRA = _P_CIERRA,
            _LL_ABRE = _LL_ABRE
        }
    },

    //---------------------------------PARAMETROS---------------------------
    /**
	 * Creo un objeto para Parametros para expresion
	 * @param {*} expresion 
	 */
	nuevoPA_E: function(expresion) {
		return {
			expresion : expresion
		}
    },
    /**
	 * Creo un objeto para Parametros para expresion con coma
	 * @param {*} expresion 
     * @param {*} _Coma
	 */
	nuevoPA_E_C: function(expresion, _Coma) {
		return {
            expresion : expresion,
            _Coma: _Coma
		}
    },
    /**
	 * Creo un objeto para Parametros 
	 * @param {*} _Type 
     * @param {*} _ID
	 */
	nuevoPA: function(_Type, _ID) {
		return {
            _Type: _Type,
            _ID: _ID
		}
    },
    /**
	 * Creo un objeto para Parametros con coma
	 * @param {*} _Type 
     * @param {*} _ID
     * @param {*} _Coma
	 */
	nuevoPA_C: function(_Type, _ID, _Coma) {
		return {
            _Type: _Type,
            _ID: _ID,
            _Coma: _Coma
		}
    },

    //-----------------------------Atributos------------------------------
    /**
     * Creo un objetos para Declaracion de variables para expresion
     * @param {*} _Type
     * @param {*} _ID
     * @param {*} _Igual
     * @param {*} _expresion
     */
    nuevoD_E: function(_Type, _ID, _Igual, _expresion){
        return{
            tipoIns: TIPO_INSTRUCCION.DECLARACION,
            _Type: _Type,
            _ID: _ID,
            _Igual: _Igual,
            _expresion: _expresion
        }
    },
    /**
     * Creo un objetos para Declaracion de variables
     * @param {*} _Type
     * @param {*} _ID
     */
    nuevoD: function(_Type, _ID){
        return{
            tipoIns: TIPO_INSTRUCCION.DECLARACION,
            _Type: _Type,
            _ID: _ID
        }
    },

    /**
     * Creo un objetos para Declaracion de variables para expresion coma
     * @param {*} _Type
     * @param {*} _ID
     * @param {*} _Igual
     * @param {*} _expresion
     * @param {*} _Coma
     */
    nuevoD_E_C: function(_Type, _ID, _Igual, _expresion, _Coma){
        return{
            tipoIns: TIPO_INSTRUCCION.DECLARACION,
            _Type: _Type,
            _ID: _ID,
            _Igual: _Igual,
            _expresion: _expresion,
            _Coma: _Coma
        }
    },
    /**
     * Creo un objetos para Declaracion de variables coma
     * @param {*} _Type
     * @param {*} _ID
     * @param {*} _Coma
     */
    nuevoD_C: function(_Type, _ID, _Coma){
        return{
            tipoIns: TIPO_INSTRUCCION.DECLARACION,
            _Type: _Type,
            _ID: _ID,
            _Coma: _Coma
        }
    },

    //------------------------------ASIGNACION----------------------------------------
    /**
     * Creo un objetos para asignacion de variables para expresion
     * @param {*} _ID
     * @param {*} _Igual
     * @param {*} _expresion
     */
    nuevoD_I: function(_ID, _Igual, _expresion){
        return{
            tipoIns: TIPO_INSTRUCCION.ASIGNACION,
            _ID: _ID,
            _Igual: _Igual,
            _expresion: _expresion
        }
    },
    /**
     * Creo un objetos para asignacion de variables para expresion coma
     * @param {*} _ID
     * @param {*} _Igual
     * @param {*} _expresion
     * @param {*} _Coma
     */
    nuevoD_I_C: function(_ID, _Igual, _expresion, _Coma){
        return{
            tipoIns: TIPO_INSTRUCCION.ASIGNACION,
            _ID: _ID,
            _Igual: _Igual,
            _expresion: _expresion,
            _Coma: _Coma
        }
    },
    //---------------------------LLAMADA METODOS---------------------------------
    /**
     * Creo un objetos para la llamada de metodos
     * @param {*} _ID
     * @param {*} _P_ABRE
     * @param {*} _Parametros
     * @param {*} _P_CIERRA
     * @param {*} _PyC
     */
    nuevoLLAMA_M: function(_ID, _P_ABRE, _Parametros, _P_CIERRA, _PyC){
        return{
            tipoIns: TIPO_INSTRUCCION.LLAMADA_M,
            _ID: _ID,
            _P_ABRE: _P_ABRE,
            _Parametros: _Parametros,
            _P_CIERRA: _P_CIERRA,
            _PyC: _PyC
        }
    },

    /**
     * Creo un objetos para la llamada de metodos sin parametros
     * @param {*} _ID
     * @param {*} _P_ABRE
     * @param {*} _P_CIERRA
     * @param {*} _PyC
     */
    nuevoLLAMA_M_V: function(_ID, _P_ABRE,  _P_CIERRA, _PyC){
        return{
            tipoIns: TIPO_INSTRUCCION.LLAMADA_M,
            _ID: _ID,
            _P_ABRE: _P_ABRE,
            _P_CIERRA: _P_CIERRA,
            _PyC: _PyC
        }
    },

    //=================================FOR====================================
    /**
     * Creo un objeto para la sentencia for
     * @param {*} _FOR
     * @param {*} _P_ABRE
     * @param {*} _Type
     * @param {*} _ID
     * @param {*} _Igual
     * @param {*} _expresion1
     * @param {*} _PyC1
     * @param {*} _expresion2
     * @param {*} _PyC2
     * @param {*} _expresion3
     * @param {*} _P_CIERRA
     * @param {*} _LL_ABRE
     * @param {*} _Sentencias
     * @param {*} _LL_CIERRA
     */
    nuevoFor: function(_FOR, _P_ABRE, _Type, _ID, _Igual, _expresion1, _PyC1, _expresion2, _PyC2, _expresion3, _P_CIERRA, _LL_ABRE, _Sentencias, _LL_CIERRA){
        return{
            tipoIns: TIPO_INSTRUCCION.FOR,
            _FOR: _FOR,
            _P_ABRE: _P_ABRE,
            _Type: _Type,
            _ID: _ID,
            _Igual: _Igual,
            _expresion1: _expresion1,
            _PyC1: _PyC1,
            _expresion2: _expresion2,
            _PyC2: _PyC2,
            _expresion3: _expresion3,
            _P_CIERRA: _P_CIERRA,
            _LL_ABRE: _LL_ABRE, 
            _Sentencias: _Sentencias,
            _LL_CIERRA: _LL_CIERRA
        }
    },
    /**
     * Creo un objeto para la sentencia for vacio
     * @param {*} _FOR
     * @param {*} _P_ABRE
     * @param {*} _Type
     * @param {*} _ID
     * @param {*} _Igual
     * @param {*} _expresion1
     * @param {*} _PyC1
     * @param {*} _expresion2
     * @param {*} _PyC2
     * @param {*} _expresion3
     * @param {*} _P_CIERRA
     * @param {*} _LL_ABRE
     * @param {*} _LL_CIERRA
     */
    nuevoForV: function(_FOR, _P_ABRE, _Type, _ID, _Igual, _expresion1, _PyC1, _expresion2, _PyC2, _expresion3, _P_CIERRA, _LL_ABRE, _LL_CIERRA){
        return{
            tipoIns: TIPO_INSTRUCCION.FOR,
            _FOR: _FOR,
            _P_ABRE: _P_ABRE,
            _Type: _Type,
            _ID: _ID,
            _Igual: _Igual,
            _expresion1: _expresion1,
            _PyC1: _PyC1,
            _expresion2: _expresion2,
            _PyC2: _PyC2,
            _expresion3: _expresion3,
            _P_CIERRA: _P_CIERRA,
            _LL_ABRE: _LL_ABRE, 
            _LL_CIERRA: _LL_CIERRA
        }
    },
    //=================================WHILE=================================
    /**
	 * Crea un objeto para la instruccion WHILE.
	 * @param {*} _while
	 * @param {*} _P_ABRE
	 * @param {*} _expresion 
	 * @param {*} _P_CIERRA
	 * @param {*} _LL_ABRE
	 * @param {*} _Sentencias
	 * @param {*} _LL_CIERRA
	 */
	nuevoWhile: function(_while, _P_ABRE, _expresion , _P_CIERRA, _LL_ABRE, _Sentencias, _LL_CIERRA) {
		return {
			tipoIns: TIPO_INSTRUCCION.WHILE,
			_while: _while,
			_P_ABRE: _P_ABRE,
			_expresion: _expresion,
			_P_CIERRA: _P_CIERRA,
		    _LL_ABRE: _LL_ABRE,
			_Sentencias: _Sentencias,
			_LL_CIERRA: _LL_CIERRA
		}
    },
    /**
	 * Crea un objeto para la instruccion while vacia
	 * @param {*} _while
	 * @param {*} _P_ABRE
	 * @param {*} _expresion 
	 * @param {*} _P_CIERRA
	 * @param {*} _LL_ABRE
	 * @param {*} _LL_CIERRA
	 */
	nuevoWhileV: function(_while, _P_ABRE, _expresion , _P_CIERRA, _LL_ABRE, _LL_CIERRA) {
		return {
			tipoIns: TIPO_INSTRUCCION.WHILE,
			_while: _while,
			_P_ABRE: _P_ABRE,
			_expresion: _expresion,
			_P_CIERRA: _P_CIERRA,
		    _LL_ABRE: _LL_ABRE,
			_LL_CIERRA: _LL_CIERRA
		}
	},

    //==============================DO========================================
    /**
	 * Crea un objeto para la instruccion do.
     * @param {*} _do
     * @param {*} _LL_ABRE
	 * @param {*} _Sentencias
	 * @param {*} _LL_CIERRA
	 * @param {*} _while
	 * @param {*} _P_ABRE
	 * @param {*} _expresion 
	 * @param {*} _P_CIERRA
     * @param {*} _PyC
	 */
	nuevodo: function(_do, _LL_ABRE, _Sentencias, _LL_CIERRA, _while, _P_ABRE, _expresion , _P_CIERRA, _PyC) {
		return {
            tipoIns: TIPO_INSTRUCCION.DO,
            _do: _do,
            _LL_ABRE: _LL_ABRE,
			_Sentencias: _Sentencias,
			_LL_CIERRA: _LL_CIERRA,
            _while: _while,
			_P_ABRE: _P_ABRE,
			_expresion: _expresion,
			_P_CIERRA: _P_CIERRA,
            _PyC: _PyC
		}
    },
    /**
	 * Crea un objeto para la instruccion do vacio.
     * @param {*} _do
     * @param {*} _LL_ABRE
	 * @param {*} _LL_CIERRA
	 * @param {*} _while
	 * @param {*} _P_ABRE
	 * @param {*} _expresion 
	 * @param {*} _P_CIERRA
     * @param {*} _PyC
	 */
	nuevodoV: function(_do, _LL_ABRE, _LL_CIERRA, _while, _P_ABRE, _expresion , _P_CIERRA, _PyC) {
		return {
            tipoIns: TIPO_INSTRUCCION.DO,
            _do: _do,
            _LL_ABRE: _LL_ABRE,
			_LL_CIERRA: _LL_CIERRA,
            _while: _while,
			_P_ABRE: _P_ABRE,
			_expresion: _expresion,
			_P_CIERRA: _P_CIERRA,
            _PyC: _PyC
		}
    },
    //===================================IF=================================
    /**
     * Creo un objeto para la instruccion IF
     * @param {*} _if 
     * @param {*} _P_ABRE
     * @param {*} _expresion
     * @param {*} _P_CIERRA
     * @param {*} _LL_ABRE
     * @param {*} _Sentencias
     * @param {*} _LL_CIERRA
     */
    nuevoif: function(_if, _P_ABRE, _expresion, _P_CIERRA, _LL_ABRE, _Sentencias, _LL_CIERRA){
        return{
            tipoIns: TIPO_INSTRUCCION.IF,
            _if: _if, 
            _P_ABRE: _P_ABRE,
            _expresion: _expresion, 
            _P_CIERRA: _P_CIERRA,
            _LL_ABRE: _LL_ABRE,
            _Sentencias: _Sentencias,
            _LL_CIERRA: _LL_CIERRA
        }
    },
    /**
     * Creo un objeto para la instruccion IF vacio 
     * @param {*} _if 
     * @param {*} _P_ABRE
     * @param {*} _expresion
     * @param {*} _P_CIERRA
     * @param {*} _LL_ABRE
     * @param {*} _LL_CIERRA
     */
    nuevoifV: function(_if, _P_ABRE, _expresion, _P_CIERRA, _LL_ABRE, _LL_CIERRA){
        return{
            tipoIns: TIPO_INSTRUCCION.IF,
            _if: _if, 
            _P_ABRE: _P_ABRE,
            _expresion: _expresion, 
            _P_CIERRA: _P_CIERRA,
            _LL_ABRE: _LL_ABRE,
            _LL_CIERRA: _LL_CIERRA
        }
    },
    /**
     * Creo un objeto para la instruccion IF lista de else if o solo un else
     * @param {*} _if 
     * @param {*} _P_ABRE
     * @param {*} _expresion
     * @param {*} _P_CIERRA
     * @param {*} _LL_ABRE
     * @param {*} _Sentencias
     * @param {*} _LL_CIERRA
     * @param {*} _else
     */
    nuevoif_e: function(_if, _P_ABRE, _expresion, _P_CIERRA, _LL_ABRE, _Sentencias, _LL_CIERRA, _else){
        return{
            tipoIns: TIPO_INSTRUCCION.IF,
            _if: _if, 
            _P_ABRE: _P_ABRE,
            _expresion: _expresion, 
            _P_CIERRA: _P_CIERRA,
            _LL_ABRE: _LL_ABRE,
            _Sentencias: _Sentencias,
            _LL_CIERRA: _LL_CIERRA,
            _else: _else
        }
    },
    /**
     * Creo un objeto para la instruccion IF vacio lista de else if o solo un else
     * @param {*} _if 
     * @param {*} _P_ABRE
     * @param {*} _expresion
     * @param {*} _P_CIERRA
     * @param {*} _LL_ABRE
     * @param {*} _LL_CIERRA
     * @param {*} _else
     */
    nuevoifV_e: function(_if, _P_ABRE, _expresion, _P_CIERRA, _LL_ABRE, _LL_CIERRA, _else){
        return{
            tipoIns: TIPO_INSTRUCCION.IF,
            _if: _if, 
            _P_ABRE: _P_ABRE,
            _expresion: _expresion, 
            _P_CIERRA: _P_CIERRA,
            _LL_ABRE: _LL_ABRE,
            _LL_CIERRA: _LL_CIERRA,
            _else: _else
        }
    },

    /**
     * Creo un objeto para else if
     * @param {*} _else
     * @param {*} _if 
     * @param {*} _P_ABRE
     * @param {*} _expresion
     * @param {*} _P_CIERRA
     * @param {*} _LL_ABRE
     * @param {*} _Sentencias
     * @param {*} _LL_CIERRA
     */
    nuevoe_if: function(_else, _if, _P_ABRE, _expresion, _P_CIERRA, _LL_ABRE, _Sentencias, _LL_CIERRA){
        return{
            _else: _else,
            _if: _if, 
            _P_ABRE: _P_ABRE,
            _expresion: _expresion, 
            _P_CIERRA: _P_CIERRA,
            _LL_ABRE: _LL_ABRE,
            _Sentencias: _Sentencias,
            _LL_CIERRA: _LL_CIERRA
        }
    },
    /**
     * Creo un objeto para else if vacio
     * @param {*} _else
     * @param {*} _if 
     * @param {*} _P_ABRE
     * @param {*} _expresion
     * @param {*} _P_CIERRA
     * @param {*} _LL_ABRE
     * @param {*} _LL_CIERRA
     */
    nuevoe_ifV: function(_else, _if, _P_ABRE, _expresion, _P_CIERRA, _LL_ABRE, _LL_CIERRA){
        return{
            _else: _else,
            _if: _if, 
            _P_ABRE: _P_ABRE,
            _expresion: _expresion, 
            _P_CIERRA: _P_CIERRA,
            _LL_ABRE: _LL_ABRE,
            _LL_CIERRA: _LL_CIERRA
        }
    },
    /**
     * Creo un objeto para else if con mas else if o un else 
     * @param {*} _else
     * @param {*} _if 
     * @param {*} _P_ABRE
     * @param {*} _expresion
     * @param {*} _P_CIERRA
     * @param {*} _LL_ABRE
     * @param {*} _Sentencias
     * @param {*} _LL_CIERRA
     * @param {*} _else1
     */
    nuevoe_if_e: function(_else, _if, _P_ABRE, _expresion, _P_CIERRA, _LL_ABRE, _Sentencias, _LL_CIERRA, _else1){
        return{
            _else: _else,
            _if: _if, 
            _P_ABRE: _P_ABRE,
            _expresion: _expresion, 
            _P_CIERRA: _P_CIERRA,
            _LL_ABRE: _LL_ABRE,
            _Sentencias: _Sentencias,
            _LL_CIERRA: _LL_CIERRA,
            _else1: _else1
        }
    },
    /**
     * Creo un objeto para else if vacio con mas else if o un else 
     * @param {*} _else
     * @param {*} _if 
     * @param {*} _P_ABRE
     * @param {*} _expresion
     * @param {*} _P_CIERRA
     * @param {*} _LL_ABRE
     * @param {*} _LL_CIERRA
     * @param {*} _else1
     */
    nuevoe_ifV_e: function(_else, _if, _P_ABRE, _expresion, _P_CIERRA, _LL_ABRE, _LL_CIERRA, _else1){
        return{
            _else: _else,
            _if: _if, 
            _P_ABRE: _P_ABRE,
            _expresion: _expresion, 
            _P_CIERRA: _P_CIERRA,
            _LL_ABRE: _LL_ABRE,
            _LL_CIERRA: _LL_CIERRA,
            _else1: _else1
        }
    },
    /**
     * Creo un objeto para else
     * @param {*} _else
     * @param {*} _LL_ABRE
     * @param {*} _Sentencias
     * @param {*} _LL_CIERRA
     */
    nuevoe: function(_else, _LL_ABRE, _Sentencias, _LL_CIERRA){
        return{
            _else: _else, 
            _LL_ABRE: _LL_ABRE,
            _Sentencias: _Sentencias,
            _LL_CIERRA: _LL_CIERRA
        }
    },
    /**
     * Creo un objeto para else vacio
     * @param {*} _else
     * @param {*} _LL_ABRE
     * @param {*} _LL_CIERRA
     */
    nuevoeV: function(_else, _LL_ABRE, _LL_CIERRA){
        return{
            _else: _else, 
            _LL_ABRE: _LL_ABRE,
            _LL_CIERRA: _LL_CIERRA
        }
    },

    //============================PRINT==================================
    /**
     * Creo un Objeto para print en consola
     * @param {*} _system
     * @param {*} _punto
     * @param {*} _out
     * @param {*} _punto1
     * @param {*} _print
     * @param {*} _P_ABRE
     * @param {*} _expresion
     * @param {*} _P_CIERRA
     * @param {*} _PyC
     */
    nuevoPrint: function(_system, _punto, _out, _punto1, _print, _P_ABRE, _expresion, _P_CIERRA, _PyC){
        return{
            tipoIns: TIPO_INSTRUCCION.PRINT,
            _system: _system,
            _punto: _punto,
            _out: _out,
            _punto1: _punto1,
            _print: _print,
            _P_ABRE: _P_ABRE,
            _expresion: _expresion,
            _P_CIERRA: _P_CIERRA,
            _PyC: _PyC
        }
    },

    //------------------------------BREAK-----------------------------------
    /**
     * Creo un objeto para el break
     * @param {*} _break
     * @param {*} _PyC
     */
    nuevobreak: function(_break, _PyC){
        return{
            tipoIns: TIPO_INSTRUCCION.BREAK,
            _break: _break,
            _PyC: _PyC
        }
    },
    //------------------------------CONTINUE-----------------------------------
    /**
     * Creo un objeto para el continue
     * @param {*} _continue
     * @param {*} _PyC
     */
    nuevoContinue: function(_continue, _PyC){
        return{
            tipoIns: TIPO_INSTRUCCION.CONTINUE,
            _continue: _continue,
            _PyC: _PyC
        }
    },
    //------------------------------RETURN-----------------------------------
    /**
     * Creo un objeto para el return
     * @param {*} _return 
     * @param {*} _expresion
     * @param {*} _PyC
     */
    nuevoreturn_e: function(_return, _expresion,_PyC){
        return{
            tipoIns: TIPO_INSTRUCCION.RETURN,
            _return: _return,
            _expresion: _expresion,
            _PyC: _PyC
        }
    },
    /**
     * Creo un objeto para el return
     * @param {*} _return 
     * @param {*} _PyC
     */
    nuevoreturn: function(_return, _PyC){
        return{
            tipoIns: TIPO_INSTRUCCION.RETURN,
            _return: _return,
            _PyC: _PyC
        }
    },

}