'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InputComp = function () {
  function InputComp(param) {
    _classCallCheck(this, InputComp);

    this.data = param;
  }

  _createClass(InputComp, [{
    key: 'getTmpl',
    value: function getTmpl() {
      var content = this.data.textarea ? '<div contenteditable="true" class="div-editable-content" id="' + this.data.id + '" name="' + this.data.id + '">' + (this.data.value ? this.data.value : '') + '</div>' : '<input class="div-control--input--input" id="' + this.data.id + '" name="' + this.data.id + '" placeholder="' + (this.data.placeholder ? this.data.placeholder : '') + '" ' + (this.data.required ? 'required' : '') + ' value="' + (this.data.value ? this.data.value : '') + '"></input>';
      return '<div class="div-control display-flex ' + (this.data.divClass || '') + '">\n      <label>' + this.data.title + '</label>\n        <div class="div-control--input ' + (this.data.textarea ? 'div-editable' : '') + '">\n          ' + content + '\n        </div>\n        <div class="error hidden"><p>Campo obligatorio</p></div>\n      </div>\n      ';
    }
  }, {
    key: 'checkError',
    value: function checkError() {
      if (!this.data.required) {
        return false;
      }
      var elem = document.querySelector('#' + this.data.id);
      var content = this.data.textarea ? elem.innerHTML.replaceAll('<br>', '').trim() : elem.value;
      if (!content) {
        elem.parentElement.parentElement.querySelector('.error').classList.remove('hidden');
        elem.parentElement.classList.add('div-control--error');
      }
      return content ? false : true;
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      if (this.data.textarea) {
        return document.querySelector('#' + this.data.id).innerHTML;
      } else {
        return document.querySelector('#' + this.data.id).value;
      }
    }
  }, {
    key: 'reset',
    value: function reset() {
      var titleErrorClasses = document.querySelector('#' + this.data.id).parentElement.parentElement.querySelector('.error').classList;
      if (!titleErrorClasses.contains('hidden')) {
        titleErrorClasses.add('hidden');
      }
      var titleBorderClasses = document.querySelector('#' + this.data.id).parentElement.classList;
      if (titleBorderClasses.contains('div-control--error')) {
        titleBorderClasses.remove('div-control--error');
      }
    }
  }]);

  return InputComp;
}();

var NoteFormComp = function () {
  function NoteFormComp() {
    _classCallCheck(this, NoteFormComp);

    var titleData = {
      id: 'note_title',
      title: '',
      required: true
    };
    var contentData = {
      id: 'note_content',
      title: '',
      required: true,
      textarea: true,
      divClass: 'note-form-section-content'
    };
    this.titleComp = new InputComp(titleData);
    this.contentComp = new InputComp(contentData);
  }

  _createClass(NoteFormComp, [{
    key: 'getTmpl',
    value: function getTmpl(elem) {
      this.myNote = elem;
      this.titleComp.data.value = elem.title;
      this.contentComp.data.value = elem.content;
      return '<div class="note-form ' + (elem.id ? 'note-form-edit' : 'note-form-create') + ' ' + (elem.style ? elem.style : 'classic') + '">\n      <section class="note-form-section display-flex-grow ">\n      <div class="display-flex edit-buttons">\n        <ul class="display-flex-row">\n          <li class="display-flex note-form-section--edit-color"><a class="note-form-section--edit-color--link">C</a></li>\n        </ul>\n      </div>\n      <form id="noteForm" name="noteForm" class="display-flex-grow">\n      ' + this.titleComp.getTmpl() + '\n      ' + this.contentComp.getTmpl() + '\n\n        <div class="note-form-section--button">\n        <ul>\n          <li class="note-form-section--button-accept">\n            <a class="page-buttons-accept">\n              <i class="im ' + (elem.id ? 'im-check-mark' : 'im-check-mark') + '"></i>\n            </a>\n          </li>\n        </ul>\n      </div>\n      </form>\n    </section>\n    </div>\n    ' + this.colorsModalTmpl();
    }
  }, {
    key: 'load',
    value: function load() {
      var _this = this;

      var elem = document.querySelector('#note_content');
      var html = elem.innerHTML;
      document.querySelector('#note_content').innerHTML = '';
      Functions.resize();
      document.querySelector('#note_content').style.height = elem.offsetHeight - 20 + 'px';
      document.querySelector('#note_content').innerHTML = html;
      document.querySelector('.note-form-section--edit-color--link').addEventListener('click', function (e) {
        e.preventDefault();
        _this.toggleColors();
      });
      document.querySelectorAll('.edit-buttons-colors-option--elem').forEach(function (item) {
        item.addEventListener('click', function (e) {
          e.preventDefault();
          _this.selectColor(event.target.getAttribute('color'));
        });
      });
      document.querySelectorAll('.edit-buttons-colors-option--close').forEach(function (item) {
        item.addEventListener('click', function (e) {
          e.preventDefault();
          _this.toggleColors();
        });
      });
    }
  }, {
    key: 'toggleColors',
    value: function toggleColors() {
      var elem = document.querySelector('.edit-buttons-colors-option');
      if (elem.classList.contains('no-display')) {
        elem.classList.remove('no-display');
        elem.classList.add('display-flex');
      } else {
        elem.classList.add('no-display');
        elem.classList.remove('display-flex');
      }
    }
  }, {
    key: 'selectColor',
    value: function selectColor(color) {
      document.querySelector('.note-form').classList.remove(this.myNote.style ? this.myNote.style : 'classic');
      this.myNote.style = color;
      document.querySelector('.note-form').classList.add(this.myNote.style);
      this.toggleColors();
    }
  }, {
    key: 'onSubmit',
    value: function onSubmit() {
      this.reset();
      var errorTitle = this.titleComp.checkError();
      var errorContent = this.contentComp.checkError();
      if (errorTitle || errorContent) {
        return false;
      }
      var title = this.titleComp.getValue();
      var content = this.contentComp.getValue();
      if (!title || !content) {
        return;
      }
      this.myNote.title = title;
      this.myNote.content = content;
      return this.myNote;
    }
  }, {
    key: 'cancel',
    value: function cancel() {
      ROUTER.load('/list');
    }
  }, {
    key: 'reset',
    value: function reset() {
      this.titleComp.reset();
      this.contentComp.reset();
    }
  }, {
    key: 'colorsModalTmpl',
    value: function colorsModalTmpl() {
      var colors = ['classic', 'light-blue', 'light-pink'];
      var resultListTmpl = colors.reduce(function (listTmpl, currentValue) {
        return listTmpl += '<a class="' + currentValue + ' edit-buttons-colors-option--elem" color="' + currentValue + '">\n      </a>';
      }, '');
      return '\n      <div class="edit-buttons-colors-option no-display">\n        <div class="edit-buttons-colors-option--close">Cancelar</div>\n        <div class="edit-buttons-colors-option--list display-flex-row">\n          ' + resultListTmpl + '  \n        </div>\n      </div>';
    }
  }]);

  return NoteFormComp;
}();

