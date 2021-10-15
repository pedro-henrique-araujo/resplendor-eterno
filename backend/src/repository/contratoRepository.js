let standardMessages = require('../utils/standardMessages');
let db = require('../data/db');

module.exports = {

    async getList(page) {
        let offset = (page - 1) * 10;
        let data = await db.query(`
                SELECT
                c.id,
                cf.nome as cliente,
                p.descr as plano,
                c.venc,
                COUNT(cd.doc) as count_dependentes
            FROM contrato c
            JOIN carac_fisica cf ON (c.clie_doc = cf.doc)
            JOIN contrato_dep cd ON (cd.contrato_id = c.id)
            JOIN plano p ON (p.id = c.plano_id)
            GROUP BY c.id, cf.nome,	p.descr, c.venc
            OFFSET $1 LIMIT 10 
        `, [offset]);

        let countContratoResult = await db.query(`
            SELECT count(*) AS count FROM contrato
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
                SELECT
                c.id,
                cf.nome,
                p.descr,
                c.venc,
                COUNT(cd.doc)
            FROM contrato c
            JOIN carac_fisica cf ON (c.clie_doc = cf.doc)
            JOIN contrato_dep cd ON (cd.contrato_id = c.id)
            JOIN plano p ON (p.id = c.plano_id)
            GROUP BY c.id, cf.nome,	p.descr, c.venc
            WHERE c.id || cf.nome || p.descr ~* $1
            OFFSET $2 LIMIT 10 
        `, [search, offset]);

        let countContratoResult = await db.query(`
            SELECT count(*) AS count FROM contrato 
            WHERE c.id || cf.nome || p.descr ~* $1
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
    }
}