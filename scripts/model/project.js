(function(module){

  Project.all = [];

  function Project(details){
    for(key in details) this[key] = details[key];
  }

  Project.prototype.printToPage = function(){
    var $handlebarsSource = $('#new-project-template').html();
    var template = Handlebars.compile($handlebarsSource);
    return template(this);
  };

  Project.prototype.populateCategory = function(){
    var $handlebarsSource = $('#select-template').html();
    var template = Handlebars.compile($handlebarsSource);
    return template(this);
  };

  Project.loadAll = function(allProjects){
    allProjects.sort(function(a,b){
      return (new Date(b.projectDate) - (new Date(a.projectDate)));
    });

    Project.all = allProjects.map(function(proj){
      return new Project(proj);
    });
  };

  Project.fetchAll = function(){
    if (localStorage.projectData){
      Project.loadAll(JSON.parse(localStorage.projectData));
    } else{
      $.getJSON('../data/projectData.json', function(data,status,xhr){
        Project.loadAll(data);
        localStorage.projectData = JSON.stringify(data);
        localStorage.headerDigest = xhr.getResponseHeader('eTag');
      });
    }
    projectSelector.printIndexPage();
  };

  Project.fetchNew = function(){
    $.ajax({
      type: 'HEAD',
      url: '../data/projectData.json',
      success: function(data, status, xhr){
        var newHead = xhr.getResponseHeader('eTag');
        if (newHead != localStorage.headerDigest){
          localStorage.clear('headerDigest');
          localStorage.clear('projectData');
        }
      }
    });
    Project.fetchAll();
  };

  module.Project = Project;
})(window);
