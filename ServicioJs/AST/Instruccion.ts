import {NodoAST} from "./NodoAST";
import { Entorno } from "./Entorno/Entorno";

interface Instruccion extends NodoAST{
    ejecutar(ent:Entorno):Object;
}
export {Instruccion};