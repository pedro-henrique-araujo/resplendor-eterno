let express = require('express');
let routes = express.Router();
let produtoController = require('./controllers/produtoController');
let fornecedorController = require('./controllers/fornecedorController');
let tipoPlanoController = require('./controllers/tipoPlanoController');
let planoController = require('./controllers/planoController');
let clienteController = require('./controllers/clienteController');
let dependenteController = require('./controllers/dependenteController');
let contratoController = require('./controllers/contratoController');

produtoController(routes);
fornecedorController(routes);
tipoPlanoController(routes);
planoController(routes);
clienteController(routes);
dependenteController(routes);
contratoController(routes);

module.exports = routes;