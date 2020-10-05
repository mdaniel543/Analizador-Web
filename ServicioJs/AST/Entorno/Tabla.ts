import { Simbolo } from "./Simbolo";

class Tabla extends Array<Simbolo>{

    constructor(){
        //Tiene los metodos 
        //de la clase array
        super();
    }

    public getvalor(id:string):Object{
        for(var x=this.length-1;x>=0;x--){
            if(this[x].getid()==id){
                return this[x].getvalor();
            }
        }
        return 0;
    }

    public setvalor(id:string, valor:Object){
        for(var x=this.length-1;x>=0;x--){
            if(this[x].getid()==id){
                this[x].setvalor(valor);
            }
        }
    }
}
export{Tabla};