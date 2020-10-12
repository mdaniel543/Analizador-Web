/*-----------------------------------------------------------IMPORTS---------------------------------------------------*/

%{
    const TIPO_OPERACION	= require('../AST/Instrucciones/Instruccion').TIPO_OPERACION;
	const TIPO_VALOR 		= require('../AST/Instrucciones/Instruccion').TIPO_VALOR;
	const instruccionesAPI	= require('../AST/Instrucciones/Instruccion').instruccionesAPI;
    let CErrores=require('../AST/Error');
    let CNodoError=require('../AST/NodoError');
%}

/*-----------------------------------------------------------LEXICO-------------------------------------------------------*/

%lex 

%options case-insensitive

%%
/*COMENTARIO UNILINEA*/
"//".* 

/*COMENTARIO MULTIPLE LINEA*/
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]

/*RESERVADAS*/
"public"            return 'PR_public';
"class"             return 'PR_class';
"interface"         return 'PR_interface';
"void"              return 'PR_void';

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

/*NUMERO*/
[0-9]+("."[0-9]+)?\b  return 'NUMBER';
/*ID*/
([a-zA-Z])[a-zA-Z0-9_]*    %{  return 'ID';  %}
/*CADENA*/
\"[^\"]*\"				{ yytext = yytext.substr(1,yyleng-2); return 'CADENA'; }
/*CARACTER*/
\'[^\']*\'				{ yytext = yytext.substr(1,yyleng-2); return 'CARACTER'; }


/*SIMBOLOS*/
"{"                 return  'LL_ABRE';
"}"                 return  'LL_CIERRA';
"("                 return  'P_ABRE';
")"                 return  'P_CIERRA';
"["                 return  'C_ABRE';
"]"                 return  'C_CIERRA';
","                 return  'Coma';
";"                 return  'PyC';
"="                 return  'Igual';
"&&"                return  'AND';
"||"                return  'OR';
"!"                 return  'NOT';
"^"                 return  'XOR';
"<"                 return  'Menor';
">"                 return  'Mayor';
">="                return  'MayorIgual';
"<="                return  'MenorIgual';
"=="                return  'IgualIgual';
"!="                return  'Distinto';
"+"                 return  'Mas';
"-"                 return  'Menos';
"*"                 return  'Multiplicacion';
"/"                 return  'Division';
"++"                return  'Adicion';
"--"                return  'Sustraccion';
"."                 return  'Punto';


/*IGNORADOS*/
[ \t\r\n\f] %{  /*Los Ignoramos*/   %}

/*FINAL DEL ARCHIVO*/
<<EOF>>     %{  return 'EOF';   %}

/*SE AGREGA EL ERROR LEXICO*/
.           CErrores.Errores.add(new CNodoError.NodoError("Lexico", "No se esperaba el caracter: "+yytext,yylineno, yylloc.first_column))

/lex

/*-------------------------------------------------------------------------SINTACTICO-----------------------------------------------------------------*/

/* Asociación de operadores y precedencia */
%left 'AND'
%left 'OR'
%left 'XOR'
%left 'Menor' 'Mayor' 'MayorIgual' 'MenorIgual'
%left 'IgualIgual' 'Distinto'
%left 'Mas' 'Menos'
%left 'Multiplicacion' 'Division'
%right 'UNOT' 'Umenos' 'UAdicion' 'USustraccion'

%start S
%% /* Definición de la gramática */

S 
    : INICIO EOF {
        return $1
    }
;
INICIO
    : INICIO INI { $1.push($2); $$ = $1; }
    | INI        { $$ = [$1]; }
;
INI
    : PR_public PR_class ID LL_ABRE LC LL_CIERRA            { $$ = instruccionesAPI.nuevoClase($1, $2, $3, $4, $5, $6); }
    | PR_public PR_class ID LL_ABRE LL_CIERRA               { $$ = instruccionesAPI.nuevoClaseV($1, $2, $3, $4, $5); }
    | PR_public PR_interface ID LL_ABRE LI LL_CIERRA        { $$ = instruccionesAPI.nuevoInter($1, $2, $3, $4, $5, $6); }
    | PR_public PR_interface ID LL_ABRE LL_CIERRA           { $$ = instruccionesAPI.nuevoInterV($1, $2, $3, $4, $5); }
    | error { $$ = CErrores.Errores.add(new CNodoError.NodoError("Sintactico", "Se detecto error en una instruccion." ,yylineno, yylloc.first_column)) }
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
    : PR_public TP ID P_ABRE LP P_CIERRA PyC    { $$ = instruccionesAPI.nuevoMD_P($1, $2, $3, $4, $5, $6, $7);}
    | PR_public TP ID P_ABRE P_CIERRA PyC       { $$ = instruccionesAPI.nuevoMD_SP($1, $2, $3, $4, $5, $6);}
