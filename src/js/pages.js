class EditNotePage {
  params;
  form;
  constructor(params) {
    this.params = params;
  }
  getTmpl(){
    this.form = new NoteFormComp();
    return myNotes.getNote(this.params.id)
      .then(elem => {
        return this.form.getTmpl(elem);
      })
      .catch((e) => {
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
  load() {
    this.form.load();
    document.querySelector('.note-form-edit .note-form-section--button-accept a')
      .addEventListener('click', (event) => {
        event.preventDefault();
        this.editNote();
      });
  }
  editNote() {
      var myNote = this.form.onSubmit();
      if (!myNote) {
        return;
      }
      myNotes.editNote(myNote)
        .then(() => ROUTER.load('/list'))
        .catch((e) => {
          console.error('editNote :: error :: ', e);
          modal.open({
            title: '¡Atención!',
            content: 'Ha ocurrido un error editando la nota',
            accept: ROUTER.load,
            paramAccept: '/list',
            cancel: false
          });
          return false;
        })
  }
}

class NoteListPage {
  params;
  constructor(params) {
    this.params = params;
  }
  getTmpl() {
    return myNotes.getNotes()
      .then(resp => 
        `<div class="note-list">
          ${resp.reduce((total, currentValue) => total += this.noteSectionTmpl(currentValue), '')}
          </div>`
        )
      .catch((e) => {
        console.error('NoteListPage :: error :: ', e);
        return new Error().getTmpl();
      })  
  }
  noteSectionTmpl(elem) {
    return `<section onClick="MY_NOTES.currentPage.toggle(event, ${elem.id})" class="note-section note-section-hide-content ${elem.style ?  elem.style : 'classic'}" id="note_${elem.id}">
        <div class ="note-section-header">
          <div class="note-section-header--title">
            <a>${elem.title} </a>
          </div>
          <div class="note-section-header--additional">
            <ul class="note-section-header--menu">
              <li>
                <a onClick="event.stopPropagation();ROUTER.load('/edit/${elem.id}')">
                    <i class="im im-pencil"></i>
                </a>
              </li>
              <li>
                <a href="javascript:void(0)" onclick="event.stopPropagation();MY_NOTES.currentPage.deleteNote(${elem.id})">
                    <i class="im im-trash-can"></i>
                </a>
              </li>
            </ul>
            <div class="note-section-header--date">${elem.date}</div>
          </div>
        </div>   
        <div class="note-section-content">${elem.content}</div>
      </section>`;
  }
  deleteNote(id) {
    modal.open({
      title: '¡Atención!',
      content: '¿Desea borrar la nota seleccionada?',
      accept: this.deleteNoteConfirm,
      paramAccept: id
    });
  }
  deleteNoteConfirm(id) {
    try {
      myNotes.deleteNote(id).then(
        response => ROUTER.load('/list'),
        error => {
          modal.open({
            title: '¡Atención!',
            content: 'Ha ocurrido un error eliminando la nota'
          });
          ROUTER.load('/list');
        }
      );
      
    } catch(e) {
      console.error('NoteListPage :: error :: ', e);
      modal.open({
        title: '¡Atención!',
        content: 'Ha ocurrido un error eliminando la nota'
      });
    }
  }
  toggle(event, id) {
    if (event) {
      event.preventDefault();
    }
    let element = document.querySelector(`#note_${id}`);
    if (element.classList.contains('note-section-hide-content')) {
      element.classList.remove('note-section-hide-content');
    } else {
      element.classList.add('note-section-hide-content');
    }
  }
}
class Error {
  constructor() {

  }
  getTmpl() {
    return `<section>Página no encontrada</section>`
  }
}
  
class CreateNotePage {
  params = {};
  form;
  constructor() {
  }
  create() {
      var myNote = this.form.onSubmit();
      if (!myNote) {
        return;
      }
      myNotes.createNote(myNote)
        .then(() => ROUTER.load('/list'))
        .catch((e) => {
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
  getTmpl() {
    this.form = new NoteFormComp();
    return this.form.getTmpl(this.params); 
  }
  load() {
    document.querySelector('.header-menu--create').classList.add('no-display');
    this.form.load();
    document.querySelector('.note-form-create .note-form-section--button-accept a')
    .addEventListener('click', e => {
      e.preventDefault();
      this.create();
    });
  }  
} 