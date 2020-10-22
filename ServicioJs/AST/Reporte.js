var fs = require('fs');

function erroes (arreglo){
    var FilaTabla = "";
    var HTML = "<!DOCTYPE html>\n"
            + "<html lang=\"en\">\n"
            + "    <head>\n"
            + "        <title>ERRORES</title>\n"
            + "        <style>\n"
            + "            table.blueTable {\n"
            + "                border: 1px solid #1C6EA4;\n"
            + "                background-color: #EEEEEE;\n"
            + "                width: 100%;\n"
            + "                text-align: left;\n"
            + "                border-collapse: collapse;\n"
            + "            }\n"
            + "            table.blueTable td, table.blueTable th {\n"
            + "                border: 1px solid #AAAAAA;\n"
            + "                padding: 3px 2px;\n"
            + "            }\n"
            + "            table.blueTable tbody td {\n"
            + "                font-size: 13px;\n"
            + "            }\n"
            + "            table.blueTable tr:nth-child(even) {\n"
            + "                background: #D0E4F5;\n"
            + "            }\n"
            + "            table.blueTable thead {\n"
            + "                background: #1C6EA4;\n"
            + "                background: -moz-linear-gradient(top, #5592bb 0%, #327cad 66%, #1C6EA4 100%);\n"
            + "                background: -webkit-linear-gradient(top, #5592bb 0%, #327cad 66%, #1C6EA4 100%);\n"
            + "                background: linear-gradient(to bottom, #5592bb 0%, #327cad 66%, #1C6EA4 100%);\n"
            + "                border-bottom: 2px solid #444444;\n"
            + "            }\n"
            + "            table.blueTable thead th {\n"
            + "                font-size: 15px;\n"
            + "                font-weight: bold;\n"
            + "                color: #FFFFFF;\n"
            + "                border-left: 2px solid #D0E4F5;\n"
            + "            }\n"
            + "            table.blueTable thead th:first-child {\n"
            + "                border-left: none;\n"
            + "            }\n"
            + "\n"
            + "            table.blueTable tfoot {\n"
            + "                font-size: 14px;\n"
            + "                font-weight: bold;\n"
            + "                color: #FFFFFF;\n"
            + "                background: #D0E4F5;\n"
            + "                background: -moz-linear-gradient(top, #dcebf7 0%, #d4e6f6 66%, #D0E4F5 100%);\n"
            + "                background: -webkit-linear-gradient(top, #dcebf7 0%, #d4e6f6 66%, #D0E4F5 100%);\n"
            + "                background: linear-gradient(to bottom, #dcebf7 0%, #d4e6f6 66%, #D0E4F5 100%);\n"
            + "                border-top: 2px solid #444444;\n"
            + "            }\n"
            + "            table.blueTable tfoot td {\n"
            + "                font-size: 14px;\n"
            + "            }\n"
            + "            table.blueTable tfoot .links {\n"
            + "                text-align: right;\n"
            + "            }\n"
            + "            table.blueTable tfoot .links a{\n"
            + "                display: inline-block;\n"
            + "                background: #1C6EA4;\n"
            + "                color: #FFFFFF;\n"
            + "                padding: 2px 8px;\n"
            + "                border-radius: 5px;\n"
            + "            }\n"
            + "            body{\n"
            + "                background: #FE9A2E;\n"
            + "            }\n"
            + "        </style>    \n"
            + "    </head>\n"
            + "    <body>\n"
            + "    <center>\n"
            + "        <h1> Lista de Errores</h1>\n"
            + "        <table class=\"blueTable\" style=\"width: 80%\" border=\"\">\n"
            + "            <thead>\n"
            + "                <tr>\n"
            + "                    <td>No.</td>\n"
            + "                    <td>Tipo Error</td>\n"
            + "                    <td>Fila</td>\n"
            + "                    <td>Columna</td>\n"
            + "                    <td>Descripcion</td>\n"            
            + "                </tr> \n"
            + "            </thead>\n"
            + "ContenidoTabla\n"//Todas las filas de la tabla 
            + "        </table>   \n"
            + "    </center>\n"
            + "</body>\n"
            + "</html>";

    var cont = 0;
    arreglo.forEach(item => {
        cont++;
        FilaTabla += " <tr>\n"
            + "    <td>" + cont + "</td>\n"
            + "    <td>" + item[0] + "</td>\n"
            + "    <td>" + item[1] + "</td>\n"
            + "    <td>" + item[2] + "</td>\n"
            if(item[0] == "Lexico"){
                FilaTabla += "    <td> El carácter '" + item[3] + "' no pertenece al lenguaje</td>\n";
            }else{
                FilaTabla += "    <td> Se encontro '" + item[3] + "' y no se esperaba</td>\n";
            }
            
            + "  </tr>\n";
    });
    var ReporteHTML = HTML.replace("ContenidoTabla", FilaTabla);
    //crearReporteE(ReporteHTML);

    return ReporteHTML;
}

