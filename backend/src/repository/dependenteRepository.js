let standardMessages = require('../utils/standardMessages');
let db = require('../data/db');

module.exports = {
    async getListByDoc(docDep) {
        let data = await db.query(`
            SELECT p.doc, cf.nome, cf.nasc FROM pessoa p
            JOIN carac_fisica cf ON (p.doc = cf.doc)
            JOIN relac_dep rd ON (p.doc = rd.doc)
                WHERE p.rel = 3 AND rd.doc_dep = $1
        `, [ docDep ]);

        return data;
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
    },

    async getSingle(doc) {
        let data = await db.query(`
            SELECT p.doc, cf.nome, cf.nasc FROM pessoa p
            JOIN carac_fisica cf ON (p.doc = cf.doc)
            WHERE p.rel = 3 AND p.doc = $1
        `, [ doc ]);

        return data[0];
    }
};