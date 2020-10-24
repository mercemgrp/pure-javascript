"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Router = function () {
  function Router(paths) {
    _classCallCheck(this, Router);

    this.paths = paths;
    this.initRouter();
  }

  _createClass(Router, [{
    key: "initRouter",
    value: function initRouter() {
      var _window = window,
          _window$location$hash = _window.location.hash,
          hash = _window$location$hash === undefined ? "/" : _window$location$hash;

      var URI = !hash || hash === "/" ? "#/list" : hash;
      URI = URI.indexOf('#') === 0 ? URI.substring(1) : hash;
      this.load(URI);
    }
  }, {
    key: "load",
    value: function load() {
      var _this = this;

      var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "/list";

      var component = this.paths[page];
      var params = {};
      if (!component) {
        Object.keys(this.paths).forEach(function (key) {
          var pathWithoutParams = _this.getPathWithoutPathParams(key) || false;
          if (page.indexOf(pathWithoutParams) !== -1) {
            params = _this.getPathParams(key, page);
            component = _this.paths[key];
          }
        });
      }
      if (component) {
        try {
          MY_NOTES.currentPage = new component(params);
          var templateRendered = MY_NOTES.currentPage.getTmpl();
          if ((typeof templateRendered === "undefined" ? "undefined" : _typeof(templateRendered)) === 'object') {
            templateRendered.then(function (resp) {
              Functions.render(resp, document.querySelector("#content"));
              if (MY_NOTES.currentPage.load) {
                MY_NOTES.currentPage.load();
              }
              window.history.pushState({}, "", '/#' + page);
            });
          } else {
            Functions.render(templateRendered, document.querySelector("#content"));
            if (MY_NOTES.currentPage.load) {
              MY_NOTES.currentPage.load();
            }
            window.history.pushState({}, "", '/#' + page);
          }
        } catch (e) {
          console.error('routes.js :: error :: ', e);
          Functions.render(new Error().getTmpl, document.querySelector('#content'));
          window.history.pushState({}, "", '/#/error');
        }
      } else {
        Functions.render(new Error().getTmpl, document.querySelector('#content'));
        window.history.pushState({}, "", '/#/error');
        window.history.pushState({}, "", '/#');
      }
    }
  }, {
    key: "getPathWithoutPathParams",
    value: function getPathWithoutPathParams(str) {
      var index = str.indexOf('{{');
      return str.substring(0, index);
    }
  }, {
    key: "getPathParams",
    value: function getPathParams(varPath, path) {
      var varPathSplit = varPath.split('/');
      var pathSplit = path.split('/');
      var paramObj = {};
      for (var i = 0; i < varPathSplit.length; i++) {
        var variable = varPathSplit[i];
        if (variable && variable.indexOf("{{") !== -1) {
          paramObj[variable.substring(2, variable.length - 2)] = pathSplit[i];
        }
      }
      return paramObj;
    }
  }]);

  return Router;
}();