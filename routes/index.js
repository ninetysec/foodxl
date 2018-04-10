var express = require('express');
var router = express.Router();

// 首页
router.get('/', function (req, res, next) {
  res.render('index');
});

// 产品详细
router.get('/goods', function (req, res, next) {
  res.render('goods');
});

// 分类列表
router.get('/category', function (req, res, next) {
  res.render('category');
});

// 购物车
router.get('/flow', function (req, res, next) {
  res.render('flow');
});

// 关于我
router.get('/about', function (req, res, next) {
  res.render('about');
});

module.exports = router;
