class Simbolo {
    private id:string;
    private valor:Object;

    constructor(id:string, valor:Object){
        this.id=id;
        this.valor=valor;
    }

    public getid():string{
        return this.id;
    }

    public getvalor():Object{
        return this.valor;
    }

    public setvalor(valor:Object){
        this.valor=valor;
    }
}
export{Simbolo};