let fornecedorRepository = require('../repository/fornecedorRepository');

async function listFornecedores(request, response) {
    let page = request.query.page || 1;   
    let { search } = request.query;
    if (search) {
        let output = await fornecedorRepository.getListWithSearch(page, search);
        response.json(output);
        return;
    }


    let output = await fornecedorRepository.getList(page);
    response.json(output);
}

async function detailFornecedor(request, response) {
    let { doc } = request.params;
    let record = await fornecedorRepository.getSingle(doc);
    response.json(record);
}

async function createFornecedor(request, response) {
    let { body } = request;
    let result = await fornecedorRepository.create(body);

    if (!result.success) {
        response.status(400).json(result);
        return;
    }
    response.status(201).json(result);
}

async function updateFornecedor(request, response) {
    let { doc } = request.params;
    let { razao } = request.body;
    let result = await fornecedorRepository.update({ doc, razao });
    if (!result.success) 
        response.status(400);
    response.json(result);
}

async function deleteFornecedor(request, response) {
    let { doc } = request.params;
    let result = await fornecedorRepository.delete(doc);
    if (!result.success) {
        response.status(400).json(result);
        return;
    }

    response.json(result);

}

function fornecedorController(routes) {
    routes.get('/fornecedores', listFornecedores);
    routes.get('/fornecedores/:doc', detailFornecedor);
    routes.post('/fornecedores', createFornecedor);
    routes.put('/fornecedores/:doc', updateFornecedor);
    routes.delete('/fornecedores/:doc', deleteFornecedor);
}

module.exports = fornecedorController;