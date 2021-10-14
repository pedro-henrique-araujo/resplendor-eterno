let standardMessages = require('../utils/standardMessages');
let db = require('../data/db');

module.exports = {
    async getList(page) {
        let offset = (page - 1) * 10;
        let data = await db.query(`
                SELECT
                    p.doc,
                    cf.nome,
                    cf.rg,
                    cf.sexo,
                    cf.nasc
                FROM pessoa p
                JOIN carac_fisica cf ON (p.doc = cf.doc)
                WHERE p.rel = 3
                OFFSET $1 LIMIT 10
        `, [offset]);
        
        let countPlanoResult = await db.query(`
            SELECT count(*) AS count FROM pessoa WHERE rel = 3
        `);

        let { count } = countPlanoResult[0];
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
            SELECT
                p.doc,
                cf.nome,
                cf.rg,
                cf.sexo,
                cf.nasc
            FROM pessoa p
            JOIN carac_fisica cf ON (p.doc = cf.doc)
            WHERE p.rel = 3
            AND p.doc || lower(cf.nome) || lower(cf.rg) ~* $1
            OFFSET $2 LIMIT 10
        `, [search, offset]);

        let countPlanoResult = await db.query(`
            SELECT count(*) AS count FROM pessoa WHERE rel = 3
            AND p.doc || lower(cf.nome) || lower(cf.rg) ~* $1
        `);

        let { count } = countPlanoResult[0];
        let numberOfPages = Math.ceil(count / 10);
        let output = {
            numberOfPages: numberOfPages,
            records: data
        };

        return output;
    },

    async create(dependente) {
        let {
            doc,
            docDep,
            parenId,
            nome, 
            rg, 
            sexo, 
            nasc, 
            enderecos
        } = dependente;
        try {

            db.prepare(`
                SELECT create_dependente($1, $2, $3, $4, $5, $6, $7)
            `, [doc, docDep, parenId, nome, rg, sexo, nasc]);

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
    }
};