let pg = require('pg');
let {dbUser, dbLocation, dbName, dbPassword} = require('../environment');


let dbCredentials = {
    user: dbUser,
    host: dbLocation,
    database: dbName,
    password: dbPassword
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


    function prepare(sql, params) {
        preparedQueries.push({sql, params});
    }

    async function executeTransaction() {
        let client = new pg.Client(dbCredentials);
        client.connect();
        try {
            await client.query('BEGIN');
            for (let { sql, params } of preparedQueries) {
                await client.query(sql, params);
            }
            await client.query('COMMIT');
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.end();
            clearPrepared();
        }
    }

    function clearPrepared() {
        preparedQueries = [];
    }

    let preparedQueries = [];

    return  { 
        query,
        prepare,
        executeTransaction,
        clearPrepared
    };
}

module.exports = createDb;