(function(module){
  var githubRepos = {};

  githubRepos.all = [];

  githubRepos.getRepos = function(callback){
    $.ajax({
      url: 'https://api.github.com/users/shanehenning/repos' +
      '?sort=updated',
      type: 'GET',
      headers: {'Authorization': 'token ' + githubToken},
      success: function(data,message,xhr){
        githubRepos.all = data;
        callback();
      }
    });
  };

  githubRepos.with = function(attr){
    return githubRepos.all.filter(function(repo){
      return !repo[attr];
    });
  };

  var githubHandlebars = Handlebars.compile($('#github-template').text());
  var dateFormats = {
    realDate: 'MMMM DD, YYYY'
  };

  Handlebars.registerHelper('formatDate', function(dateTime, format){
    if (moment) {
      format = dateFormats[format] || format;
      return moment(dateTime).format(format);
    } else {
      return dateTime;
    }
  });

  githubRepos.compileHandlebars = function(){
    $('.github').append(githubRepos.with('fork').map(githubHandlebars));
  };

  module.githubRepos = githubRepos;
})(window);
