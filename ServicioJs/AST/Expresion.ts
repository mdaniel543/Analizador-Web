import { NodoAST } from "./NodoAST";
import { Entorno } from "./Entorno/Entorno";

interface Expresion extends NodoAST{
    operar(ent: Entorno):Object;
}

export{Expresion};