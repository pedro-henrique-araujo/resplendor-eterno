const db = require("../data/db");

module.exports = {
    async getOptions() {
        let data = await db.query('SELECT * FROM tipo_plano');
        return data;
    }
};