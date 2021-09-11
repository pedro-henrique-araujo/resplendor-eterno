let produtoRepository = require("../repository/produtoRepository");

async function listProdutos(request, response) {
    let page = request.query.page || 1;
    let { search } = request.query;

    
    if (search) {
        let output = await produtoRepository.getListWithSearch(page, search);
        response.json(output);
        return;
    } 
    
    let output = await produtoRepository.getList(page);
    response.json(output);
}

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
    routes.get('/produtos', listProdutos);
    routes.get('/produtos/:id', detailProduto);
    routes.post('/produtos', createProduto);
    routes.put('/produtos/:id', updateProduto);
}

module.exports = produtoController;