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

app.get('/posts', function (req, res, next) {
  //console.log("Posts")
  mysql.pool.query('SELECT * FROM Posts LEFT JOIN Groups ON Posts.group_id=Groups.group_id LEFT JOIN Users ON Users.user_id=Posts.user_id ORDER BY create_date DESC', function (err, rows, fields) {
    //  		console.log(rows)
    res.send(rows);
  });
});
app.get('/allcomments', function (req, res, next) {
  mysql.pool.query('SELECT * FROM Comments', function (err, rows, fields) {
    res.send(rows);
  })
});

app.get('/login', function (req, res, next) {
  var username = req.query.username;
  var password = req.query.password;
  console.log(username, password)
  mysql.pool.query('SELECT * FROM Users WHERE Users.user_name=? AND Users.password=?', [username, password], function (err, rows, fields) {
    console.log(rows)
    console.log(err)
    res.send(rows);
  })
});

app.get('/comments', function (req, res, next) {
  console.log(req);
  var post_id = req.query.id;
  mysql.pool.query("SELECT * FROM Comments LEFT JOIN Users ON Comments.user_id=Users.user_id  WHERE Comments.post_id=?", [post_id], function (err, rows, fields) {
    console.log(err)
    res.send(rows);
  })
});

app.put('/comments', function (req, res, next) {
  // var create_date = new Date()

  var content = req.body.content;

  var comment_id = req.body.comment_id;
  var comment = { content: content, comment_id: comment_id }
  mysql.pool.query('UPDATE Comments SET ? WHERE Comments.comment_id = ?', [comment, comment_id], function (err, rows, fields) {
    console.log(err)
    res.send(rows)
  })
});

app.post('/posts', function (req, res, next) {
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
  var post = { title: title, content: content, create_date: create_date, group_id: group_id, user_id: user_id }
  mysql.pool.query('INSERT INTO Posts SET ?', post, function (err, rows, fields) {
    console.log(err)
    console.log(fields)
    console.log(rows)
    res.send(rows)
  })
});
app.delete('/posts', function (req, res, next) {
  var post_id = req.query.id;
  mysql.pool.query('DELETE FROM Posts WHERE Posts.post_id=?', [post_id], function (err, rows, fields) {
    console.log(err)
    res.send(rows)
    //  mysql.pool.query('DELETE Posts, Comments FROM Posts INNER JOIN Comments ON Posts.post_id=Comments.post_id WHERE Posts.post_id=? AND Comments.post_id=?', [post_id, post_id], function(err, rows, fields){
    //console.log(err)
    //res.send(rows);
  })
});
app.put('/posts', function (req, res, next) {
  // var create_date = new Date()
  var title = req.body.title;
  var content = req.body.content;
  var group_id = req.body.group_id;
  //var user_id = req.body.user_id;
  var post = { title: title, content: content, group_id: group_id }
  mysql.pool.query('UPDATE Posts SET ? WHERE Posts.post_id = ?', [post, req.body.post_id], function (err, rows, fields) {
    console.log(err)
    res.send(rows)
  })
});

//delete comment with specific id
app.delete('/comments', function (req, res, next) {
  var comment_id = req.query.id;
  mysql.pool.query('DELETE FROM Comments WHERE Comments.comment_id=?', [comment_id], function (err, rows, fields) {
    console.log(err);
    //console.log(rows);
    res.send(rows);
  })
});
//get comment
app.post('/register', function (req, res, next) {
  console.log(req.body)
  var user = req.body.user;
  var password = req.body.password;
  var email = req.body.email;
  var post = { user_name: user, password: password, email: email }
  mysql.pool.query('INSERT INTO Users SET ?', post, function (err, rows, fields) {
    console.log(err)
    console.log(fields)
    console.log(rows)
    res.send(rows)
  })
});

app.post('/comments', function (req, res, next) {
  var content = req.body.content;
  var create_date = new Date();
  var post_id = req.body.post_id;
  var user_id = req.body.user_id;
  console.log("user id ", user_id);
  var post = { user_id: user_id, post_id: post_id, content: content, create_date: create_date }
  mysql.pool.query('INSERT INTO Comments SET ?', post, function (err, rows, fields) {
    console.log(err)
    //     console.log(fields)
    //   console.log(rows)
    res.send(rows)
  })
});

app.get('/author', function (req, res, next) {
  var id = req.query.id;
  mysql.pool.query("SELECT username FROM Users WHERE user_id = ?", [id], function (err, rows, fields) {
    res.send(rows)
  })
});

