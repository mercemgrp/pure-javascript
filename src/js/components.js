

  class InputComp {
    data;
    constructor(param) {
      this.data = param;
    }
    getTmpl() {
      const content = this.data.textarea ? `<div contenteditable="true" class="div-editable-content" id="${this.data.id}" name="${this.data.id}">${this.data.value ? this.data.value : ''}</div>`
                                    : `<input class="div-control--input--input" id="${this.data.id}" name="${this.data.id}" placeholder="${this.data.placeholder ? this.data.placeholder : ''}" ${this.data.required ? 'required' : ''} value="${this.data.value ? this.data.value : ''}"></input>`;
      return `<div class="div-control display-flex ${this.data.divClass || ''}">
      <label>${this.data.title}</label>
        <div class="div-control--input ${this.data.textarea ? 'div-editable' : ''}">
          ${content}
        </div>
        <div class="error hidden"><p>Campo obligatorio</p></div>
      </div>
      `
    }
    checkError() {
      if (!this.data.required) {
        return false;
      }
      const elem = document.querySelector(`#${this.data.id}`);
      let content = this.data.textarea ? elem.innerHTML.replaceAll('<br>', '').trim() : elem.value;
      if (!content) {
          elem.parentElement.parentElement.querySelector('.error').classList.remove('hidden');
          elem.parentElement.classList.add('div-control--error');
      }
      return content ? false : true;
    }
    getValue() {
      if (this.data.textarea) {
        return document.querySelector(`#${this.data.id}`).innerHTML;
      } else {
        return document.querySelector(`#${this.data.id}`).value;
      }
    }
    reset() {
      let titleErrorClasses = document.querySelector(`#${this.data.id}`)
      .parentElement.parentElement.querySelector('.error').classList;
      if (!titleErrorClasses.contains('hidden')) {
        titleErrorClasses.add('hidden');
      }
      let titleBorderClasses = document.querySelector(`#${this.data.id}`)
      .parentElement.classList;
      if (titleBorderClasses.contains('div-control--error')) {
        titleBorderClasses.remove('div-control--error');
      }
    }
  }
