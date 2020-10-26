
class NoteListPageComponent {
  params;
  constructor(params) {
    this.params = params;
  }
  getTmpl() {
    return NotesServices.getNotes()
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
    return `<section onClick="ROUTER.currentPage.toggle(event, ${elem.id})" class="note-section note-section-hide-content ${elem.style ?  elem.style : 'classic'}" id="note_${elem.id}">
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
                <a href="javascript:void(0)" onclick="event.stopPropagation();ROUTER.currentPage.deleteNote(${elem.id})">
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
      NotesServices.deleteNote(id).then(
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
