'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createNotePage = require('./create-note-page');

Object.keys(_createNotePage).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _createNotePage[key];
    }
  });
});

var _editNotePage = require('./edit-note-page');

Object.keys(_editNotePage).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _editNotePage[key];
    }
  });
});

var _errorPage = require('./error-page');

Object.keys(_errorPage).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _errorPage[key];
    }
  });
});

var _noteListPage = require('./note-list-page');

Object.keys(_noteListPage).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _noteListPage[key];
    }
  });
});