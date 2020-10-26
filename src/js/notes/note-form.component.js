class NoteFormComponent {
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
        required: false,
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