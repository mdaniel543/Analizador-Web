import { NodoError } from "./NodoError";

class Errores extends Array<NodoError>{

    constructor(){
        super();
    }

    public static add(err:NodoError){
        this.prototype.push(err);
    }

    public static verificarerror():boolean{
        if(this.prototype.length>0){
            return true;
        }
        return false;
    }

    public static geterror():string{
        var cad:string="";

        for(var i=0; i<this.prototype.length;i++){
            cad += "Tipo: " + this.prototype[i].gettipo() + " ";
            cad += "Descripcion: " + this.prototype[i].getDescripcion() + " ";
            cad += "Linea: " + this.prototype[i].getlinea() + "\n";
            cad += "Columna " + this.prototype[i].getColumna() + "\n";
        }
        return cad;
    }

    public static clear(){
        while(this.prototype.length>0){
            this.prototype.pop();
        }
    }
}
export{Errores};