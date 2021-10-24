let standardMessages = require('../utils/standardMessages');
let db = require('../data/db');

module.exports = {

    async getList(page) {
        let offset = (page - 1) * 10;
        let data = await db.query(`
            SELECT * FROM vw_contrato
            OFFSET $1 LIMIT 10 
        `, [offset]);

        let countContratoResult = await db.query(`
            SELECT count(*) AS count FROM vw_contrato
        `);

        let {count} = countContratoResult[0];

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
            SELECT * FROM vw_contrato
            WHERE searchable ~* $1
            OFFSET $2 LIMIT 10 
        `, [search, offset]);

        let countContratoResult = await db.query(`
            SELECT count(*) AS count FROM vw_contrato 
            WHERE searchable ~* $1
        `, [search]);

        let {count} = countContratoResult[0];

        let numberOfPages = Math.ceil(count / 10);
        let output = {
            numberOfPages: numberOfPages,
            records: data
        };

        return output;
    },

    async create(contrato) {
        let { planoId, clieDoc, venc, dependentes = [] } = contrato;

        try {
            let nextValQueryResult = await db.query(`select nextval('plano_id_seq')`);
            let nextContrId = nextValQueryResult[0].nextval;
            db.prepare('INSERT INTO contrato VALUES ($1, $2, $3, $4)'
            , [nextContrId, planoId, clieDoc, venc]);

            for (let doc of dependentes) {
                db.prepare(`
                    INSERT INTO contrato_dep VALUES 
                    ($1, $2)
                `, [doc, nextContrId]);
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
    },

    async process(id) {
        try {
            let sql = 'SELECT process_contrato($1)';
            await db.query(sql, [id]);
            return {
                message: standardMessages.recordSuccessfullyCreated,
                success: true
            };
        } catch (error) {
            console.log(error);
            return {
                message: standardMessages.recordCouldntBeCreated,
                success: false
            };
        }
    }
}