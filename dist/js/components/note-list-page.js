'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NoteListPageComponent = exports.NoteListPageComponent = function () {
  function NoteListPageComponent(params) {
    _classCallCheck(this, NoteListPageComponent);

    this.params = params;
  }

  _createClass(NoteListPageComponent, [{
    key: 'getTmpl',
    value: function getTmpl() {
      var _this = this;

      return myNotes.getNotes().then(function (resp) {
        return '<div class="note-list">\n          ' + resp.reduce(function (total, currentValue) {
          return total += _this.noteSectionTmpl(currentValue);
        }, '') + '\n          </div>';
      }).catch(function (e) {
        console.error('NoteListPage :: error :: ', e);
        return new Error().getTmpl();
      });
    }
  }, {
    key: 'noteSectionTmpl',
    value: function noteSectionTmpl(elem) {
      return '<section onClick="ROUTER.currentPage.toggle(event, ' + elem.id + ')" class="note-section note-section-hide-content ' + (elem.style ? elem.style : 'classic') + '" id="note_' + elem.id + '">\n        <div class ="note-section-header">\n          <div class="note-section-header--title">\n            <a>' + elem.title + ' </a>\n          </div>\n          <div class="note-section-header--additional">\n            <ul class="note-section-header--menu">\n              <li>\n                <a onClick="event.stopPropagation();ROUTER.load(\'/edit/' + elem.id + '\')">\n                    <i class="im im-pencil"></i>\n                </a>\n              </li>\n              <li>\n                <a href="javascript:void(0)" onclick="event.stopPropagation();ROUTER.currentPage.deleteNote(' + elem.id + ')">\n                    <i class="im im-trash-can"></i>\n                </a>\n              </li>\n            </ul>\n            <div class="note-section-header--date">' + elem.date + '</div>\n          </div>\n        </div>   \n        <div class="note-section-content">' + elem.content + '</div>\n      </section>';
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

  return NoteListPageComponent;
}();