let contratoRepository = require('../repository/contratoRepository');
let generator = require('../installmentsGenerator');
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

async function processContrato(request, response) {
    let { id } = request.params;

    let result = await contratoRepository.process(id);
    response.status(201).json(result);
}

function generateInstallments(request, response) {
    let filename = generator.run();
    response.json({ location: filename });
}

function contratoController(routes) {
    let standardOperations = createStandardOperations(contratoRepository);
    let { paginationList } = standardOperations;
    routes.get('/contratos', paginationList);
    routes.get('/contratos/installments', generateInstallments);
    routes.post('/contratos', createContrato);
    routes.post('/contratos/process/:id', processContrato);
}

module.exports = contratoController;