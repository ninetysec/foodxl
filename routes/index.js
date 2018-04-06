var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.redirect('/admin');
});

/***********后台管理 等分离成另外路由***********/

//引入数据库包
var mysql = require('mysql');
var db = require("../conf/db");

// 使用db.js的配置信息创建一个MySQL连接池
var pool = mysql.createPool(db.mysql);

// 响应json数据
var responseJSON = function (res, ret) {
    if(typeof ret === 'undefined') {
        res.json( {
            code:'-200',
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};

// 登陆页面
router.get('/admin', function (req, res, next) {
  res.redirect('/admin/login');
});
router.get('/admin/login', function (req, res, next) {
  res.render('admin/login');
});

// 登陆操作
router.post('/admin/act_login', function (req, res, next) {
  /*
    此处写数据库查询代码，与session记录操作
    登陆查询代码不知道该咋写，下面这样是查不到的，你帮我检查一下啥问题
   */
    var username = req.body.username;
    var password = req.body.password;
    var sql = 'SELECT * FROM admin WHERE username = ? AND password = ?';
    pool.getConnection(function(err, connection) {
        var param = req.query || req.params;
        connection.query(sql, [param.username,param.password], function(err, result) {
            console.log(req.params);
            if(result == 1) {
                result = {
                    code: 200,
                    msg:'登陆成功'
                };
            }
            // 以json形式，把操作结果返回给前台页面
            responseJSON(res, result);
            // 释放连接
            connection.release();
        });
    });
});

// 登陆操作
router.get('/admin/act_logout', function (req, res, next) {
  /*
    此处写销毁session记录操作
   */
  res.redirect('/admin');
});

// 后台页面
router.get('/admin/main', function (req, res, next) {
    res.render('admin/main');
});

// 订单列表
router.get('/admin/order', function (req, res, next) {
  res.render('admin/order');
});

// 订单详细
router.get('/admin/order_info', function (req, res, next) {
  res.render('admin/order_info');
});

// 产品列表
router.get('/admin/goods', function (req, res, next) {
  res.render('admin/goods');
});

// 产品操作
router.get('/admin/goods_info', function (req, res, next) {
  res.render('admin/goods_info');
});

// 评论列表
router.get('/admin/comment', function (req, res, next) {
  res.render('admin/comment');
});

// 网站管理
router.get('/admin/manage', function (req, res, next) {
  res.render('admin/manage');
});

module.exports = router;
