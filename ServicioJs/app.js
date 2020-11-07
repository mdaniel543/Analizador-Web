var express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
var app = express();
const routes = require('./rutas');

const ip   = process.env.NODEIP || "182.18.7.7";
const port = process.env.NODEPORT || 3000;

//app.set('port', 3000);
app.use(cors());
app.use(bodyParser.urlencoded({/*limit: "50mb", */extended: false}));
app.use(bodyParser.json({/*limit: '50mb', */extended: false}));
app.use(routes);

/*app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});*/

app.listen(port,ip, () => {
  console.log('IP: %s PORT: %d', ip, port);
});