function tokens (arreglo){
    var FilaTabla = "";
    var HTML = "<!DOCTYPE html>\n"
            + "<html lang=\"en\">\n"
            + "    <head>\n"
            + "        <title>Tokens</title>\n"
            + "        <style>\n"
            + "            table.blueTable {\n"
            + "                border: 1px solid #1C6EA4;\n"
            + "                background-color: #EEEEEE;\n"
            + "                width: 100%;\n"
            + "                text-align: left;\n"
            + "                border-collapse: collapse;\n"
            + "            }\n"
            + "            table.blueTable td, table.blueTable th {\n"
            + "                border: 1px solid #AAAAAA;\n"
            + "                padding: 3px 2px;\n"
            + "            }\n"
            + "            table.blueTable tbody td {\n"
            + "                font-size: 13px;\n"
            + "            }\n"
            + "            table.blueTable tr:nth-child(even) {\n"
            + "                background: #D0E4F5;\n"
            + "            }\n"
            + "            table.blueTable thead {\n"
            + "                background: #1C6EA4;\n"
            + "                background: -moz-linear-gradient(top, #5592bb 0%, #327cad 66%, #1C6EA4 100%);\n"
            + "                background: -webkit-linear-gradient(top, #5592bb 0%, #327cad 66%, #1C6EA4 100%);\n"
            + "                background: linear-gradient(to bottom, #5592bb 0%, #327cad 66%, #1C6EA4 100%);\n"
            + "                border-bottom: 2px solid #444444;\n"
            + "            }\n"
            + "            table.blueTable thead th {\n"
            + "                font-size: 15px;\n"
            + "                font-weight: bold;\n"
            + "                color: #FFFFFF;\n"
            + "                border-left: 2px solid #D0E4F5;\n"
            + "            }\n"
            + "            table.blueTable thead th:first-child {\n"
            + "                border-left: none;\n"
            + "            }\n"
            + "\n"
            + "            table.blueTable tfoot {\n"
            + "                font-size: 14px;\n"
            + "                font-weight: bold;\n"
            + "                color: #FFFFFF;\n"
            + "                background: #D0E4F5;\n"
            + "                background: -moz-linear-gradient(top, #dcebf7 0%, #d4e6f6 66%, #D0E4F5 100%);\n"
            + "                background: -webkit-linear-gradient(top, #dcebf7 0%, #d4e6f6 66%, #D0E4F5 100%);\n"
            + "                background: linear-gradient(to bottom, #dcebf7 0%, #d4e6f6 66%, #D0E4F5 100%);\n"
            + "                border-top: 2px solid #444444;\n"
            + "            }\n"
            + "            table.blueTable tfoot td {\n"
            + "                font-size: 14px;\n"
            + "            }\n"
            + "            table.blueTable tfoot .links {\n"
            + "                text-align: right;\n"
            + "            }\n"
            + "            table.blueTable tfoot .links a{\n"
            + "                display: inline-block;\n"
            + "                background: #1C6EA4;\n"
            + "                color: #FFFFFF;\n"
            + "                padding: 2px 8px;\n"
            + "                border-radius: 5px;\n"
            + "            }\n"
            + "            body{\n"
            + "                background: #FE9A2E;\n"
            + "            }\n"
            + "        </style>    \n"
            + "    </head>\n"
            + "    <body>\n"
            + "    <center>\n"
            + "        <h1> Lista de Tokens</h1>\n"
            + "        <table class=\"blueTable\" style=\"width: 80%\" border=\"\">\n"
            + "            <thead>\n"
            + "                <tr>\n"
            + "                    <td>No.</td>\n"
            + "                    <td>Fila</td>\n"
            + "                    <td>Columna</td>\n"
            + "                    <td>Tipo</td>\n"
            + "                    <td>Descripcion</td>\n"            
            + "                </tr> \n"
            + "            </thead>\n"
            + "ContenidoTabla\n"//Todas las filas de la tabla 
            + "        </table>   \n"
            + "    </center>\n"
            + "</body>\n"
            + "</html>";

    var cont = 0;
    arreglo.forEach(item => {
        cont++;
        FilaTabla += " <tr>\n"
            + "    <td>" + cont + "</td>\n"
            + "    <td>" + item[2] + "</td>\n"
            + "    <td>" + item[0] + "</td>\n"
            + "    <td>" + item[1] + "</td>\n"
            + "    <td>" + item[3] + "</td>\n"
            + "  </tr>\n";
    });
    var ReporteHTML = HTML.replace("ContenidoTabla", FilaTabla);
    //crearReporteT(ReporteHTML);

    return ReporteHTML;
}


function crearReporteE(contenido){
    fs.writeFile("Errores.html", contenido, function(err) {
        if (err) {
          return console.log(err);
        }
        console.log("El reporte fue creado correctamente");
      });
}

function crearReporteT(contenido){
    fs.writeFile("Reporte.html", contenido, function(err) {
        if (err) {
          return console.log(err);
        }
        console.log("El reporte fue creado correctamente");
      });
}

module.exports.erroes = erroes;
module.exports.tokens = tokens;