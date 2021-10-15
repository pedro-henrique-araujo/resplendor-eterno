let produtoRepository = require("../repository/produtoRepository");
let createStandardOperations = require('./standardOperations');


async function detailProduto(request, response) {
    let { id } = request.params;
    let record = await produtoRepository.getSingle(id);
    response.json(record);
}

async function createProduto(request, response) {
    let { body } = request;
    let result = await produtoRepository.create(body);

    if (!result.success) {
        response.status(400).json(result);
        return;
    }

    response.status(201).json(result);
}

async function updateProduto(request, response) {
    let { id } = request.params;
    let result = await produtoRepository.update({id, ...request.body});
    if (!result.success)
        response.status(400);
    response.json(result);
}

function produtoController(routes) {
    let standardOperations = createStandardOperations(produtoRepository);
    let { paginationList, getOptions } = standardOperations;
    routes.get('/produtos', paginationList);
    routes.get('/produtos/options', getOptions);
    routes.get('/produtos/:id', detailProduto);
    routes.post('/produtos', createProduto);
    routes.put('/produtos/:id', updateProduto);
}

module.exports = produtoController;