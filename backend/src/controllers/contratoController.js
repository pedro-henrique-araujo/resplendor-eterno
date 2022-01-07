let contratoRepository = require('../repository/contratoRepository');
let clienteRepository = require('../repository/clienteRepository');
let generator = require('../installmentsGenerator');
let createStandardOperations = require('./standardOperations');
let {publicLocation} = require('../environment');
const contratoPaperGenerator = require('../contratoPaperGenerator');

async function createContrato(request, response) {
    let { body } = request;
    let result = await contratoRepository.create(body);

    if (!result.success) {
        response.status(400).json(result);
        return;
    }

    response.status(201).json(result);

}

async function contratoPaper(request, response) {
    let {id} = request.params;  
    let cliente = await clienteRepository.getClienteByContratoId(id);
    let filename = contratoPaperGenerator(cliente);   

    response.json({ location: publicLocation + 'contratos/' + filename });
}

async function processContrato(request, response) {
    let { id } = request.params;
    let result = await contratoRepository.process(id);
    response.status(201).json(result);
}

async function generateInstallments(request, response) {
    let { id } = request.params;
    let installments = await contratoRepository.getInstallments(id);
    let filename = generator.run(installments);
    response.json({ location: publicLocation + filename });
}

function contratoController(routes) {
    let standardOperations = createStandardOperations(contratoRepository);
    let { paginationList } = standardOperations;
    routes.get('/contratos', paginationList);
    routes.get('/contratos/installments/:id', generateInstallments);
    routes.get('/contratos/paper/:id', contratoPaper);
    routes.post('/contratos', createContrato);
    routes.post('/contratos/process/:id', processContrato);
}

module.exports = contratoController;