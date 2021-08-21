let produtoRepository = require("../repository/produtoRepository");

async function listProdutos(request, response) {
    let page = request.query.page || 1;
    let output = await produtoRepository.getList(page);
    response.json(output);
}


function produtoController(routes) {
    routes.get('/produtos', listProdutos);
}

module.exports = produtoController;