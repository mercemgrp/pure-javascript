 export class CreateNotePageComponent {
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
