'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EditNotePageComponent = exports.EditNotePageComponent = function () {
  function EditNotePageComponent(params) {
    _classCallCheck(this, EditNotePageComponent);

    this.params = params;
  }

  _createClass(EditNotePageComponent, [{
    key: 'getTmpl',
    value: function getTmpl() {
      var _this = this;

      this.form = new NoteFormComp();
      return myNotes.getNote(this.params.id).then(function (elem) {
        return _this.form.getTmpl(elem);
      }).catch(function (e) {
        console.error('editNotes :: error :: ', e);
        modal.open({
          title: '¡Atención!',
          content: 'Ha ocurrido un error abriendo  la página',
          accept: ROUTER.load,
          paramAccept: '/list',
          cancel: false
        });
        return false;
      });
    }
  }, {
    key: 'load',
    value: function load() {
      var _this2 = this;

      this.form.load();
      document.querySelector('.note-form-edit .note-form-section--button-accept a').addEventListener('click', function (event) {
        event.preventDefault();
        _this2.editNote();
      });
    }
  }, {
    key: 'editNote',
    value: function editNote() {
      var myNote = this.form.onSubmit();
      if (!myNote) {
        return;
      }
      myNotes.editNote(myNote).then(function () {
        return ROUTER.load('/list');
      }).catch(function (e) {
        console.error('editNote :: error :: ', e);
        modal.open({
          title: '¡Atención!',
          content: 'Ha ocurrido un error editando la nota',
          accept: ROUTER.load,
          paramAccept: '/list',
          cancel: false
        });
        return false;
      });
    }
  }]);

  return EditNotePageComponent;
}();