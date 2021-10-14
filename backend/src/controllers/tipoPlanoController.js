let tipoPlanoRepository = require('../repository/tipoPlanoRepostory');
let createStandardOperations = require('./standardOperations');

function tipoPlanoController(routes) {
    let standardOperations = createStandardOperations(tipoPlanoRepository);
    routes.get('/tipos-plano/options', standardOperations.getOptions);
}

module.exports = tipoPlanoController;