;
TP 
    : TIPO      {$$ = $1}
    | PR_void   {$$ = $1}
;
MI
    : PR_public TP ID P_ABRE LP P_CIERRA LL_ABRE LINS LL_CIERRA                                                     { $$ = instruccionesAPI.nuevoMI_P($1,$2,$3,$4,$5,$6,$7);}
    | PR_public TP ID P_ABRE P_CIERRA LL_ABRE LINS LL_CIERRA                                                        { $$ = instruccionesAPI.nuevoMI_SP($1,$2,$3,$4,$5,$6);}
    | PR_public TP ID P_ABRE LP P_CIERRA LL_ABRE LL_CIERRA                                                          { $$ = instruccionesAPI.nuevoMI_S($1,$2,$3,$4,$5,$6);}
    | PR_public TP ID P_ABRE P_CIERRA LL_ABRE LL_CIERRA                                                             { $$ = instruccionesAPI.nuevoMI_S_P($1,$2,$3,$4,$5);}
    | PR_public TP ID P_ABRE LP P_CIERRA PyC                                                                        { $$ = instruccionesAPI.nuevoMD_P($1, $2, $3, $4, $5, $6, $7);}
    | PR_public TP ID P_ABRE P_CIERRA PyC                                                                           { $$ = instruccionesAPI.nuevoMD_SP($1, $2, $3, $4, $5, $6);}
    | PR_public PR_static PR_void PR_main P_ABRE PR_String C_ABRE C_CIERRA PR_args P_CIERRA LL_ABRE LINS LL_CIERRA  { $$ = instruccionesAPI.nuevoMAIN($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12); }
    | PR_public PR_static PR_void PR_main P_ABRE PR_String C_ABRE C_CIERRA PR_args P_CIERRA LL_ABRE LL_CIERRA       { $$ = instruccionesAPI.nuevoMAIN_S($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12); }
;
LP
    : LP P { $1.push($2); $$ = $1; }
    | P { $$ = instruccionesAPI.nuevaListaPAR($1); }
;
P 
    : TIPO ID { $$ = instruccionesAPI.nuevoPA($1,$2);}
    | TIPO ID Coma { $$ = instruccionesAPI.nuevoPA_C($1,$2,$3);}
    | EXP { $$ = instruccionesAPI.nuevoPA_E($1);}
    | EXP Coma { $$ = instruccionesAPI.nuevoPA_E($1, $2);}
;
DEC
    : TIPO LDEC PyC { $$ = instruccionesAPI.nuevoD_E($1, $2, $3);}
;
LDEC 
    : LDEC D { $1.push($2); $$ = $1; }
    | D { $$ = instruccionesAPI.nuevaListaID($1); }
;    
D
    : ID Igual EXP Coma { $$ = instruccionesAPI.nuevoD_E_C($1,$2,$3,$4); }
    | ID Igual EXP { $$ = instruccionesAPI.nuevoD_E($1,$2,$3); }
    | ID Igual ID P_ABRE LP P_CIERRA Coma { $$ = instruccionesAPI.nuevoD_LL_C($1,$2,$3,$4,$5,$6,$7); }
    | ID Igual ID P_ABRE LP P_CIERRA { $$ = instruccionesAPI.nuevoD_LL($1,$2,$3,$4,$5,$6); }
    | ID Igual ID P_ABRE P_CIERRA Coma { $$ = instruccionesAPI.nuevoD_LL_P_C($1,$2,$3,$4,$5,$6); }
    | ID Igual ID P_ABRE P_CIERRA { $$ = instruccionesAPI.nuevoD_LL_P($1,$2,$3,$4,$5); }
    | ID Coma { $$ = instruccionesAPI.nuevoD_C($1,$2);}
    | ID { $$ = instruccionesAPI.nuevoD($1);}
