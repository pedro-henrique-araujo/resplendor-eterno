let tipoPlanoRepository = require('../repository/tipoPlanoRepostory');

async function getTiposPlanoOptions(request, response) {
    let records = await tipoPlanoRepository.getOptions();
    response.json(records);
}

function tipoPlanoController(routes) {
    routes.get('/tipos-plano/options', getTiposPlanoOptions);
}

module.exports = tipoPlanoController;