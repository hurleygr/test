// var createError = require('http-errors');
var express = require('express');
var mysql = require('./dbcon.js');
var http = require('http');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var indexRouter = require('./routes/index');
var app = express();
var server = http.createServer(app);
//app.set('port', 5000);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
const cors = require('cors')

app.use(cors())
app.use('/', indexRouter);
app.use(bodyParser.json());
app.get('/posts',function(req,res,next){
  //console.log("Posts")
	mysql.pool.query('SELECT * FROM Posts LEFT JOIN Groups ON Posts.group_id=Groups.group_id LEFT JOIN Users ON Users.user_id=Posts.user_id', function(err, rows, fields){
    		console.log(rows)
		res.send(rows);
		});
	});
app.get('/allcomments', function(req, res, next){
  mysql.pool.query('SELECT * FROM Comments', function(err, rows, fields){
  res.send(rows);
  })
});

app.get('/comments', function(req, res, next){
  console.log(req);
  var post_id = req.params.id;
  mysql.pool.query("SELECT * FROM Comments WHERE Comments.post_id=?",[post_id], function(err, rows, fields){
    res.send(rows);
    })
});
app.post('/posts', function(req, res, next){
    //var title = req.body.title;
    console.log("req: ", req.body);
    //var content = req.body.content;
   // var create_date = req.body.create_date;
    //var group_id = req.body.group_id; // need select, what if no group? what if group not created but field is filled?
    //var user_id = req.body.user_id; // what if no one logged in? default to anonymous? but then there is no id. 
    //mysql.pool.query("INSERT INTO Posts (`title`, `content`, `create_date`, `group_id`, `user_id`) VALUES ('" + title + "', '" + content + "', NOW(), '" + group_id +"',  '" + user_id +"'", function(err, rows, fields) {
//console.log('fields: ', fields)
//console.log('err: ', err)
//console.log(rows)
    var create_date = new Date()
    var title = req.body.title;
    var content = req.body.content;
    var group_id = req.body.group_id; 
    var user_id = req.body.user_id; 
    var post = {title: title, content: content, create_date: create_date, group_id: group_id, user_id:user_id}
    mysql.pool.query('INSERT INTO Posts SET ?', post, function(err, rows, fields) {
      console.log(err)
      console.log(fields)
      console.log(rows)
      res.send(rows)
})
  });

app.post('/register', function(req, res, next){
  var user = req.body.user;
  var password = req.body.password;
  var email = req.body.email;
  var post = {user_name: user, password: password, email: email}
  mysql.pool.query('INSERT INTO Users SET ?',post, function(err, rows, fields){
res.send(rows)
})
});

app.post('/comments', function(req, res, next){
  var content = req.body.content;
  var create_date = new Date();
  var post_id = req.body.post_id; 
  var user_id = req.body.user_id; 
  var post = {user_id:user_id, post_id:post_id, content:content, create_date:create_date}
  mysql.pool.query('INSERT INTO Comments SET ?', post, function(err, rows, fields){
	res.send(rows)
})
});

app.get('/author', function(req, res, next) {
  var id = req.query.id;
  mysql.pool.query("SELECT username FROM Users WHERE user_id = ?", [id], function(err, rows, fields){
   res.send(rows)
   })
});

app.get('/userid', function(req, res, next) {
  console.log(req.query)
  var name = req.query.username;
  mysql.pool.query("SELECT user_id FROM Users WHERE user_name = ?", [name], function(err,rows, fields){
    res.send(rows)
  })
});

app.get('/groupid', function(req, res, next) {
  var name = req.query.groupname;
  mysql.pool.query("SELECT group_id FROM Groups WHERE group_name = ?", [name], function(err, rows, fields){
    res.send(rows)
})
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


server.listen(1135, function(){
  console.log('Express started on http://localhost:' + server.address().port + '; press Ctrl-C to terminate.');
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





