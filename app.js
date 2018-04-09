var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

/**
 * 数据库相关
 */
var mysql = require('mysql')
var myConnection  = require('express-myconnection')

var config = require('./conf/db.js');
var dbOptions = {
	host:	  config.mysql.host,
	user: 	  config.mysql.user,
	password: config.mysql.password,
	port: 	  config.mysql.port, 
	database: config.mysql.database
}
/**
 * 添加中间件
 */
app.use(myConnection(mysql, dbOptions, 'pool'))

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

// public files
app.use('/static', express.static(__dirname + '/public'));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

/**
 * 路由相关
 */
var index = require('./routes/index');
var api = require('./routes/api');
var admin = require('./routes/admin');

app.use('/', index);
app.use('/api', api);
app.use('/admin', admin);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