var ModalComp = function () {
  function ModalComp() {
    _classCallCheck(this, ModalComp);

    var modalElem = document.createElement('div');
    modalElem.innerHTML = this.getTmpl();
    document.querySelector('#shared-content').appendChild(modalElem);
  }

  _createClass(ModalComp, [{
    key: 'getTmpl',
    value: function getTmpl() {
      return '<div class="modal no-display">\n      <div class="modal-content">\n        <div class="modal-header"><h1></h1></div>\n        <div class="modal-body"><p></p></div>\n        <div class="modal-footer">\n          <ul class="button-list center-content">\n            <li><a class="button-list--accept" onClick="modal.accept()">Aceptar</a></li>\n            <li><a class="button-list--cancel" onClick="modal.cancel()">Cancelar</a></li>\n          </ul>\n        </div>\n      </div>\n    ';
    }
  }, {
    key: 'open',
    value: function open(data) {
      document.querySelector('.modal-header h1').innerHTML = data.title;
      document.querySelector('.modal-body p').innerHTML = data.content;
      if (data.accept) {
        document.querySelector('.modal .button-list--accept').addEventListener('click', function (e) {
          return data.accept(data.paramAccept);
        });
      }
      if (data.cancel === false) {
        document.querySelector('.modal .button-list--cancel').classList.add('no-display');
      } else {
        document.querySelector('.modal .button-list--cancel').classList.remove('no-display');
      }
      document.querySelector('.modal').classList.add('display');
      document.querySelector('.modal').classList.remove('no-display');
    }
  }, {
    key: 'close',
    value: function close() {
      document.querySelector('.modal').classList.remove('display');
      document.querySelector('.modal').classList.add('no-display');
    }
  }, {
    key: 'cancel',
    value: function cancel() {
      this.close();
    }
  }, {
    key: 'accept',
    value: function accept() {
      this.close();
    }
  }]);

  return ModalComp;
}();

var LoaderComp = function () {
  function LoaderComp() {
    _classCallCheck(this, LoaderComp);

    var loaderElem = document.createElement('div');
    loaderElem.innerHTML = this.getTmpl();
    document.querySelector('#shared-content').appendChild(loaderElem);
  }

  _createClass(LoaderComp, [{
    key: 'getTmpl',
    value: function getTmpl() {
      return '<div class="loader no-display">\n    <div class="loader-content">\n      <i class="im im-note-o"></i>\n      </div>\n    </div> ';
    }
  }, {
    key: 'open',
    value: function open() {
      document.querySelector('.loader').classList.add('display');
      document.querySelector('.loader').classList.remove('no-display');
    }
  }, {
    key: 'close',
    value: function close() {
      document.querySelector('.loader').classList.remove('display');
      document.querySelector('.loader').classList.add('no-display');
    }
  }]);

  return LoaderComp;
}();

var modal = new ModalComp();
var loader = new LoaderComp();