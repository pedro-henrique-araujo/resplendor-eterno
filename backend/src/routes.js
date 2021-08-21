let express = require('express');
let produtoController = require('./controllers/produtoController');
let routes = express.Router();

produtoController(routes);


module.exports = routes;