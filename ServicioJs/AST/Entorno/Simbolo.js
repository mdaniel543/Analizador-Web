"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Simbolo = void 0;
var Simbolo = /** @class */ (function () {
    function Simbolo(id, valor) {
        this.id = id;
        this.valor = valor;
    }
    Simbolo.prototype.getid = function () {
        return this.id;
    };
    Simbolo.prototype.getvalor = function () {
        return this.valor;
    };
    Simbolo.prototype.setvalor = function (valor) {
        this.valor = valor;
    };
    return Simbolo;
}());
exports.Simbolo = Simbolo;
