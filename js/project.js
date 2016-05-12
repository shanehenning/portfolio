var projects = [];

function Project(details){
  for(key in details) this[key] = details[key];
}

Project.prototype.printToPage = function(){
  var $handlebarsSource = $('#new-project-template').html();
  var template = Handlebars.compile($handlebarsSource);
  // $('article').find('h5').html('Produced ' + (Math.round((new Date() - new Date(this.projectDate)) / 60 / 60 / 24 / 1000)) + ' days ago.');
  return template(this);
};

Project.prototype.populateCategory = function(){
  var $handlebarsSource = $('#select-template').html();
  var template = Handlebars.compile($handlebarsSource);
  return template(this);
};

allProjects.sort(function(a,b){
  return (new Date(b.projectDate) - (new Date(a.projectDate)));
});

allProjects.forEach(function(pushProject){
  projects.push(new Project(pushProject));
});

projects.forEach(function(appendProject){
  $('.select-option').append(appendProject.populateCategory());
});

projects.forEach(function(appendProject){
  $('.project-location').append(appendProject.printToPage());
});
