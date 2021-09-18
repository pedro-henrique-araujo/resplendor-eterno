let db = require('../data/db');
let standardMessages = require('../utils/standardMessages');

module.exports = {
    async getList(page) {
        let offset = (page - 1) * 10;
        let params = [ offset ];
        let data = await db.query(`
                SELECT * FROM produto
                OFFSET $1 LIMIT 10
            `, 
            params
        );

        let countProdutoResult = await db.query(`
            SELECT count(*) AS count from produto
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
                SELECT * FROM produto
                WHERE id || lower(descr) ~* $1
                OFFSET $2 LIMIT 10
            `, 
            [ search, offset ]
        );


        let countProdutoResult = await db.query(`
            SELECT count(*) AS count from produto
            WHERE id || lower(descr) ~* $1
        `, [ search ]);
        
        let { count } = countProdutoResult[0];
        let numberOfPages = Math.ceil(count / 10);

        let output = {
            numberOfPages: numberOfPages,
            records: data
        };

        return output;
    },

    async getOptions() {
        let data = await db.query(`
            SELECT id, descr FROM produto
        `);
        return data;
    },

    async getSingle(id) {
        let data = await db.query(`
            SELECT * FROM produto
            WHERE id = $1
        `, [ id ]);

        return data[0];
    },

    async create(produto) {
        let { descr, fornDoc, precEn, precSa, esto } = produto;

        try {
            await db.query(`
                INSERT INTO produto
                (descr, forn_doc, prec_en, prec_sa, esto)
                VALUES
                ($1, $2, $3, $4, $5)
            `, [
                descr,
                fornDoc,
                precEn,
                precSa,
                esto
            ]);
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

    },

    async update(produto) {
        let { id, descr, fornDoc, precEn, precSa } = produto;
        try {

            await db.query(`
                UPDATE produto
                SET 
                    descr = $2,
                    forn_doc = $3,
                    prec_en = $4,
                    prec_sa = $5
                WHERE id = $1                
            `, [
                id,
                descr,
                fornDoc,
                precEn,
                precSa
            ]);

            return {
              message: standardMessages.recordSuccessfullyUpdated,
              success: true  
            };
        } catch(error) {
            return {
                message: standardMessages.recordCouldntBeUpdated,
                success: false
            }
        }
    }
};


