const express = require('express');
const app = express();





app.get('/', (req, res) => res.send({status: 200, msg: 'Compi 1 desde Docker Analizador .js'}));

app.listen(3000, () => console.log('Servidor en el puerto'));