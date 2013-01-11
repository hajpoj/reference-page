window.hf = {
  models: {},
  views: {},
  collections: {}
};

$(function() {
  var resources = [
    {
      name: "Backbone.js",
      main_url: "http://www.backbonejs.com",
      api_url: "http://www.backbonejs.com",
      code_url: "https://gist.github.com/723448ef3d7cf3ba3b0f",
      github_url: "https://github.com/documentcloud/backbone"
    },
    {
      name: "Underscore.js",
      main_url: "http://www.underscorejs.org",
      api_url: "http://www.underscorejs.org",
      code_url: "https://gist.github.com/4de2ec66ad46e4f521ef",
      github_url: "https://github.com/documentcloud/underscore"
    }
  ];

  hf.models.Resource = Backbone.Model.extend({});
  hf.collections.Resources = Backbone.Collection.extend();
  hf.views.Resource = Backbone.View.extend();


});
