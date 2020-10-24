'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EditNotePage = function () {
  function EditNotePage(params) {
    _classCallCheck(this, EditNotePage);

    this.params = params;
  }

  _createClass(EditNotePage, [{
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

  return EditNotePage;
}();

var NoteListPage = function () {
  function NoteListPage(params) {
    _classCallCheck(this, NoteListPage);

    this.params = params;
  }

  _createClass(NoteListPage, [{
    key: 'getTmpl',
    value: function getTmpl() {
      var _this3 = this;

      return myNotes.getNotes().then(function (resp) {
        return '<div class="note-list">\n          ' + resp.reduce(function (total, currentValue) {
          return total += _this3.noteSectionTmpl(currentValue);
        }, '') + '\n          </div>';
      }).catch(function (e) {
        console.error('NoteListPage :: error :: ', e);
        return new Error().getTmpl();
      });
    }
  }, {
    key: 'noteSectionTmpl',
    value: function noteSectionTmpl(elem) {
      return '<section onClick="MY_NOTES.currentPage.toggle(event, ' + elem.id + ')" class="note-section note-section-hide-content ' + (elem.style ? elem.style : 'classic') + '" id="note_' + elem.id + '">\n        <div class ="note-section-header">\n          <div class="note-section-header--title">\n            <a>' + elem.title + ' </a>\n          </div>\n          <div class="note-section-header--additional">\n            <ul class="note-section-header--menu">\n              <li>\n                <a onClick="event.stopPropagation();ROUTER.load(\'/edit/' + elem.id + '\')">\n                    <i class="im im-pencil"></i>\n                </a>\n              </li>\n              <li>\n                <a href="javascript:void(0)" onclick="event.stopPropagation();MY_NOTES.currentPage.deleteNote(' + elem.id + ')">\n                    <i class="im im-trash-can"></i>\n                </a>\n              </li>\n            </ul>\n            <div class="note-section-header--date">' + elem.date + '</div>\n          </div>\n        </div>   \n        <div class="note-section-content">' + elem.content + '</div>\n      </section>';
    }
  }, {
    key: 'deleteNote',
    value: function deleteNote(id) {
      modal.open({
        title: '¡Atención!',
        content: '¿Desea borrar la nota seleccionada?',
        accept: this.deleteNoteConfirm,
        paramAccept: id
      });
    }
  }, {
    key: 'deleteNoteConfirm',
    value: function deleteNoteConfirm(id) {
      try {
        myNotes.deleteNote(id).then(function (response) {
          return ROUTER.load('/list');
        }, function (error) {
          modal.open({
            title: '¡Atención!',
            content: 'Ha ocurrido un error eliminando la nota'
          });
          ROUTER.load('/list');
        });
      } catch (e) {
        console.error('NoteListPage :: error :: ', e);
        modal.open({
          title: '¡Atención!',
          content: 'Ha ocurrido un error eliminando la nota'
        });
      }
    }
  }, {
    key: 'toggle',
    value: function toggle(event, id) {
      if (event) {
        event.preventDefault();
      }
      var element = document.querySelector('#note_' + id);
      if (element.classList.contains('note-section-hide-content')) {
        element.classList.remove('note-section-hide-content');
      } else {
        element.classList.add('note-section-hide-content');
      }
    }
  }]);

  return NoteListPage;
}();

var Error = function () {
  function Error() {
    _classCallCheck(this, Error);
  }

  _createClass(Error, [{
    key: 'getTmpl',
    value: function getTmpl() {
      return '<section>P\xE1gina no encontrada</section>';
    }
  }]);

  return Error;
}();

var CreateNotePage = function () {
  function CreateNotePage() {
    _classCallCheck(this, CreateNotePage);

    this.params = {};
  }

  _createClass(CreateNotePage, [{
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
      var _this4 = this;

      document.querySelector('.header-menu--create').classList.add('no-display');
      this.form.load();
      document.querySelector('.note-form-create .note-form-section--button-accept a').addEventListener('click', function (e) {
        e.preventDefault();
        _this4.create();
      });
    }
  }]);

  return CreateNotePage;
}();