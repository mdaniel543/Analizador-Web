/*-----------------------------------------------------------IMPORTS---------------------------------------------------*/

%{
    const TIPO_OPERACION	= require('../AST/Instrucciones/Instruccion').TIPO_OPERACION;
	const TIPO_VALOR 		= require('../AST/Instrucciones/Instruccion').TIPO_VALOR;
	const instruccionesAPI	= require('../AST/Instrucciones/Instruccion').instruccionesAPI;
%}
/*-----------------------------------------------------------LEXICO-------------------------------------------------------*/

%lex

%options case-insensitive

%%

\s+											// se ignoran espacios en blanco
"//".*										// comentario simple línea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]			// comentario multiple líneas

"public"			return 'PR_public';
"class" 			return 'PR_class';
"interface" 	    return 'PR_interface';
"void"			    return 'PR_void';

"for"               return 'PR_for';
"while"             return 'PR_while';
"do"                return 'PR_do';
"if"                return 'PR_if';
"else"              return 'PR_else';
"break"             return 'PR_break';
"continue"          return 'PR_continue';
"return"            return 'PR_return';

"int"               return 'PR_int';
"boolean"           return 'PR_boolean';
"double"            return 'PR_double';
"String"            return 'PR_String';
"char"              return 'PR_char';

"true"              return 'true';
"false"             return 'false';

"static"            return 'PR_static';
"main"              return 'PR_main';
"args"              return 'PR_args';

"System"            return 'PR_System';
"out"               return 'PR_out';
"print"             return 'PR_print';
"println"           return 'PR_println'; 

"{"                 return  'LL_ABRE';
"}"                 return  'LL_CIERRA';
"("                 return  'P_ABRE';
")"                 return  'P_CIERRA';
"["                 return  'C_ABRE';
"]"                 return  'C_CIERRA';
","                 return  'Coma';
";"                 return  'PyC';

"++"                return  'Adicion';
"--"                return  'Sustraccion';

">="                return  'MayorIgual';
"<="                return  'MenorIgual';
"=="				return 'IgualIgual';
"!="                return  'Distinto';

"="                 return  'Igual';
"&&"                return  'AND';
"||"                return  'OR';
"!"                 return  'NOT';
"^"                 return  'XOR';
"<"                 return  'Menor';
">"                 return  'Mayor';

"+"                 return  'Mas';
"-"                 return  'Menos';
"*"                 return  'Multiplicacion';
"/"                 return  'Division';

"."                 return  'Punto';

\"[^\"]*\"				{ yytext = yytext.substr(1,yyleng-2); return 'CADENA'; }
\'[^\']*\'				{ yytext = yytext.substr(1,yyleng-2); return 'CARACTER'; }
[0-9]+("."[0-9]+)?\b  	return 'DECIMAL';
[0-9]+\b				return 'ENTERO';
([a-zA-Z])[a-zA-Z0-9_]*	return 'ID';


<<EOF>>				return 'EOF';

.					{ console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); }

/lex

%left 'AND'
%left 'OR'
%left 'XOR'
%left 'IgualIgual' 'Distinto'
%left 'Menor' 'Mayor' 'MayorIgual' 'MenorIgual'
%left 'Mas' 'Menos' 
%left 'Multiplicacion' 'Division'
%left 'Adicion' 'Sustraccion'
%right 'UMenos' 'UNOT'

%start S
%% /* Definición de la gramática */

S 
    : INICIO EOF{
        return $1;
    }
