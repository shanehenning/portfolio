//Hamburger Menu Animation
var container = document.getElementById('container');
var menu = document.getElementById('menu');
menu.addEventListener('click', move);

function move(){
  container.className += 'move';
  menu.removeEventListener('click', move);
  menu.addEventListener('click', remove);
}

function remove(){
  menu.removeEventListener('click', remove);
  menu.addEventListener('click', move);
  container.className = '';
}

//----------------------------------------------------------------------------
var projects = [];

function Project(details){
  this.projectName = details.projectName;
  this.projectDate = details.projectDate;
  this.image = details.image;
  this.link = details.link;
  this.category = details.category;
  this.description = details.description;

  // for(key in details) this[key] = details[key];
}

Project.prototype.printToPage = function(){
  var $newProject = $('article.project-template').clone();
  $newProject.find('h2').html(this.projectName);
  $newProject.find('h2 > a').attr('href', this.link);
  $newProject.find('h5').html(this.projectDate);
  $newProject.find('img').attr('src', this.image);
  $newProject.attr('data-category', this.category);
  $newProject.find('a:first').text(this.link).attr('href', this.link);
  $newProject.find('p').html(this.description);

  $newProject.find('h5').html('Produced ' + (Math.round((new Date() - new Date(this.projectDate)) / 60 / 60 / 24 / 1000)) + ' days ago.');

  $newProject.removeClass('project-template');
  return $newProject;
};


allProjects.sort(function(a,b){
  return (new Date(b.projectDate) - (new Date(a.projectDate)));
});

allProjects.forEach(function(pushProject){
  projects.push(new Project(pushProject));
});

projects.forEach(function(appendProject){
  $('.home').append(appendProject.printToPage());
});

(function removeTemplate(){
  $('article.project-template').remove();
})();