app.get('/userid', function (req, res, next) {
  console.log(req.query)
  var name = req.query.username;
  mysql.pool.query("SELECT user_id FROM Users WHERE user_name = ?", [name], function (err, rows, fields) {
    res.send(rows)
  })
});

app.get('/groupid', function (req, res, next) {
  var name = req.query.groupname;
  mysql.pool.query("SELECT group_id FROM Groups WHERE group_name = ?", [name], function (err, rows, fields) {
    res.send(rows)
  })
});



//Sang Ok
app.get('/groups', function (req, res, next) {
  mysql.pool.query('SELECT * FROM Groups', function (err, rows, fields) {
    console.log(rows)
    res.send(rows);
  });
});


app.post('/joingroups', function (req, res, next) {
  console.log(req.body);
  mysql.pool.query('INSERT INTO Group_Users (`user_id`, `group_id`) VALUES((SELECT user_id FROM Users WHERE user_name = ?), (SELECT group_id FROM Groups where group_name = ?))', [req.body.user_name, req.body.group_name], function (err, rows, fields) {
    console.log(err)
    console.log(fields)
    console.log(rows)
    res.send(rows)
  })
});

app.delete('/groups', function (req, res, next) {
  console.log(req.query);
  username = req.query.username;
  groupname = req.query.groupname;
  mysql.pool.query('DELETE FROM Group_Users WHERE user_id = (SELECT user_id FROM Users WHERE user_name = ?) AND group_id = (SELECT group_id FROM Groups WHERE group_name = ?)', [username, groupname], function (err, rows, fields) {
    console.log(err)
    res.send(rows);
  })
});

app.get('/mygroups', function (req, res, next) {
  console.log(req.query)
  var username = req.query.username;
  mysql.pool.query('SELECT * FROM Groups JOIN Group_Users ON Groups.group_id = Group_Users.group_id WHERE user_id IN (SELECT user_id FROM Users where user_name = ?)', [username], function (err, rows, fields) {
    console.log(rows)
    res.send(rows);
  });
});

app.get('/topgroups', function (req, res, next) {
  mysql.pool.query('SELECT a.group_name, b.users FROM Groups AS a LEFT JOIN (SELECT group_id, COUNT(user_id) as users FROM Group_Users GROUP BY group_id) AS b ON a.group_id = b.group_id  ORDER BY users desc, group_name asc LIMIT 5', function (err, rows, fields) {
    console.log(rows)
    res.send(rows);
  });
});

app.get('/eachgroup', function (req, res, next) {
  console.log(req.query)
  var group = req.query.group;
  mysql.pool.query("SELECT * FROM Groups WHERE group_name = ?", [group], function (err, rows, fields) {
    console.log(rows)
    res.send(rows);
  });
});

app.get('/groupjoined', function (req, res, next) {
  console.log(req.query)
  var group = req.query.group;
  var username = req.query.username;
  console.log("GROUPSSS:" + group)
  console.log("UESRNAMES:" + username)
  mysql.pool.query("SELECT COUNT(*) as joined FROM Group_Users WHERE group_id = (SELECT group_id FROM Groups WHERE group_name = ?) AND user_id IN (SELECT user_id FROM Users WHERE user_name = ?)", [group, username], function (err, rows, fields) {
    console.log(rows)
    res.send(rows);
  });
});

app.post('/groups', function (req, res, next) {
  console.log(req.body)
  var group_name = req.body.group_name;
  var description = req.body.description;
  var group = { group_name: group_name, description: description }
  mysql.pool.query('INSERT INTO Groups SET ?', group, function (err, rows, fields) {
    console.log(err)
    console.log(fields)
    console.log(rows)
    res.send(rows)
  })
});

app.get('/groupposts', function (req, res, next) {
  groupname = req.query.group;
  console.log("Group Name5: " + groupname)
  mysql.pool.query('SELECT * FROM Posts LEFT JOIN Groups ON Posts.group_id=Groups.group_id LEFT JOIN Users ON Users.user_id=Posts.user_id WHERE group_name = ?', [groupname], function (err, rows, fields) {
    //console.log(rows)
    res.send(rows);
  });
});

app.get('/searchgroups', function (req, res, next) {
  searchname = req.query.searchname;
  console.log(searchname)
  mysql.pool.query("SELECT * FROM Groups WHERE group_name LIKE '%" + searchname + "%'", function (err, rows, fields) {
    console.log(rows)
    res.send(rows);
  });
});

server.listen(7272, function () {
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





