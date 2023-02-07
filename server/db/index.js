require('dotenv').config();

const { Pool, Client } = require('pg');

const pool = new Pool({
  host: process.env.PSQL_HOST,
  user: process.env.PSQL_USER,
  port: process.env.PSQL_PORT,
  password: process.env.PSQL_PASSWORD,
  database: process.env.PSQL_DATABASE
});



module.exports = pool;

