function createStandardOperations(repository) {
    return {
        async paginationList(request, response) {
            let page = request.query.page || 1;
            let { search } = request.query;     
            
            if (search) {
                let output = await repository.getListWithSearch(page, search);
                response.json(output);
                return;
            }
            let output = await repository.getList(page);
            response.json(output);
        },

        async getOptions(request, response) {
            let records = await repository.getOptions();
            
            response.json(records);
        }
    };
}

module.exports = createStandardOperations;