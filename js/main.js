window.hf = {
  models: {},
  views: {},
  collections: {}
};

// Use mustache style templates.
// Now use {{ }} instead of <%= => for underscore templates
_.templateSettings = {
  //interpolate: /\{\{(.+?)\}\}/g
  evaluate: /\{\[([\s\S]+?)\]\}/g,
  interpolate: /\{\{([\s\S]+?)\}\}/g
};

$(function() {
  var resources = [
    {
      name: "Backbone.js",
      main_url: "http://www.backbonejs.com",
      api_url: "http://www.backbonejs.com",
      code_url: "https://gist.github.com/723448ef3d7cf3ba3b0f",
      github_url: "https://github.com/documentcloud/backbone"
    }
    , {
      name: "Underscore.js",
      main_url: "http://underscorejs.org",
      api_url: "http://underscorejs.org",
      code_url: "https://gist.github.com/4de2ec66ad46e4f521ef",
      github_url: "https://github.com/documentcloud/underscore"
    }
    , {
      name: "Underscore.string.js",
      main_url: "http://epeli.github.com/underscore.string/",
      api_url: "https://github.com/epeli/underscore.string#readme",
      code_url: "https://gist.github.com/29d89f78de3f52da3c5b",
      github_url: "https://github.com/epeli/underscore.string"
    }
    , {
      name: "JQuery",
      main_url: "http://jquery.com/",
      api_url: "http://api.jquery.com/",
      code_url: "https://github.com/jquery/jquery/tree/master/src",
      github_url: "https://github.com/jquery/jquery"
    }
    , {
      name: "Twitter Bootstrap",
      main_url: "http://twitter.github.com/bootstrap/",
      api_url: "http://twitter.github.com/bootstrap/javascript.html",
      code_url: "https://github.com/twitter/bootstrap/blob/master/docs/assets/js/bootstrap.js",
      github_url: "https://github.com/twitter/bootstrap"
    }
    , {
      name: "Javascript String",
      main_url: "http://www.impressivewebs.com/javascript-string-methods-reference/",
      api_url: "http://www.hunlock.com/blogs/The_Complete_Javascript_Strings_Reference",
      code_url: "",
      github_url: ""
    }
    , {
      name: "Javascript Array",
      main_url: "http://www.impressivewebs.com/javascript-array-methods-reference/",
      api_url: "http://www.hunlock.com/blogs/Mastering_Javascript_Arrays",
      code_url: "",
      github_url: ""
    }
//    , {
//      name: "",
//      main_url: "",
//      api_url: "",
//      code_url: "",
//      github_url: ""
//    }
  ];

  hf.models.Resource = Backbone.Model.extend({
    defaults: {
      name: "",
      main_url: "",
      api_url: "",
      code_url: "",
      github: ""
    }
  });

  hf.collections.Resources = Backbone.Collection.extend({
    model: hf.models.Resource
  });

  hf.views.Resource = Backbone.View.extend({
    initialize: function(options) {
      this.template = _.template(options.template.html());
    },

    render: function() {
      //remember the underscore templates take A JSON object NOT the model itself.s
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });

  hf.views.ResourceTable = Backbone.View.extend({

    initialize: function(options) {
      this.collection = new hf.collections.Resources(options.resourceJSON);
      this.render();
    },

    render: function() {
      var that = this;
      this.collection.each(function(model) {
        var resourceView = new hf.views.Resource({
          template: $('#resourceTemplate'),
          model: model,
          tagName: 'tr'
        });
        that.$el.append(resourceView.render().el);
      });
    }
  });

  hf.views.Appview = Backbone.View.extend({
    initialize: function() {
      var resourceTableView = new hf.views.ResourceTable({
        el: $('#resourceTable'),
        resourceJSON: resources
      });
    }
  });

  var appView = new hf.views.Appview({
    el: $('body')
  });

});
