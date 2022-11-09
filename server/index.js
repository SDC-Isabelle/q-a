require('dotenv').config();
const express = require('express');
const routes = require('./routes.js');
const app = express();
const pool = require('./db/connection.js');

app.use(express.json());
app.use(express.urlencoded());

app.use('/qa/questions', routes);

app.listen(process.env.PORT, () => {
  console.log(`server is listening on port ${process.env.PORT}`);
});

app.get('/loaderio-d56c7c88c599a365803752216427e8b2', (req, res)=>
  res.send('loaderio-d56c7c88c599a365803752216427e8b2'));
