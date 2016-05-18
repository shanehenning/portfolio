(function(module){

  Project.all = [];

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
      // console.log('localStorage');
    } else{
      $.getJSON('../data/projectData.json', function(data,status,xhr){
        // console.log(xhr.getResponseHeader('eTag'));
        Project.loadAll(data);
        localStorage.projectData = JSON.stringify(data);
        localStorage.headerDigest = xhr.getResponseHeader('eTag');
        // console.log(localStorage.headerDigest);
        // console.log('live-server');
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
        console.log(newHead);
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
