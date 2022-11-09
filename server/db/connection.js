require('dotenv').config();
const Pool = require('pg').Pool;

const pool = new Pool({
  host: process.env.PSQL_HOST,
  user: process.env.PSQL_USER,
  port: process.env.PSQL_PORT,
  password: process.env.PSQL_PASSWORD,
  database: process.env.PSQL_DATABASE
});

pool.connect().then(() => {
  console.log('pool connected');
})
  .catch(err => {
    console.error('error from pool.connect', err.message);
  });
module.exports = pool;
