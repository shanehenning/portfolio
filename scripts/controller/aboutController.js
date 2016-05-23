(function(module){

  var aboutController = {};

  aboutController.index = function(){
    $('section').hide();
    $('.about').fadeIn('fast');
  };

  module.aboutController = aboutController;
})(window);
