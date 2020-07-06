"use strict";
const Express = require('express');
const Pack = require('../../package.json');
const Dotenv = require('dotenv');

var router = Express.Router();
Dotenv.config();

router.get('/', (req, res) => {
    var hostName = req.hostname;
    var protocol = process.env.BASE_PROTOCOL;
    var api = protocol + "://" + hostName + ":8088";
    var sti = protocol + "://" + hostName + ":8088/api/streport";
    var config = {
        urlApi: api,
        urlClient: process.env.BASE_URLCLIENT || "",
        one_push_url: process.env.ONE_PUSH_URL,
        one_app_id: process.env.ONE_APP_ID,
        one_api_key: process.env.ONE_API_KEY,
        mailjet_api_key: process.env.MAILJET_API_KEY,
        mailjet_api_secret: process.env.MAILJET_API_SECRET,
        report: {
            stiUrl: sti,
            host: "localhost",
            user: "root",
            password: "aritel",
            database: "proasistencia",
            port: 3306
        }
    }
    res.json(config);
});

module.exports = router;