 class EditNotePageComponent {
  params;
  form;
  constructor(params) {
    this.params = params;
  }
  getTmpl = function() {
    this.form = new NoteFormComponent();
    return NotesServices.getNote(this.params.id)
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
  load = function() {
    this.form.load();
    document.querySelector('.note-form-edit .note-form-section--button-accept a')
      .addEventListener('click', (event) => {
        event.preventDefault();
        this.editNote();
      });
  }
  editNote = function() {
      var myNote = this.form.onSubmit();
      if (!myNote) {
        return;
      }
      NotesServices.editNote(myNote)
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
