var express = require('express');
var request = require('request');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  request.get('https://ign-apis.herokuapp.com/content?count=5', function(err, resp, body) {
    if (!err && resp.statusCode == 200) {
      var json = JSON.parse(body);
      res.render('index', { data: json.data });
    }
  });
  //    res.send('respond with a resource');
});

module.exports = router;
