const createDb = require("./createDb");
let formatObjects = require("../utils/formatObjects");

module.exports = createDb(formatObjects.cameliseFromSnakeCase);