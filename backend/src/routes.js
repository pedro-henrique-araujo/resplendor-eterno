let express = require('express');
let routes = express.Router();
let produtoController = require('./controllers/produtoController');
let fornecedorController = require('./controllers/fornecedorController');

produtoController(routes);
fornecedorController(routes);

module.exports = routes;