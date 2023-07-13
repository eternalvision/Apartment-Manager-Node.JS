const Pool = require("pg").Pool;

const pool = new Pool({
    connectionString: process.env.DB_CONNECTION_STRING,
});

module.exports = pool;
