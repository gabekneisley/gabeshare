require.config({
  paths: {
    "jquery": "lib/jquery",
    "backbone": "lib/backbone",
    "underscore": "lib/underscore",
    "moment": "lib/moment",
    "hogan": "lib/hogan",
    "expanding": "lib/expanding"
  },
  shim: {
    "backbone": {
      "deps": ["underscore", "jquery"],
      "exports": "Backbone"
    },
    "underscore": {
      "exports": "_"
    }
  }
});