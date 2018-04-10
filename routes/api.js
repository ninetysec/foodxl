var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/', function (req, res, next) {
  res.json({
    code: 200,
    msg: 'api'
  });
});

/**
 * 地址自动填充
 */
router.get('/getAdresse/:adresse', function (req, res, next) {
  var adresse = req.params.adresse;
  var url = 'https://api-adresse.data.gouv.fr/search/?q=' + adresse + '&city=paris&type=street';
  request.get(url, function (err, response, body) {
    res.json(JSON.parse(body));
  });
});

module.exports = router;
