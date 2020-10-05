"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Errores = void 0;
var Errores = /** @class */ (function (_super) {
    __extends(Errores, _super);
    function Errores() {
        return _super.call(this) || this;
    }
    Errores.add = function (err) {
        this.prototype.push(err);
    };
    Errores.verificarerror = function () {
        if (this.prototype.length > 0) {
            return true;
        }
        return false;
    };
    Errores.geterror = function () {
        var cad = "";
        for (var i = 0; i < this.prototype.length; i++) {
            cad += "Tipo: " + this.prototype[i].gettipo() + " ";
            cad += "Descripcion: " + this.prototype[i].getDescripcion() + " ";
            cad += "Linea: " + this.prototype[i].getlinea() + "\n";
            cad += "Columna " + this.prototype[i].getColumna() + "\n";
        }
        return cad;
    };
    Errores.clear = function () {
        while (this.prototype.length > 0) {
            this.prototype.pop();
        }
    };
    return Errores;
}(Array));
exports.Errores = Errores;
