(function(module){

  var aboutController = {};

  aboutController.index = function(){
    githubRepos.getRepos(githubRepos.compileHandlebars);
    $('section').hide();
    $('.github li').empty();
    $('.about').fadeIn('fast');
    $('.github').fadeIn('fast');
  };

  module.aboutController = aboutController;
})(window);
