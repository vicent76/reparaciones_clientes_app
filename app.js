"use strict";
const Express = require('express');
const Cors = require('cors');
const Morgan = require('morgan');
const Winston = require('./winston');
const BodyParser = require("body-parser");


const app = Express();

if (process.env.NODE_ENV != "TEST") app.use(Morgan('combined', { stream: Winston.stream }));
app.use(Cors());
app.use(BodyParser.urlencoded({ extended: false }));
app.use(BodyParser.json());

// servidor html estático
app.use(Express.static(__dirname + "/public"));

app.use('/version', require('./api/version/version_controller'));
app.use('/config', require('./api/config/config_controller'));
app.use('/mailjet', require('./api/mailjet/mailjet_controller'));


app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    if (process.env.NODE_ENV != "TEST") Winston.error(error);
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;
