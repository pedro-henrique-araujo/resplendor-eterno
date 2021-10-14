let dependenteRepository = require('../repository/dependenteRepository');
let createStandardOperations = require('./standardOperations');

async function createDependente(request, response) {
    let {body } = request;
    let result = await dependenteRepository.create(body);
    if (!result.success) {
        response.status(400).json(result);
        return;
    }

    response.status(201).json(result);
}


function dependenteController(routes) {
    let standardOperations = createStandardOperations(dependenteRepository);
    routes.get('/dependentes', standardOperations.pagitinationList);
    routes.post('/dependentes', createDependente);
}

module.exports = dependenteController;