let db = require('../data/db');

module.exports = {
    async getList(page) {
        let offset = (page - 1) * 10;
        let params = [ offset ];
        let data = await db.query(`
            SELECT * FROM produto OFFSET $1 LIMIT 10`, 
            params
        );

        let countProdutoResult = await db.query('SELECT count(*) AS count from produto');
        let { count } = countProdutoResult[0];
        let numberOfPages = Math.ceil(count / 10);

        let output = {
            numberOfPages: numberOfPages,
            records: data
        };
        return output;
    }
};