;
ASIG
    : ID Igual EXP PyC { $$ = instruccionesAPI.nuevoA($1,$2,$3,$4);}
    | ID Igual ID P_ABRE LP P_CIERRA PyC { $$ = instruccionesAPI.nuevoA_LL($1,$2,$3,$4,$5,$6,$7);}
    | ID Igual ID P_ABRE P_CIERRA PyC { $$ = instruccionesAPI.nuevoA_LL_P($1,$2,$3,$4,$5,$6);}
;
LINS 
    : LINS INS { $1.push($2); $$ = $1; }
    | INS { $$ = [$1]; }
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
    : PR_for P_ABRE DEC PyC EXP PyC EXP P_CIERRA LL_ABRE LINS LL_CIERRA { $$ = instruccionesAPI.nuevoFor($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15);}
    | PR_for P_ABRE DEC PyC EXP PyC EXP P_CIERRA LL_ABRE LL_CIERRA { $$ = instruccionesAPI.nuevoForV($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14);}
;
WHILE 
    : PR_while P_ABRE EXP P_CIERRA LL_ABRE LINS LL_CIERRA { $$ = instruccionesAPI.nuevoWhile($1,$2,$3,$4,$5,$6,$7);}
    | PR_while P_ABRE EXP P_CIERRA LL_ABRE LL_CIERRA { $$ = instruccionesAPI.nuevoWhileV($1,$2,$3,$4,$5,$6);}
;
DO
    : DO LL_ABRE LINS LL_CIERRA PR_while P_ABRE EXP P_CIERRA PyC { $$ = instruccionesAPI.nuevodo($1,$2,$3,$4,$5,$6,$7,$8,$9);}
    | DO LL_ABRE LL_CIERRA PR_while P_ABRE EXP P_CIERRA PyC { $$ = instruccionesAPI.nuevodoV($1,$2,$3,$4,$5,$6,$7,$8);}
;
IF 
    : PR_if P_ABRE EXP P_CIERRA LL_ABRE LINS LL_CIERRA LEIE { $$ = instruccionesAPI.nuevoif_e($1,$2,$3,$4,$5,$6,$7,$8);}
    | PR_if P_ABRE EXP P_CIERRA LL_ABRE LL_CIERRA LEIE { $$ = instruccionesAPI.nuevoifV_e($1,$2,$3,$4,$5,$6,$7);}
    | PR_if P_ABRE EXP P_CIERRA LL_ABRE LINS LL_CIERRA { $$ = instruccionesAPI.nuevoif($1,$2,$3,$4,$5,$6,$7);}
    | PR_if P_ABRE EXP P_CIERRA LL_ABRE LL_CIERRA { $$ = instruccionesAPI.nuevoifV($1,$2,$3,$4,$5,$6);}
;
LEIE 
    : LEIE EIE { $1.push($2); $$ = $1; }
    | EIE { $$ = instruccionesAPI.nuevaListae($1); }
;
EIE
    : PR_else PR_if P_ABRE EXP P_CIERRA LL_ABRE LINS LL_CIERRA { $$ = instruccionesAPI.nuevoe_i($1,$2,$3,$4,$5,$6,$7,$8);}
    | PR_else PR_if P_ABRE EXP P_CIERRA LL_ABRE LL_CIERRA { $$ = instruccionesAPI.nuevoe_ifV($1,$2,$3,$4,$5,$6,$7);}
    | PR_else LL_ABRE LINS LL_CIERRA { $$ = instruccionesAPI.nuevoe($1,$2,$3,$4);}
    | PR_else LL_ABRE LL_CIERRA { $$ = instruccionesAPI.nuevoeV($1,$2,$3);}
;
LLM 
    : ID P_ABRE LP P_CIERRA PyC { $$ = instruccionesAPI.nuevoLLAMA_M($1,$2,$3,$4,$5); }
    | ID P_ABRE P_CIERRA PyC { $$ = instruccionesAPI.nuevoLLAMA_M_V($1,$2,$3,$4); }
