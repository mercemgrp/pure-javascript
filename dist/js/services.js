'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var ENV = {
  api: 'http://localhost:8888'
};
var serviceCalls = function () {
  var deleteD = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var myHeaders, response, resp;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              myHeaders = new Headers();
              _context.next = 3;
              return fetch(url, {
                method: 'DELETE',
                headers: myHeaders,
                credentials: 'omit'
              });

            case 3:
              response = _context.sent;
              _context.next = 6;
              return response.json();

            case 6:
              resp = _context.sent;

              if (!resp.error) {
                _context.next = 11;
                break;
              }

              throw 'error';

            case 11:
              return _context.abrupt('return', resp);

            case 12:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function deleteData() {
      return _ref.apply(this, arguments);
    }

    return deleteData;
  }();
  var put = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var myHeaders, response, resp;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              myHeaders = new Headers({
                'Content-type': 'application/json'
              });
              _context2.next = 3;
              return fetch(url, {
                method: 'PUT',
                headers: myHeaders,
                credentials: 'omit',
                body: JSON.stringify(data)
              });

            case 3:
              response = _context2.sent;
              _context2.next = 6;
              return response.json();

            case 6:
              resp = _context2.sent;

              if (!resp.error) {
                _context2.next = 11;
                break;
              }

              throw 'error';

            case 11:
              return _context2.abrupt('return', resp);

            case 12:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function putData() {
      return _ref2.apply(this, arguments);
    }

    return putData;
  }();
  var post = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var myHeaders, response, resp;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              myHeaders = new Headers({});
              _context3.next = 3;
              return fetch(url, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                headers: myHeaders,
                credentials: 'omit',
                body: JSON.stringify(data) // body data type must match "Content-Type" header
              });

            case 3:
              response = _context3.sent;
              _context3.next = 6;
              return response.json();

            case 6:
              resp = _context3.sent;

              if (!resp.error) {
                _context3.next = 11;
                break;
              }

              throw 'error';

            case 11:
              return _context3.abrupt('return', resp);

            case 12:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function postData() {
      return _ref3.apply(this, arguments);
    }

    return postData;
  }();
  var get = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var myHeaders, response, resp;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              myHeaders = new Headers();
              _context4.next = 3;
              return fetch(url, {
                method: 'GET',
                headers: myHeaders,
                credentials: 'omit'
              });

            case 3:
              response = _context4.sent;
              _context4.next = 6;
              return response.json();

            case 6:
              resp = _context4.sent;

              if (!resp.error) {
                _context4.next = 11;
                break;
              }

              throw 'error';

            case 11:
              return _context4.abrupt('return', resp);

            case 12:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function getData() {
      return _ref4.apply(this, arguments);
    }

    return getData;
  }();
  return {
    post: post,
    get: get,
    put: put,
    delete: deleteD
  };
}();
var myNotes = function () {
  var notes;
  return {
    getNote: function getNote(id) {
      loader.open();
      return serviceCalls.get(ENV.api + '/notes/' + id).then(function (response) {
        loader.close();
        return response;
      }).catch(function (e) {
        console.error('myNotes.getNote :: error :: ', e);
        loader.close();
        throw err;
      });
    },
    getNotes: function getNotes() {
      loader.open();
      return serviceCalls.get(ENV.api + '/notes').then(function (response) {
        loader.close();
        notes = response.data;
        return response.data;
      }).catch(function (e) {
        console.error('myNotes.getNotes :: error :: ', e);
        loader.close();
        throw err;
      });
    },
    deleteNote: function deleteNote(id) {
      loader.open();
      return serviceCalls.delete(ENV.api + '/notes/' + id).then(function (response) {
        loader.close();
        notes = response.data;
        return response.data;
      }).catch(function (e) {
        console.error('myNotes.deleteNote :: error :: ', e);
        loader.close();
        throw err;
      });
    },
    editNote: function editNote(data) {
      loader.open();
      return serviceCalls.post(ENV.api + '/notes/' + data.id, data).then(function (response) {
        loader.close();
        notes = response.data;
        return response.data;
      }).catch(function (e) {
        console.error('myNotes.editNote :: error :: ', e);
        loader.close();
        throw err;
      });
    },
    createNote: function createNote(data) {
      loader.open();
      return serviceCalls.put(ENV.api + '/notes', data).then(function (response) {
        loader.close();
        notes = response.data;
        return response.data;
      }).catch(function (err) {
        console.error('myNotes.createNote :: error :: ', e);
        loader.close();
        throw err;
      });
    }
  };
}();