;
INICIO
    : INICIO INI { $1.push($2); $$ = $1; }
    | INI        { $$ = [$1]; }
    | error  { console.error('Este es un error sintactico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column);
    }
;
INI
    : PR_public PR_class ID LL_ABRE LL_CIERRA               { $$ = instruccionesAPI.nuevoClaseV($1, $2, $3, $4, $5);}
    | PR_public PR_interface ID LL_ABRE LL_CIERRA           { $$ = instruccionesAPI.nuevoInterV($1, $2, $3, $4, $5); }    
    | PR_public PR_class ID LL_ABRE LC LL_CIERRA            { $$ = instruccionesAPI.nuevoClase($1, $2, $3, $4, $5, $6); }
    | PR_public PR_interface ID LL_ABRE LI LL_CIERRA        { $$ = instruccionesAPI.nuevoInter($1, $2, $3, $4, $5, $6); }
;
LC
    : LC C  { $1.push($2); $$ = $1; }
    | C     { $$ = [$1]; }
    
;
C   : MI    {$$ = $1}
    | DEC   {$$ = $1}
    | ASIG  {$$ = $1}
;
LI
    : LI I  { $1.push($2); $$ = $1; }
    | I     { $$ = [$1]; }
;
I
    : PR_public TP ID P_ABRE P_CIERRA PyC       { $$ = instruccionesAPI.nuevoMD_SP($1, $2, $3, $4, $5, $6);}
    | PR_public TP ID P_ABRE LP P_CIERRA PyC    { $$ = instruccionesAPI.nuevoMD_P($1, $2, $3, $4, $5, $6, $7);}
;
TP 
    : TIPO      {$$ = $1}
    | PR_void   {$$ = $1}
;
MI
    : PR_public TP ID P_ABRE P_CIERRA LL_ABRE LL_CIERRA                                                             { $$ = instruccionesAPI.nuevoMI_S_P($1,$2,$3,$4,$5,$6,$7);} 
    | PR_public TP ID P_ABRE P_CIERRA PyC                                                                           { $$ = instruccionesAPI.nuevoMD_SP($1, $2, $3, $4, $5, $6);}
    | PR_public TP ID P_ABRE P_CIERRA LL_ABRE LINS LL_CIERRA                                                        { $$ = instruccionesAPI.nuevoMI_SP($1,$2,$3,$4,$5,$6,$7,$8);}
    | PR_public TP ID P_ABRE LP P_CIERRA LL_ABRE LL_CIERRA                                                          { $$ = instruccionesAPI.nuevoMI_S($1,$2,$3,$4,$5,$6,$7,$8);}
    | PR_public TP ID P_ABRE LP P_CIERRA LL_ABRE LINS LL_CIERRA                                                     { $$ = instruccionesAPI.nuevoMI_P($1,$2,$3,$4,$5,$6,$7,$8,$9);}
    | PR_public TP ID P_ABRE LP P_CIERRA PyC                                                                        { $$ = instruccionesAPI.nuevoMD_P($1, $2, $3, $4, $5, $6, $7);}
    | PR_public PR_static PR_void PR_main P_ABRE PR_String C_ABRE C_CIERRA PR_args P_CIERRA LL_ABRE LL_CIERRA       { $$ = instruccionesAPI.nuevoMAIN_S($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12); }
    | PR_public PR_static PR_void PR_main P_ABRE PR_String C_ABRE C_CIERRA PR_args P_CIERRA LL_ABRE LINS LL_CIERRA  { $$ = instruccionesAPI.nuevoMAIN($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12, $13); }

;
LP
    : LP P { $1.push($2); $$ = $1; }
    | P { $$ = instruccionesAPI.nuevaListaPAR($1); }
;
P 
    : EXP { $$ = instruccionesAPI.nuevoPA_E($1);}
    | EXP Coma { $$ = instruccionesAPI.nuevoPA_E_C($1,$2);}
    | TIPO ID { $$ = instruccionesAPI.nuevoPA($1,$2);}
    | TIPO ID Coma { $$ = instruccionesAPI.nuevoPA_C($1,$2,$3);}
;
DEC
    : TIPO LDEC PyC { $$ = instruccionesAPI.nuevoDEC($1, $2, $3);}
;
LDEC 
    : LDEC D { $1.push($2); $$ = $1; }
    | D { $$ = instruccionesAPI.nuevaListaID($1); }
;    
D
    : ID { $$ = instruccionesAPI.nuevoD($1);}
    | ID Coma { $$ = instruccionesAPI.nuevoD_C($1,$2);}
    | ID Igual EXP { $$ = instruccionesAPI.nuevoD_E($1,$2,$3); }
    | ID Igual EXP Coma { $$ = instruccionesAPI.nuevoD_E_C($1,$2,$3,$4); }
    | ID Igual ID P_ABRE P_CIERRA { $$ = instruccionesAPI.nuevoD_LL_P($1,$2,$3,$4,$5); }
    | ID Igual ID P_ABRE LP P_CIERRA { $$ = instruccionesAPI.nuevoD_LL($1,$2,$3,$4,$5,$6); }
    | ID Igual ID P_ABRE P_CIERRA Coma { $$ = instruccionesAPI.nuevoD_LL_P_C($1,$2,$3,$4,$5,$6); }
    | ID Igual ID P_ABRE LP P_CIERRA Coma { $$ = instruccionesAPI.nuevoD_LL_C($1,$2,$3,$4,$5,$6,$7); }
;
ASIG
    : ID Igual EXP PyC { $$ = instruccionesAPI.nuevoA($1,$2,$3,$4);}
    | ID Igual ID P_ABRE P_CIERRA PyC { $$ = instruccionesAPI.nuevoA_LL_P($1,$2,$3,$4,$5,$6);}
    | ID Igual ID P_ABRE LP P_CIERRA PyC { $$ = instruccionesAPI.nuevoA_LL($1,$2,$3,$4,$5,$6,$7);}

;
LINS 
    : LINS INS { $1.push($2); $$ = $1; }
    | INS { $$ = [$1]; }
    | error  { console.error('Este es un error sintactico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column);
    }
;
INS
    : FOR { $$ = $1; }
    | WHILE { $$ = $1; }
    | DO { $$ = $1; }
    | IF { $$ = $1; }
    | PRINT { $$ = $1; }
    | ASIG { $$ = $1; }
    | DEC { $$ = $1; }
    | LLM { $$ = $1; }
    | PR_break PyC { $$ = instruccionesAPI.nuevobreak($1, $2);}
    | PR_continue PyC { $$ = instruccionesAPI.nuevoContinue($1, $2); }
    | PR_return EXP PyC { $$ = instruccionesAPI.nuevoreturn_e($1, $2, $3); }
    | PR_return PyC { $$ = instruccionesAPI.nuevoreturn($1, $2, $3);}
;
FOR 
    : PR_for P_ABRE DEC EXP PyC EXP P_CIERRA LL_ABRE LL_CIERRA { $$ = instruccionesAPI.nuevoForV($1,$2,$3,$4,$5,$6,$7,$8,$9);}
    | PR_for P_ABRE DEC EXP PyC EXP P_CIERRA LL_ABRE LINS LL_CIERRA { $$ = instruccionesAPI.nuevoFor($1,$2,$3,$4,$5,$6,$7,$8,$9,$10);}
;
WHILE 
    : PR_while P_ABRE EXP P_CIERRA LL_ABRE LL_CIERRA { $$ = instruccionesAPI.nuevoWhileV($1,$2,$3,$4,$5,$6);}
    | PR_while P_ABRE EXP P_CIERRA LL_ABRE LINS LL_CIERRA { $$ = instruccionesAPI.nuevoWhile($1,$2,$3,$4,$5,$6,$7);}
;
DO
    : PR_do LL_ABRE LL_CIERRA PR_while P_ABRE EXP P_CIERRA PyC { $$ = instruccionesAPI.nuevodoV($1,$2,$3,$4,$5,$6,$7,$8);}
    | PR_do LL_ABRE LINS LL_CIERRA PR_while P_ABRE EXP P_CIERRA PyC { $$ = instruccionesAPI.nuevodo($1,$2,$3,$4,$5,$6,$7,$8,$9);}
;
IF 
    : PR_if P_ABRE EXP P_CIERRA LL_ABRE LL_CIERRA { $$ = instruccionesAPI.nuevoifV($1,$2,$3,$4,$5,$6);}
    | PR_if P_ABRE EXP P_CIERRA LL_ABRE LL_CIERRA LEIE { $$ = instruccionesAPI.nuevoifV_e($1,$2,$3,$4,$5,$6,$7);}
    | PR_if P_ABRE EXP P_CIERRA LL_ABRE LINS LL_CIERRA { $$ = instruccionesAPI.nuevoif($1,$2,$3,$4,$5,$6,$7);}
    | PR_if P_ABRE EXP P_CIERRA LL_ABRE LINS LL_CIERRA LEIE { $$ = instruccionesAPI.nuevoif_e($1,$2,$3,$4,$5,$6,$7,$8);}
;
LEIE 
    : LEIE EIE { $1.push($2); $$ = $1; }
    | EIE { $$ = instruccionesAPI.nuevaListae($1); }
;
EIE
    : PR_else LL_ABRE LL_CIERRA { $$ = instruccionesAPI.nuevoeV($1,$2,$3);}
    | PR_else LL_ABRE LINS LL_CIERRA { $$ = instruccionesAPI.nuevoe($1,$2,$3,$4);}
    | PR_else PR_if P_ABRE EXP P_CIERRA LL_ABRE LINS LL_CIERRA { $$ = instruccionesAPI.nuevoe_if($1,$2,$3,$4,$5,$6,$7,$8);}
    | PR_else PR_if P_ABRE EXP P_CIERRA LL_ABRE LL_CIERRA { $$ = instruccionesAPI.nuevoe_ifV($1,$2,$3,$4,$5,$6,$7);}
;
LLM 
    : ID P_ABRE P_CIERRA PyC { $$ = instruccionesAPI.nuevoLLAMA_M_V($1,$2,$3,$4); } 
    | ID P_ABRE LP P_CIERRA PyC { $$ = instruccionesAPI.nuevoLLAMA_M($1,$2,$3,$4,$5); }
 
;
PRINT
    : PR_System Punto PR_out Punto PR_println P_ABRE EXP P_CIERRA PyC { $$ = instruccionesAPI.nuevoPrint($1,$2,$3,$4,$5,$6,$7,$8,$9);}
    | PR_System Punto PR_out Punto PR_println P_ABRE P_CIERRA PyC { $$ = instruccionesAPI.nuevoPrintV($1,$2,$3,$4,$5,$6,$7,$8);}
    | PR_System Punto PR_out Punto PR_print P_ABRE EXP P_CIERRA PyC { $$ = instruccionesAPI.nuevoPrint($1,$2,$3,$4,$5,$6,$7,$8,$9);}

;
TIPO
    : PR_int {$$ = $1;}
    | PR_boolean {$$ = $1;}
    | PR_double {$$ = $1;}
    | PR_String {$$ = $1;}
    | PR_char {$$ = $1;}
;
EXP
    : EXP AND EXP                           { $$ = instruccionesAPI.nuevoOperacionBinaria($1,$3,TIPO_OPERACION.AND);}
    | EXP OR EXP                            { $$ = instruccionesAPI.nuevoOperacionBinaria($1,$3,TIPO_OPERACION.OR);}
    | EXP XOR EXP                           { $$ = instruccionesAPI.nuevoOperacionBinaria($1,$3,TIPO_OPERACION.XOR);}
    | EXP Menor EXP                         { $$ = instruccionesAPI.nuevoOperacionBinaria($1,$3,TIPO_OPERACION.MENOR_QUE);}
    | EXP Mayor EXP                         { $$ = instruccionesAPI.nuevoOperacionBinaria($1,$3,TIPO_OPERACION.MAYOR_QUE);}
    | EXP MayorIgual EXP                    { $$ = instruccionesAPI.nuevoOperacionBinaria($1,$3,TIPO_OPERACION.MAYOR_IGUAL);}
    | EXP MenorIgual EXP                    { $$ = instruccionesAPI.nuevoOperacionBinaria($1,$3,TIPO_OPERACION.MENOR_IGUAL);}
    | EXP IgualIgual EXP                    { $$ = instruccionesAPI.nuevoOperacionBinaria($1,$3,TIPO_OPERACION.IGUAL);}
    | EXP Distinto EXP                      { $$ = instruccionesAPI.nuevoOperacionBinaria($1,$3,TIPO_OPERACION.NO_IGUAL);}
    | EXP Mas EXP                           { $$ = instruccionesAPI.nuevoOperacionBinaria($1,$3,TIPO_OPERACION.SUMA);}
    | EXP Menos EXP                         { $$ = instruccionesAPI.nuevoOperacionBinaria($1,$3,TIPO_OPERACION.RESTA);}
    | EXP Multiplicacion EXP                { $$ = instruccionesAPI.nuevoOperacionBinaria($1,$3,TIPO_OPERACION.MULTIPLICACION);}
    | EXP Division EXP                      { $$ = instruccionesAPI.nuevoOperacionBinaria($1,$3,TIPO_OPERACION.DIVISION);}
//    | NOT EXP %prec UNOT                    { $$ = instruccionesAPI.nuevoOperacionUnaria($2,TIPO_OPERACION.NOT); }
//    | Menos EXP %prec UMenos                { $$ = instruccionesAPI.nuevoOperacionUnaria($2,TIPO_OPERACION.NEGATIVO); }
    | EXP Adicion                           { $$ = instruccionesAPI.nuevoOperacionUnaria($1,TIPO_OPERACION.INCREMENTACION); }
    | EXP Sustraccion                       { $$ = instruccionesAPI.nuevoOperacionUnaria($1,TIPO_OPERACION.DISMINUCION); }
    | P_ABRE EXP P_CIERRA                   { $$ = $2; }
    | DECIMAL                               { $$ = instruccionesAPI.nuevoValor(TIPO_VALOR.DECIMAL, $1); }
    | ENTERO                                { $$ = instruccionesAPI.nuevoValor(TIPO_VALOR.ENTERO, $1); }
    | ID                                    { $$ = instruccionesAPI.nuevoValor(TIPO_VALOR.IDENTIFICADOR, $1); }
    | CADENA                                { $$ = instruccionesAPI.nuevoValor(TIPO_VALOR.CADENA, $1); }
    | CARACTER                              { $$ = instruccionesAPI.nuevoValor(TIPO_VALOR.CARACTER, $1); }
    | true                                  { $$ = instruccionesAPI.nuevoValor(TIPO_VALOR.TRUE, $1); }
    | false                                 { $$ = instruccionesAPI.nuevoValor(TIPO_VALOR.FALSE, $1); }    
;
