let express = require('express');
let routes = express.Router();
let produtoController = require('./controllers/produtoController');
let fornecedorController = require('./controllers/fornecedorController');
let tipoPlanoController = require('./controllers/tipoPlanoController');
let planoController = require('./controllers/planoController');

produtoController(routes);
fornecedorController(routes);
tipoPlanoController(routes);
planoController(routes);

module.exports = routes;