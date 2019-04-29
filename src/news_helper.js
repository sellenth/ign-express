module.exports = {
  pluralFix: function (difference, root){
    return difference == 1 ? " " + root + " ago" : " " + root + "s ago";
  },

  jsonfix: function (data) {
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
        post_age =  difference + this.pluralFix(difference, "year");
      }
      else if (cdate.getMonth() != pdate.getMonth()){
        difference = cdate.getMonth() - pdate.getMonth();
        post_age =  difference + this.pluralFix(difference, "month");
      }
      else if (cdate.getDate() != pdate.getDate()){
        difference = cdate.getDate() - pdate.getDate();
        post_age =  difference + this.pluralFix(difference, "day");
      }
      else if (cdate.getHours() != pdate.getHours()){
        difference = cdate.getHours() - pdate.getHours();
        post_age =  difference + this.pluralFix(difference, "hr");
      }
      else{
        difference = cdate.getMinutes() - pdate.getMinutes();
        post_age =  difference + this.pluralFix(difference, "min");
      }
      data.data[i].metadata.post_age = post_age;
    }
    
    data.ids = contentIDs;
    return data;
  },

  add_comments: function (comments, content){
    for (var i = 0; i < comments.count; i++){
      console.log(comments.content[i].count);
      content.data[i].metadata.comments = comments.content[i].count;
    }
    return content;
  },

  makeURL: function (ids){
    var str = "";
    for (var i = 0; i < ids.length; i++){
      str+= ids[i] + ","
    }
    return 'https://ign-apis.herokuapp.com/comments?ids=' + str;
  }
}
