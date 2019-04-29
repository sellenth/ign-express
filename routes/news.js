var express = require('express');
var request = require('request');
var helper  = require('../src/news_helper');
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
  request.get('https://ign-apis.herokuapp.com/content?count=5', function(err, resp, body) {
    if (!err && resp.statusCode == 200) {
      var json_content = helper.jsonfix(JSON.parse(body));
      var comments_url = helper.makeURL(json_content.ids);
      request.get(comments_url, function(err, resp, body) {
        if (!err && resp.statusCode == 200) {
          json_content = helper.add_comments(JSON.parse(body), json_content);
          res.render('news', { title: "News", data: json_content.data });
        }
      });
    }
  });
});

module.exports = router;
