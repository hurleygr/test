// var createError = require('http-errors');
var express = require('express');
var mysql = require('./dbcon.js');

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var app = express();

//app.set('port', 5000);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
const cors = require('cors')

app.use(cors())
app.use('/', indexRouter);

app.get('/posts',function(req,res,next){
  //console.log("Posts")
	mysql.pool.query('SELECT * FROM Posts', function(err, rows, fields){
    console.log(rows)
		res.send(rows);
		});
	});
app.get('/drop',function(req,res,next){
  console.log("Dropping")

  var createString = "CREATE TABLE diagnostic(" +
  "id INT PRIMARY KEY AUTO_INCREMENT," +
  "text VARCHAR(255) NOT NULL)";
  mysql.pool.query('DROP TABLE IF EXISTS diagnostic', function(err){
    if(err){
      console.log(err)
      next(err);
      return;
    }
    mysql.pool.query(createString, function(err){
      if(err){
        console.log(err)
        next(err);
		return;
      }
	  mysql.pool.query('INSERT INTO diagnostic (`text`) VALUES ("MySQL is Working!")',function(err){
	    mysql.pool.query('SELECT * FROM diagnostic', function(err, rows, fields){
		  res.json(JSON.stringify(rows));
		});
	  });
    });
  });
});


app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});



// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;





