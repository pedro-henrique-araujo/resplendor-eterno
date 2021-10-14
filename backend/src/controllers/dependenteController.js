let dependenteRepository = require('../repository/dependenteRepository');

async function list(request, response) {
    let { doc } = request.params;
    let output = await dependenteRepository.getListByDoc(doc);
    response.json(output);
}

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
    routes.get('/dependentes/:doc', list);
    routes.post('/dependentes', createDependente);
}

module.exports = dependenteController;