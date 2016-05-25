(function(module){

  var projectController = {};

  projectController.index = function(){
    Project.fetchNew();
    $('section').hide();
    $('.home').fadeIn('fast');
  };

  module.projectController = projectController;
})(window);
