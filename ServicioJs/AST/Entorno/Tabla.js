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
exports.Tabla = void 0;
var Tabla = /** @class */ (function (_super) {
    __extends(Tabla, _super);
    function Tabla() {
        //Tiene los metodos 
        //de la clase array
        return _super.call(this) || this;
    }
    Tabla.prototype.getvalor = function (id) {
        for (var x = this.length - 1; x >= 0; x--) {
            if (this[x].getid() == id) {
                return this[x].getvalor();
            }
        }
        return 0;
    };
    Tabla.prototype.setvalor = function (id, valor) {
        for (var x = this.length - 1; x >= 0; x--) {
            if (this[x].getid() == id) {
                this[x].setvalor(valor);
            }
        }
    };
    return Tabla;
}(Array));
exports.Tabla = Tabla;
