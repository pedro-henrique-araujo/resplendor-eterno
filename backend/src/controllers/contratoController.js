let contratoRepository = require('../repository/contratoRepository');

async function createContrato(request, response) {
    let {body} = request;
    let result = await contrato.create(body);
    
    if (!result.success) {
        response.status(400).json(result);
        return;
    }

    response.status(201).json(result);

}

function contratoController(routes) {
    routes.post('/contratos', createContrato);
}

module.exports = contratoController;