;
PRINT
    : PR_System Punto PR_out Punto PR_print P_ABRE EXP P_CIERRA PyC { $$ = instruccionesAPI.nuevoPrint($1,$2,$3,$4,$5,$6,$7,$8,$9);}
    | PR_System Punto PR_out Punto PR_println P_ABRE EXP P_CIERRA PyC { $$ = instruccionesAPI.nuevoPrint($1,$2,$3,$4,$5,$6,$7,$8,$9);}
    | PR_System Punto PR_out Punto PR_println P_ABRE P_CIERRA PyC { $$ = instruccionesAPI.nuevoPrintV($1,$2,$3,$4,$5,$6,$7,$8);}
;
TIPO
    : PR_int {$$ = $1;}
    | PR_boolean {$$ = $1;}
    | PR_double {$$ = $1;}
    | PR_String {$$ = $1;}
    | PR_char {$$ = $1;}
;
EXP
    : EXP AND EXP                           { $$ = instruccionesAPI.nuevoOperacionBinaria($1,$3,Tipo_Operacion.AND);}
    | EXP OR EXP                            { $$ = instruccionesAPI.nuevoOperacionBinaria($1,$3,Tipo_Operacion.OR);}
    | EXP XOR EXP                           { $$ = instruccionesAPI.nuevoOperacionBinaria($1,$3,Tipo_Operacion.XOR);}
    | EXP Menor EXP                         { $$ = instruccionesAPI.nuevoOperacionBinaria($1,$3,Tipo_Operacion.MENOR_QUE);}
    | EXP Mayor EXP                         { $$ = instruccionesAPI.nuevoOperacionBinaria($1,$3,Tipo_Operacion.MAYOR_QUE);}
    | EXP MayorIgual EXP                    { $$ = instruccionesAPI.nuevoOperacionBinaria($1,$3,Tipo_Operacion.MAYOR_IGUAL);}
    | EXP MenorIgual EXP                    { $$ = instruccionesAPI.nuevoOperacionBinaria($1,$3,Tipo_Operacion.MENOR_IGUAL);}
    | EXP IgualIgual EXP                    { $$ = instruccionesAPI.nuevoOperacionBinaria($1,$3,Tipo_Operacion.IGUAL);}
    | EXP Distinto EXP                      { $$ = instruccionesAPI.nuevoOperacionBinaria($1,$3,Tipo_Operacion.NO_IGUAL);}
    | EXP Mas EXP                           { $$ = instruccionesAPI.nuevoOperacionBinaria($1,$3,Tipo_Operacion.SUMA);}
    | EXP Menos EXP                         { $$ = instruccionesAPI.nuevoOperacionBinaria($1,$3,Tipo_Operacion.RESTA);}
    | EXP Multiplicacion EXP                { $$ = instruccionesAPI.nuevoOperacionBinaria($1,$3,Tipo_Operacion.MULTIPLICACION);}
    | EXP Division EXP                      { $$ = instruccionesAPI.nuevoOperacionBinaria($1,$3,Tipo_Operacion.DIVISION);}
//    | NOT EXP %prec UNOT                    { $$ = instruccionesAPI.nuevoOperacionUnaria($2,Tipo_Operacion.NOT); }
//    | Menos EXP %prec Umenos                { $$ = instruccionesAPI.nuevoOperacionUnaria($2,Tipo_Operacion.NEGATIVO); }
//    | EXP Adicion %prec UAdicion            { $$ = instruccionesAPI.nuevoOperacionUnaria($2,Tipo_Operacion.INCREMENTACION); }
//    | EXP Sustraccion %prec USustraccion    { $$ = instruccionesAPI.nuevoOperacionUnaria($2,Tipo_Operacion.DISMINUCION); }
    | P_ABRE EXP P_CIERRA                   { $$ = $2; }
    | NUMBER                                { $$ = instruccionesAPI.nuevoValor(Tipo_Valor.NUMERO, $1); }
    | ID                                    { $$ = instruccionesAPI.nuevoValor(Tipo_Valor.IDENTIFICADOR, $1); }
    | CADENA                                { $$ = instruccionesAPI.nuevoValor(Tipo_Valor.CADENA, $1); }
    | CARACTER                              { $$ = instruccionesAPI.nuevoValor(Tipo_Valor.CARACTER, $1); }
    | true                                  { $$ = instruccionesAPI.nuevoValor(Tipo_Valor.TRUE, $1); }
    | false                                 { $$ = instruccionesAPI.nuevoValor(Tipo_Valor.FALSE, $1); }    

;
