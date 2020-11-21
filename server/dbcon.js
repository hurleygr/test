var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_hurleygr',
  password        : '1135',
  database        : 'cs340_hurleygr'
});

module.exports.pool = pool;