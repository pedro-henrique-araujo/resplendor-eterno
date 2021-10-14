let standardMessages = require('../utils/standardMessages');
let db = require('../data/db');


module.exports = {
    async getList(page) {
        let offset = (page - 1) * 10;
        let params = [ offset ];
        let data = await db.query(`
                SELECT p.id, p.descr, p.tipo_id, tp.descr AS tipo_descr, p.preco 
                FROM plano p 
                JOIN tipo_plano tp ON (p.tipo_id = tp.id)
                OFFSET $1 LIMIT 10
            `, 
            params
        );

        let countPlanoResult = await db.query(`
            SELECT count(*) AS count from plano
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
                SELECT * FROM plano
                WHERE id || lower(descr) ~* $1
                OFFSET $2 LIMIT 10
            `, 
            [ search, offset ]
        );


        let countPlanoResult = await db.query(`
            SELECT count(*) AS count from plano
            WHERE id || lower(descr) ~* $1
        `, [ search ]);
        
        let { count } = countPlanoResult[0];
        let numberOfPages = Math.ceil(count / 10);

        let output = {
            numberOfPages: numberOfPages,
            records: data
        };

        return output;
    },

    async getOptions() {
        let data = await db.query(`
            SELECT id, descr FROM plano
        `);
        return data;
    },

    async create(plano) {
        let { descr, prods, tipoId, preco } = plano;
        try {
            let nextValQueryResult = await db.query(`select nextval('plano_id_seq')`);
            let nextProdId = nextValQueryResult[0].nextval;
            db.prepare(`
                INSERT INTO plano (id, descr, tipo_id, preco)
                VALUES ($1, $2, $3, $4)
            `, [nextProdId, descr, tipoId, preco]);

            for (let {id, qtd} of prods) {
                
                db.prepare(`
                    INSERT INTO plano_produto (plano_id, produto_id, qtd_prod)
                    VALUES ($1, $2, $3)
                `, [nextProdId, id, qtd]);
            } 

            await db.executeTransaction();

            return {
                message: standardMessages.recordSuccessfullyCreated,
                success: true
            };
        } catch (error) {
            return {
                message: standardMessages.recordCouldntBeCreated,
                success: false
            };
        }
    }
};