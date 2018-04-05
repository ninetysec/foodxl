var express = require('express');
var router = express.Router();

// 登陆页面
router.get('/', function (req, res, next) {
  res.render('admin/login');
});

// 登陆操作
router.post('/act_login', function (req, res, next) {
  /*
    此处写数据库查询代码，与session记录操作
   */
  res.redirect('/');
});

// 登陆操作
router.get('/act_logout', function (req, res, next) {
  /*
    此处写销毁session记录操作
   */
  res.redirect('/');
});

// 后台页面
router.get('/main', function (req, res, next) {
  res.redirect('/');
});

// 订单列表
router.get('/order', function (req, res, next) {
  res.render('admin/order');
});

// 订单详细
router.get('order_info', function (req, res, next) {
  res.render('admin/order_info');
});

// 产品列表
router.get('/goods', function (req, res, next) {
  res.render('admin/goods');
});

// 产品操作
router.get('/goods_info', function (req, res, next) {
  res.render('admin/goods_info');
});

// 评论列表
router.get('/comment', function (req, res, next) {
  res.render('admin/comment');
});

// 网站管理
router.get('/manage', function (req, res, next) {
  res.render('admin/manage');
});


module.exports = router;
