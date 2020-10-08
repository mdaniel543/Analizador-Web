/*-----------------------------------------------------------IMPORTS---------------------------------------------------*/

%{
    let CErrores=require('../AST/Error');
    let CNodoError=require('../AST/NodoError');
%}

/*-----------------------------------------------------------LEXICO-------------------------------------------------------*/

%lex 

%options case-insensitive

%%
//COMENTARIO UNILINEA
"//".*  

//COMENTARIO MULTIPLE LINEA
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]

//RESERVADAS
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
"println"           return 'PR_print'; 

//NUMERO
[0-9]+("."[0-9]+)?\b  return 'NUMBER';
//ID
([a-zA-Z])[a-zA-Z0-9_]*    %{  return 'ID';  %}
//CADENA
\"[^\"]*\"				{ yytext = yytext.substr(1,yyleng-2); return 'CADENA'; }
//CARACTER
\'[^\']*\'				{ yytext = yytext.substr(1,yyleng-2); return 'CARACTER'; }


//SIMBOLOS
"{"                 return  'LL_ABRE';
"}"                 return  'LL_CIERRA';
"("                 return  'P_ABRE';
")"                 return  'P_CIERRA';
"["                 return  'C_ABRE';
"]"                 return  'C_CIERRA';
","                 return  'Coma';
";"                 return  'PuntoyComa';
"="                 return  'Asignar';
"&&"                return  'AND';
"||"                return  'OR';
"!"                 return  'NOT';
"^"                 return  'XOR';
"<"                 return  'Menor';
">"                 return  'Mayor';
">="                return  'Mayor_Igual';
"<="                return  'Menor_Igual';
"=="                return  'Igual';
"!="                return  'Distinto';
"+"                 return  'Mas';
"-"                 return  'Menos';
"*"                 return  'Multiplicacion';
"/"                 return  'Division';
"++"                return  'Adicion';
"--"                return  'Sustraccion';
"."                 return  'Punto';


//IGNORADOS
[ \t\r\n\f] %{  /*Los Ignoramos*/   %}

//FINAL DEL ARCHIVO
<<EOF>>     %{  return 'EOF';   %}

//SE AGREGA EL ERROR LEXICO
.           CErrores.Errores.add(new CNodoError.NodoError("Lexico", "No se esperaba el caracter: "+yytext,yylineno, yylloc.first_column))

/lex



