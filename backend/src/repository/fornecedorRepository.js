
let db = require("../data/db");
let standardMessages = require('../utils/standardMessages');


module.exports = {
    async getList(page) {
        let offset = (page - 1) * 10;
        let params = [ offset ];
        let data = await db.query(`
            SELECT pessoa.doc, carac_juridica.razao FROM pessoa
            JOIN carac_juridica ON (pessoa.doc = carac_juridica.doc)
            WHERE pessoa.rel = 2
            OFFSET $1 LIMIT 10
        `, params);
        

        let countFornecedorResult = await db.query(`
            SELECT count(*) FROM pessoa
            JOIN carac_juridica ON (pessoa.doc = carac_juridica.doc)
            WHERE pessoa.rel = 2
        `);

        let { count } = countFornecedorResult[0];

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
            SELECT pessoa.doc, carac_juridica.razao FROM pessoa
            JOIN carac_juridica ON (pessoa.doc = carac_juridica.doc)
            WHERE pessoa.rel = 2
            AND pessoa.doc || carac_juridica.razao ~* $1
            OFFSET $2 LIMIT 10
            `,  [ search, offset ]
        );
        

        let countFornecedorResult = await db.query(`
            SELECT count(*) FROM pessoa
            JOIN carac_juridica ON (pessoa.doc = carac_juridica.doc)
            WHERE pessoa.rel = 2
            AND pessoa.doc || carac_juridica.razao ~* $1
        `, [search]);

        let { count } = countFornecedorResult[0];

        let numberOfPages = Math.ceil(count / 10);
        let output = {
            numberOfPages: numberOfPages,
            records: data
        };

        return output;
    },


    async getOptions() {
        let data = await db.query(`
            SELECT pessoa.doc, carac_juridica.razao FROM pessoa
            JOIN carac_juridica ON (pessoa.doc = carac_juridica.doc)
        `);
        return data;
    },

    async getSingle(doc) {
        let data = await db.query(`
            SELECT pessoa.doc, carac_juridica.razao FROM pessoa
            JOIN carac_juridica ON (pessoa.doc = carac_juridica.doc)
            WHERE pessoa.rel = 2 AND pessoa.doc = $1
        `, [ doc ]);

        return data[0];
    },

    async create(fornecedor) {
        let { doc, razao } = fornecedor;
        
        try {
            db.prepare(
                `INSERT INTO pessoa VALUES ($1, 2)`,
                [ doc ]
                );
            db.prepare(
                `INSERT INTO carac_juridica VALUES ($1, $2)`,
                [doc, razao]
                );
            await db.executeTransaction();
            return { 
                message: standardMessages.recordSuccessfullyCreated,
                success: true
            };

        } catch (error) {
            if (error.code == '23505') {
                return {
                    message: standardMessages.cnpjAlreadyExists,
                    success: false
                };
            }
            return {
                message: standardMessages.recordCouldntBeCreated,
                success: false
            };
        }
    },

    async update(fornecedor) {
        let { doc, razao } = fornecedor;
        try {
            
            await db.query(
                `UPDATE carac_juridica SET razao = $1 WHERE doc = $2`, 
                [razao, doc]
                );

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
    },

    async delete(doc) {
        try {

            db.prepare(
                    `DELETE FROM carac_juridica WHERE doc = $1`,
                    [ doc ]
                );

            db.prepare(
                    `DELETE FROM pessoa WHERE doc = $1`,
                    [ doc ]
                );

            await db.executeTransaction();
            return {
                message: standardMessages.recordSuccessfullyDeleted,
                success: true
            }
        } catch (error) {
            return {
                message: standardMessages.recordCouldntBeDeleted,
                sucesss: false
            }
        }

    }
};