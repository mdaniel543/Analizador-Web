var express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
var app = express();
const routes = require('./rutas');

app.set('port', 3000);
app.use(cors());
app.use(bodyParser.urlencoded({/*limit: "50mb", */extended: false}));
app.use(bodyParser.json({/*limit: '50mb', */extended: false}));
app.use(routes);

app.listen(8080, function () {
  console.log('Example app listening on port 3000!');
});