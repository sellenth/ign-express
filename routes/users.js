var express = require('express');
var request = require('request');
var router = express.Router();

function pluralFix(difference, root){
  return difference == 1 ? " " + root + " ago" : " " + root + "s ago";
}

function jsonfix(data) {
  contentIDs = []
  var cdate = new Date(Date.now());
  for (i = 0; i < data.count; i++){
    contentIDs.push(data.data[i].contentId);
    data.data[i].metadata.comments = 0;
    var pdate = new Date(data.data[i].metadata.publishDate);
    var post_age;
    var difference;
    if (cdate.getYear() != pdate.getYear()){
      difference = cdate.getYear() - pdate.getYear();
      post_age =  difference + pluralFix(difference, "year");
    }
    else if (cdate.getMonth() != pdate.getMonth()){
      difference = cdate.getMonth() - pdate.getMonth();
      post_age =  difference + pluralFix(difference, "month");
    }
    else if (cdate.getDate() != pdate.getDate()){
      difference = cdate.getDate() - pdate.getDate();
      post_age =  difference + pluralFix(difference, "day");
    }
    else if (cdate.getHours() != pdate.getHours()){
      difference = cdate.getHours() - pdate.getHours();
      post_age =  difference + pluralFix(difference, "hour");
    }
    else{
      difference = cdate.getMinutes() - pdate.getMinutes();
      post_age =  difference + pluralFix(difference, "minute");
    }
    data.data[i].metadata.post_age = post_age;
  }
  
  console.log(contentIDs);
  return data;
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  request.get('https://ign-apis.herokuapp.com/content?count=5', function(err, resp, body) {
    if (!err && resp.statusCode == 200) {
      var json = jsonfix(JSON.parse(body));
      res.render('index', { data: json.data });
    }
  });
  //    res.send('respond with a resource');
});

module.exports = router;
