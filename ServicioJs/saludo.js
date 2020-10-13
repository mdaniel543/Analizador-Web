
function saludar(req, res) {
    return res.send({saludo: 'HOLA'});
}

module.exports = saludar;