class NoteFormComp {
  myNote;
  titleComp;
  contentComp;
  constructor() {
    let titleData = {
      id: 'note_title',
      title: '',
      required: true,
    };
    let contentData = {
      id: 'note_content',
      title: '',
      required: true,
      textarea: true,
      divClass: 'note-form-section-content'
    } 
    this.titleComp = new InputComp(titleData);
    this.contentComp = new InputComp(contentData);
  }
  getTmpl(elem) {
    this.myNote = elem;
    this.titleComp.data.value = elem.title;
    this.contentComp.data.value = elem.content;
    return `<div class="note-form ${elem.id ? 'note-form-edit' : 'note-form-create'} ${elem.style ? elem.style : 'classic'}">
      <section class="note-form-section display-flex-grow ">
      <div class="display-flex edit-buttons">
        <ul class="display-flex-row">
          <li class="display-flex note-form-section--edit-color"><a class="note-form-section--edit-color--link">C</a></li>
        </ul>
      </div>
      <form id="noteForm" name="noteForm" class="display-flex-grow">
      ${this.titleComp.getTmpl()}
      ${this.contentComp.getTmpl()}

        <div class="note-form-section--button">
        <ul>
          <li class="note-form-section--button-accept">
            <a class="page-buttons-accept">
              <i class="im ${elem.id ? 'im-check-mark' : 'im-check-mark'}"></i>
            </a>
          </li>
        </ul>
      </div>
      </form>
    </section>
    </div>
    ${this.colorsModalTmpl()}`;
  }
  load() {
    const elem = document.querySelector('#note_content');
    const html = elem.innerHTML;
    document.querySelector('#note_content').innerHTML = '';
    Functions.resize();
    document.querySelector('#note_content').style.height = (elem.offsetHeight - 20) + 'px';
    document.querySelector('#note_content').innerHTML = html;
    document.querySelector('.note-form-section--edit-color--link')
      .addEventListener('click', e => {
        e.preventDefault();
        this.toggleColors();
      });
    document.querySelectorAll('.edit-buttons-colors-option--elem').forEach(item => {
      item.addEventListener('click', e => {
        e.preventDefault();
        this.selectColor(event.target.getAttribute('color'));
      });
    });
    document.querySelectorAll('.edit-buttons-colors-option--close').forEach(item => {
      item.addEventListener('click', e => {
        e.preventDefault();
        this.toggleColors();
      })
    });
  }
  toggleColors() {
    const elem = document.querySelector('.edit-buttons-colors-option');
    if (elem.classList.contains('no-display')) {
      elem.classList.remove('no-display');
      elem.classList.add('display-flex');
    } else {
      elem.classList.add('no-display');
      elem.classList.remove('display-flex');
    }
  }
  selectColor(color) {
    document.querySelector('.note-form').classList.remove(this.myNote.style ? this.myNote.style : 'classic');
    this.myNote.style = color;
    document.querySelector('.note-form').classList.add(this.myNote.style);
    this.toggleColors();
  }
  onSubmit() {
    this.reset();
    let errorTitle = this.titleComp.checkError();
    let errorContent = this.contentComp.checkError();
      if (errorTitle || errorContent) {
        return false;
      }
    const title = this.titleComp.getValue();
    const content = this.contentComp.getValue();
    if (!title || !content) {
      return;
    }
    this.myNote.title = title;
    this.myNote.content = content;
    return this.myNote;
  }
  cancel() {
    ROUTER.load('/list');
  }
    reset() {
    this.titleComp.reset();
    this.contentComp.reset();
  }
  colorsModalTmpl() {
    const colors = ['classic', 'light-blue', 'light-pink'];
    const resultListTmpl = colors.reduce((listTmpl, currentValue) => listTmpl +=
      `<a class="${currentValue} edit-buttons-colors-option--elem" color="${currentValue}">
      </a>`, ''
    );
    return `
      <div class="edit-buttons-colors-option no-display">
        <div class="edit-buttons-colors-option--close">Cancelar</div>
        <div class="edit-buttons-colors-option--list display-flex-row">
          ${resultListTmpl}  
        </div>
      </div>`;
  }
}  
class ModalComp {
  constructor() {
    var modalElem = document.createElement('div');
      modalElem.innerHTML = this.getTmpl();
      document.querySelector('#shared-content').appendChild(modalElem);
  }
  getTmpl() {
    return `<div class="modal no-display">
      <div class="modal-content">
        <div class="modal-header"><h1></h1></div>
        <div class="modal-body"><p></p></div>
        <div class="modal-footer">
          <ul class="button-list center-content">
            <li><a class="button-list--accept" onClick="modal.accept()">Aceptar</a></li>
            <li><a class="button-list--cancel" onClick="modal.cancel()">Cancelar</a></li>
          </ul>
        </div>
      </div>
    `
  }
    open(data)  {
      document.querySelector('.modal-header h1').innerHTML = data.title;
      document.querySelector('.modal-body p').innerHTML = data.content;
      if (data.accept) {
        document.querySelector('.modal .button-list--accept')
          .addEventListener('click', e => data.accept(data.paramAccept));
      }
      if (data.cancel === false) {
        document.querySelector('.modal .button-list--cancel').classList.add('no-display');
      } else {
        document.querySelector('.modal .button-list--cancel').classList.remove('no-display');
      }
      document.querySelector('.modal').classList.add('display');
      document.querySelector('.modal').classList.remove('no-display');
      
    }
    close() {
      document.querySelector('.modal').classList.remove('display');
      document.querySelector('.modal').classList.add('no-display');
    }
    cancel() {
      this.close();
    }
    accept() {
      this.close();
    }
}
class LoaderComp  {
  constructor() {
    let loaderElem = document.createElement('div');
    loaderElem.innerHTML = this.getTmpl();
    document.querySelector('#shared-content').appendChild(loaderElem);
  }
  getTmpl() {
    return `<div class="loader no-display">
    <div class="loader-content">
      <i class="im im-note-o"></i>
      </div>
    </div> `
  }
  open()  {
    document.querySelector('.loader').classList.add('display');
    document.querySelector('.loader').classList.remove('no-display');
  }
  close() {
    document.querySelector('.loader').classList.remove('display');
    document.querySelector('.loader').classList.add('no-display');
  }
}

var modal = new ModalComp();
var loader = new LoaderComp();