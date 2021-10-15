let contratoRepository = require('../repository/contratoRepository');
let createStandardOperations = require('./standardOperations');

async function createContrato(request, response) {
    let {body} = request;
    let result = await contratoRepository.create(body);
    
    if (!result.success) {
        response.status(400).json(result);
        return;
    }

    response.status(201).json(result);

}

function contratoController(routes) {
    let standardOperations = createStandardOperations(contratoRepository);
    let { paginationList } = standardOperations;
    routes.get('/contratos', paginationList);
    routes.post('/contratos', createContrato);
}

module.exports = contratoController;