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


module.exports = router;
