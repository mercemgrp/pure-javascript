'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CreateNotePageComponent = exports.CreateNotePageComponent = function () {
  function CreateNotePageComponent() {
    _classCallCheck(this, CreateNotePageComponent);

    this.params = {};
  }

  _createClass(CreateNotePageComponent, [{
    key: 'create',
    value: function create() {
      var myNote = this.form.onSubmit();
      if (!myNote) {
        return;
      }
      myNotes.createNote(myNote).then(function () {
        return ROUTER.load('/list');
      }).catch(function (e) {
        console.error('createNotePage :: error :: ', e);
        modal.open({
          title: '¡Atención!',
          content: 'Ha ocurrido un error creando la nota',
          accept: ROUTER.load,
          paramAccept: '/list',
          cancel: false
        });
      });
    }
  }, {
    key: 'getTmpl',
    value: function getTmpl() {
      this.form = new NoteFormComp();
      return this.form.getTmpl(this.params);
    }
  }, {
    key: 'load',
    value: function load() {
      var _this = this;

      document.querySelector('.header-menu--create').classList.add('no-display');
      this.form.load();
      document.querySelector('.note-form-create .note-form-section--button-accept a').addEventListener('click', function (e) {
        e.preventDefault();
        _this.create();
      });
    }
  }]);

  return CreateNotePageComponent;
}();