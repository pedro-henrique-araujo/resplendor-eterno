let pg = require('pg');


let dbCredentials = {
    user: 'pedro',
    host: 'localhost',
    database: 'resplendor_eterno',
    password: '12345'
};


function createDb(treatResult) {
    async function query(sql, params) {
        let client = new pg.Client(dbCredentials);
        client.connect();
        let { rows } = await client.query(sql, params);

        let result = treatResult(rows);
        client.end();
        return result;
    }

    return  { query };
}

module.exports = createDb;