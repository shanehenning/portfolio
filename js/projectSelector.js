var projectSelector = {};

projectSelector.populateFilter = function(){
  $('article').each(function(art){
    var $projectCategory = $('article').eq(art).attr('data-category');
    var optionValue = '<option value="' + $projectCategory + '">' + $projectCategory + '</option>';
    $('.select-option').append(optionValue);
  });
};

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
  $('.home p:nth-of-type(n+2)').hide();
  $('article').on('click', 'a', function(){
    $(this).parent().find('*').show();
    $(this).hide();
  });
  //stretch hide it again
};

projectSelector.oneTab = function(){
  $('.navi').on('click', 'a', function(e){
    $('section').hide();
    e.preventDefault();
    var link = $(this).attr('href');
    $('section').each(function(){
      if(link === $(this).attr('class')){
        $(this).show();
      }
    });
  });
  $('.navi a:first').click();
};

$(document).ready(function(){
  projectSelector.populateFilter();
  projectSelector.handleCategory();
  projectSelector.showMore();
  projectSelector.oneTab();
});
