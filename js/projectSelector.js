(function(module){

  var projectSelector = {};

  projectSelector.handleCategory = function(){
    $('.select-option').on('change', function(){
      var $projectsListed = $('article');
      var $selection = $(this).val();
      if($selection){
        $projectsListed.hide();
        $projectsListed.each(function(){
          if($(this).attr('data-category') === $selection){
            $(this).show();
          }
        });
      } else{
        $projectsListed.show();
      }
    });
  };

  projectSelector.showMore = function(){
    $('.home p:nth-of-type(n+3)').hide();
    $('article').on('click', 'a', function(){
      $(this).parent().find('*').show();
      $(this).hide();
    });
  };

  projectSelector.oneTab = function(){
    $('.navi').on('click', 'a', function(e){
      e.preventDefault();
      $('section').hide();
      var link = $(this).attr('href');
      $('section').each(function(){
        if(link === $(this).attr('class')){
          $(this).show();
        }
      });
    });
    $('.navi a:first').click();
  };

  projectSelector.printIndexPage = function(){
    Project.all.forEach(function(appendProject){
      $('.select-option').append(appendProject.populateCategory());
      $('.project-location').append(appendProject.printToPage());
    });
  };

  $(document).ready(function(){
    projectSelector.handleCategory();
    projectSelector.showMore();
    projectSelector.oneTab();
  });
  module.projectSelector = projectSelector;
})(window);
