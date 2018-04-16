var express = require('express');
var router = express.Router();

/***********后台管理***********/

// 登陆页面
router.get('/', function (req, res, next) {
  res.redirect('/admin/login');
});
router.get('/login', function (req, res, next) {
  res.render('admin/login');
});

// 登陆操作
router.post('/act_login', function (req, res, next) {
  /*
    此处写数据库查询代码，与session记录操作
  */
  var username = req.body.username;
  var password = req.body.password;
  var sql = 'SELECT * FROM admin WHERE username = ? AND password = ?';

  req.getConnection(function (error, conn) {
    if (error) throw error;
    conn.query(sql, [username, password], function (err, result) {
      if (err) throw error;
      if (result.length > 0) {
        res.redirect('/admin/main');
      } else {
        res.json({
          code: '-200',
          msg: '操作失败'
        });
      }
    });
  });
});

// 登陆操作
router.get('/act_logout', function (req, res, next) {
  /*
    此处写销毁session记录操作
   */
  res.redirect('');
});

// 后台页面
router.get('/main', function (req, res, next) {
  res.render('admin/main');
});

// 订单列表
router.get('/order', function (req, res, next) {
  res.render('admin/order');
});

// 订单详细
router.get('/order_info', function (req, res, next) {
  res.render('admin/order_info');
});

// 产品列表
router.get('/goods', function (req, res, next) {
  if (req.query.id) {
    var goods_id = req.query.id;
    var sql = 'SELECT * FROM goods';
    req.getConnection(function (error, conn) {
      if (error) throw error;
      conn.query(sql, [goods_id], function (err, result) {
        if (!err) {
          res.json(result);
        }
      });
    });
  } else {
    res.render('admin/goods_info');
  }
});

// 产品详细
router.get('/goods_info', function (req, res, next) {
  if (req.query.id) {
    var goods_id = req.query.id;
    var sql = 'SELECT * FROM goods WHERE goods_id = ?';
    req.getConnection(function (error, conn) {
      if (error) throw error;
      conn.query(sql, [goods_id], function (err, result) {
        if (!err) {
          // console.log(result[0].goods_name);
          res.render('admin/goods_info', {
            goods_id: result[0].goods_id,
            goods_name: result[0].goods_name,
            goods_desc: result[0].goods_desc,
            goods_price: result[0].goods_price,
            cat_id: result[0].cat_id
          });
        }
      });
    });
  } else {
    res.render('admin/goods_info');
  }
});

// 产品操作
router.post('/goods_save', function (req, res, next) {
  var goods_id = req.body.goods_id;
  var goods_name = req.body.goods_name;
  var goods_desc = req.body.goods_desc;
  var cat_id = req.body.cat_id;
  var goods_price = req.body.goods_price;
  // var image = req.body.image;
  // 判断是否有产品ID，有更新，无插入
  if (goods_id == 0) {
    var sql = 'INSERT INTO goods(goods_id, goods_name, goods_desc, cat_id, goods_price) VALUES(?, ?, ?, ?, ?);';
    req.getConnection(function (error, conn) {
      if (error) throw error;
      conn.query(sql, [goods_id, goods_name, goods_desc, cat_id, goods_price], function (err, result) {
        if (!err) {
          res.json({
            code: '200',
            msg: '保存成功'
          });
        } else {
          res.json({
            code: '-200',
            msg: '保存失败'
          });
        }
      });
    });
  } else {
    var sql = 'UPDATE goods SET goods_name = ?, goods_desc =?, cat_id = ?, goods_price = ? WHERE goods_id = ?';
    req.getConnection(function (error, conn) {
      if (error) throw error;
      conn.query(sql, [goods_name, goods_desc, cat_id, goods_price, goods_id], function (err, result) {
        if (!err) {
          res.json({
            code: '200',
            msg: '修改成功'
          });
        } else {
          res.json({
            code: '200',
            msg: '修改失败'
          });
        }
      });
    });
  }
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
