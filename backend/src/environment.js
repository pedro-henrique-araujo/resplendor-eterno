let dotenv = require('dotenv');

dotenv.config();

let { DB_NAME, DB_LOCATION, DB_USER, DB_PASSWORD, SERVER_LOCATION, SERVER_PORT } = process.env;

module.exports = {
    server: `${SERVER_LOCATION}:${SERVER_PORT}`,
    serverPort: SERVER_PORT,
    serverLocation: SERVER_LOCATION,
    dbName: DB_NAME,
    dbLocation: DB_LOCATION,
    dbUser: DB_USER,
    dbPassword: DB_PASSWORD
};