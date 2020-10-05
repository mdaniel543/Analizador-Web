"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entorno = void 0;
var Tabla_1 = require("./Tabla");
var Entorno = /** @class */ (function () {
    function Entorno() {
    }
    Entorno.prototype.getTabla = function () {
        return Tabla_1.Tabla.prototype;
    };
    return Entorno;
}());
exports.Entorno = Entorno;
