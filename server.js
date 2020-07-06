"use strict";
const Dotenv = require('dotenv');
const App = require('./app');
const Winston = require('./winston');
const Pack = require('./package.json');
var moment = require('moment');

Dotenv.config();

var apiPort = process.env.BASE_PORT || 8089;

App.listen(apiPort, () => {
    Winston.info(Pack.name + " VRS: " + Pack.version);
    Winston.info("Listening on port " + apiPort + "...");
});

// -- console message
console.log("-------------------------------------------");
console.log(" REPARACIONES_CLIENTES RUNNING ", moment(new Date()).format('DD/MM/YYYYY HH:mm:ss'));
console.log("-------------------------------------------");
console.log(' VERSION: ' + Pack.version);
console.log(' PORT: ' + process.env.BASE_PORT);
console.log("-------------------------------------------");
