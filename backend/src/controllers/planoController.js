let planoRepository = require('../repository/planoRepository');

async function listPlanos(request, response) {
    let page = request.query.page || 1;
    let { search } = request.query;

    if (search) {
        let output = await planoRepository.getListWithSearch(page, search);
        response.json(output);
        return;
    } 
    
    let output = await planoRepository.getList(page);
    response.json(output);
}

async function getPlanosOptions(request, response) {
    let records = await planoRepository.getOptions();
    response.json(records);
}

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
    routes.get('/planos', listPlanos);
    routes.get('/planos/options', getPlanosOptions);
    routes.post('/planos', createPlano);
}

module.exports = planoController;