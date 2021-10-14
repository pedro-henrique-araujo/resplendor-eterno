let clienteRepository = require('../repository/clienteRepository');
let createStandardOperations = require('./standardOperations');

async function detailCliente(request, response) {
    let { doc } = request.params;
    let record = await clienteRepository.getSingle(doc);
    response.json(record);
}

async function createCliente(request, response) {
    
    let { body } = request;
    let result = await clienteRepository.create(body);
    
    if (!result.success) {
        response.status(400).json(result);
        return;
    }

    response.status(201).json(result);
}

function clienteController(routes) {
    let standardOperations = createStandardOperations(clienteRepository);
    routes.get('/clientes', standardOperations.pagitinationList);
    routes.get('/clientes/:doc', detailCliente)
    routes.post('/clientes', createCliente);
}

module.exports = clienteController;