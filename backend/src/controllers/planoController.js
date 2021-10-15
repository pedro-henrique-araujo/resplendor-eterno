let planoRepository = require('../repository/planoRepository');
let createStandardOperations = require('./standardOperations');

async function createPlano(request, response) {
    let { body } = request;
    let result = await planoRepository.create(body);

    if (!result.success) {
        response.status(400).json(result);
        return;
    }

    response.status(201).json(result);
}

function planoController(routes) {
    let standardOperations = createStandardOperations(planoRepository);
    let { pagitinationList, getOptions } = standardOperations;
    routes.get('/planos', pagitinationList);
    routes.get('/planos/options', getOptions);
    routes.post('/planos', createPlano);
}

module.exports = planoController;