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

  // **************************************************************************
  // Resource lists

  var javascriptResources = [
    {
      name: "Javascript",
      url: "https://developer.mozilla.org/en-US/docs/JavaScript",
      links: [
        {
          name: "ref",
          url: "https://developer.mozilla.org/en-US/docs/JavaScript/Reference"
        },
        {
          name: "string",
          url: "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String"
        },
        {
          name: "array",
          url: "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array"
        },
        {
          name: "date",
          url: "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date"
        }
      ]
    },
    {
      name: "JQuery",
      url: "http://jquery.com/",
      links: [
        {
          name: "api",
          url: "http://api.jquery.com/"
        },
        {
          name: "code",
          url: "https://github.com/jquery/jquery/tree/master/src"
        },
        {
          name: "github",
          url: "https://github.com/jquery/jquery"
        }
      ]
    },
    {
      name: "Twitter Bootstrap",
      url: "http://twitter.github.com/bootstrap/",
      links: [
        {
          name: "api",
          url: "http://twitter.github.com/bootstrap/javascript.html"
        },
        {
          name: "css",
          url: "https://github.com/twitter/bootstrap/blob/master/docs/assets/css/bootstrap.css"
        },
        {
          name: "js",
          url: "https://github.com/twitter/bootstrap/blob/master/docs/assets/js/bootstrap.js"
        },
        {
          name: "github",
          url: "https://github.com/twitter/bootstrap"
        }
      ]
    },
    {
      name: "Backbone.js",
      url: "http://www.backbonejs.com",
      links: [
      {
        name: "api",
        url: "http://www.backbonejs.com"
      },
        {
          name: "code",
          url: "https://github.com/documentcloud/backbone/blob/master/backbone.js"
        },
        {
          name: "github",
          url: "https://github.com/documentcloud/backbone"
        }
      ]
    },
    {
      name: "Underscore.js",
      url: "http://underscorejs.org",
      links: [
        {
          name: "api",
          url: "http://underscorejs.org"
        },
        {
          name: "code",
          url: "https://github.com/documentcloud/underscore/blob/master/underscore.js"
        },
        {
          name: "github",
          url: "https://github.com/documentcloud/underscore"
        }
      ]
    },
    {
      name: "Underscore.string.js",
      url: "http://epeli.github.com/underscore.string/",
      links: [
        {
          name: "api",
          url: "https://github.com/epeli/underscore.string#readme"
        },
        {
          name: "code",
          url: "https://github.com/epeli/underscore.string/blob/master/lib/underscore.string.js"
        },
        {
          name: "github",
          url: "https://github.com/epeli/underscore.string"
        }
      ]
    },
    {
      name: "Knockout.js",
      url: "http://knockoutjs.com/",
      links: [
        {
          name: "api",
          url: "http://knockoutjs.com/documentation/introduction.html"
        },
        {
          name: "code",
          url: "https://github.com/SteveSanderson/knockout/tree/master/src"
        },
        {
          name: "github",
          url: "https://github.com/SteveSanderson/knockout"
        }
      ]
    }
  ];

  var railsResources = [
    {
      name: "Ruby",
      url: "http://www.ruby-lang.org/en/",
      links: [
        {
          name: "core",
          url: "http://www.ruby-doc.org/core-1.9.3/"
        },
        {
          name: "std-lib",
          url: "http://www.ruby-doc.org/stdlib-1.9.3/"
        },
        {
          name: "toolbox",
          url: "https://www.ruby-toolbox.com/blog"
        },
        {
          name: "github",
          url: "https://github.com/ruby/ruby"
        }
      ]
    },
    {
      name: "Rails",
      url: "http://rubyonrails.org/",
      links: [
        {
          name: "api",
          url: "http://api.rubyonrails.org/"
        },
        {
          name: "guide",
          url: "http://guides.rubyonrails.org/"
        },
        {
          name: "railscasts",
          url: "http://railscasts.com/"
        },
        {
          name: "github",
          url: "https://github.com/rails/rails"
        }
      ]
    }
  ];

  /****************************************************************************
   * Code
   */

  hf.models.Resource = Backbone.Model.extend({
    defaults: {
      name: "",
      url: ""
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
      var javascriptTableView = new hf.views.ResourceTable({
        el: $('#javascript-resource'),
        resourceJSON: javascriptResources
      });
      var railsTableView = new hf.views.ResourceTable({
        el: $('#rails-resource'),
        resourceJSON: railsResources
      });
    }
  });

  var appView = new hf.views.Appview({
    el: $('body')
  });

  // Other code

  // set all a links to have a target of _blank
  $('a').each(function(index, element) {
    var $elm = $(element);
    if(typeof $elm.attr('target') === 'undefined') {
      $elm.attr('target', '_blank');
    }
  });

});
