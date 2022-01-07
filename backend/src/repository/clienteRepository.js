let standardMessages = require('../utils/standardMessages');
let db = require('../data/db');

module.exports = {
    async getList(page) {
        
        let offset = (page - 1) * 10;
        let params = [offset];
        let data = await db.query(`
            SELECT * FROM vw_cliente
            OFFSET $1 LIMIT 10
        `, params);

        let countProdutoResult = await db.query(`
            SELECT count(*) AS count FROM vw_cliente
        `);

        let { count } = countProdutoResult[0];
        let numberOfPages = Math.ceil(count / 10);
        let output = {
            numberOfPages: numberOfPages,
            records: data
        };

        return output;

    },

    async getListWithSearch(page, search) {
        
        let offset = (page - 1) * 10;
        let data = await db.query(`
            SELECT * FROM vw_cliente WHERE searchable ~* $1
            OFFSET $2 LIMIT 10
        `, [search, offset]);

        let countPlanoResult = await db.query(`
            SELECT count(*) AS count FROM vw_cliente
            WHERE searchable ~* $1
        `, [search]);

        let { count } = countPlanoResult[0];
        let numberOfPages = Math.ceil(count / 10);
        let output = {
            numberOfPages: numberOfPages,
            records: data
        };

        return output;
    },

    async getOptions() {
        let sql = `
            SELECT
                p.doc,
                cf.nome
            FROM pessoa p
            JOIN carac_fisica cf ON (p.doc = cf.doc)
            WHERE p.rel = 1
        `;
        let data = await db.query(sql);
        return data;
    },

    async create(cliente) {
        let {doc, nome, rg, sexo = 0, nasc, enderecos} = cliente;
        try {

            db.prepare(`
                SELECT create_cliente($1, $2, $3, $4, $5)
            `, [doc, nome, rg, sexo, nasc]);

            for (let {uf, muni, logra} of enderecos) {
                db.prepare(`
                    INSERT INTO endereco VALUES
                    ($1, $2, $3, $4)
                `, [doc, uf, muni, logra]);
            }
            
            await db.executeTransaction();

            return {
                message: standardMessages.recordSuccessfullyCreated,
                success: true
            };
        } catch (error) {
            if (error.code == '23505') {
                return {
                    message: standardMessages.cpfAlredyExists,
                    success: false
                };
            }
            return {
                message: standardMessages.recordCouldntBeCreated,
                success: false
            };
        }
    },

    async getSingle(doc) {
        let data = await db.query(`
            SELECT doc, nome, rg, sexo, muni, logra, uf FROM vw_cliente p
            WHERE doc = $1
        `, [ doc ]);

        return data[0];
    },

    async getClienteByContratoId(id) {
        let data = await db.query(`
            SELECT * FROM get_cliente_by_contrato_id($1);
        `, [id]);

        return data[0];
    }
}