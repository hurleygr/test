var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit: 10,
  host: 'classmysql.engr.oregonstate.edu',
  user: 'cs340_suhs',
  password: '6193',
  database: 'cs340_suhs'
});

module.exports.pool = pool;