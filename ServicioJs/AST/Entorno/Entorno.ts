import { Tabla } from "./Tabla";

class Entorno{

    public getTabla():Tabla{
        return Tabla.prototype;
    }
}
export{Entorno};