

var createNotesModule = (function () {
  var titleData = {
    id: 'note_title',
    title: 'Título',
    required: true
  };
  var contentData = {
    id: 'note_content',
    title: 'Contenido',
    required: true,
    textarea: true
  }
  return {
    getTmpl: function() {
      return `<section class="create-note">
          <form id="createForm" name="createForm">
            ${inputModule.getTmpl(titleData)}
            ${inputModule.getTmpl(contentData)}
            <div class="div-control">
              <div class="div-control--button center-content">
                <ul>
                  <li><a onClick="createNotesModule.createNote()">Crear</a></li>
                  <li><a onClick="createNotesModule.cancel()">Cancelar</a></li>
                </ul>
              </div>
          </form>
        </section>`;
    },
    createNote: function(e) {
      try {
        let errorTitle = inputModule.checkError(titleData);
        let errorContent = inputModule.checkError(contentData);
          if (errorTitle || errorContent) {
            return;
          }
        const title = inputModule.getValue(titleData);
        const content = inputModule.getValue(contentData);
          let data = {
              title,
              content
          };
          myNotes.createNote(data);
          ROUTER.load('/list');

      } catch(err) {
        modalModule.open({
          title: '¡Atención!',
          content: 'Ha ocurrido un error creando la nota',
          accept: ROUTER.load,
          paramAccept: '/list',
          cancel: false
        });
      }
    },
    cancel: function() {
      ROUTER.load('/list');
    }
  }
}());

var viewNotesModule = (function () {
  return {
    getTmpl: function(params) {
      let notes = myNotes.getNotes();
          const elem = notes.find(elem => elem.id === +params['id']);
          if(!elem) {
            throw new Error('error');
          }
            return `<section class="nota" id="nota_${elem.id}">
            <div class="nota-titulo">
                <div class="nota-titulo-text">${elem.title}</div>
                <ul class="nota-titulo-menu">
                    <li>
                    <a onClick="ROUTER.load('/edit/${elem.id}')">
                        <i class="im im-pencil"></i>
                    </a>
                    </li>
                    <li>
                    <a href="javascript:void(0)" onclick="viewNotesModule.deleteNote(${elem.id})">
                        <i class="im im-trash-can"></i>
                    </a>
                    </li>
                </ul>
                </div>
                <div class="nota-fecha">${elem.date}</div>
                <div class="nota-content">
                    ${elem.content}
                </div>
            </section>`;
    },
    deleteNote: function(id) {
      try {
        myNotes.deleteNote(id);
        ROUTER.load('/list');
    } catch(err) {
      modalModule.open({
        title: '¡Atención!',
        content: 'Ha ocurrido un error editando la nota',
        accept: ROUTER.load,
        paramAccept: '/list',
        cancel: false
      });
    }
    }
  }
}());

var editNotesModule = (function () {
  var titleData = {
    id: 'note_title',
    title: 'Título',
    required: true,
  };
  var contentData = {
    id: 'note_content',
    title: 'Contenido',
    required: true,
    textarea: true
  }
  var reset = function() {
    inputModule.reset(titleData);
    inputModule.reset(contentData);
  }
  return {
    getTmpl: function(params) {
      let notes = myNotes.getNotes();
      const elem = notes.find(elem => elem.id === +params['id']);
      if(!elem) {
        throw new Error('error');
      }
      titleData.value = elem.title;
      contentData.value = elem.content;
      return `<section class="create-note">
          <form id="editForm" name="editForm" onsubmit="editNotesModule.editNote(editForm)">
          ${inputModule.getTmpl(titleData)}
          ${inputModule.getTmpl(contentData)}

            <div class="div-control">
              <div class="div-control--button center-content">
                <ul>
                  <li><a onClick="editNotesModule.editNote()">Editar</a></li>
                  <li><a onClick="editNotesModule.cancel()">Cancelar</a></li>
                </ul>
              </div>
            </div>
          </form>
          <input class="hidden" id="note_id" value="${elem.id}"/>
        </section>`;
    },
    editNote: function() {
      try {
        reset();
        let errorTitle = inputModule.checkError(titleData);
        let errorContent = inputModule.checkError(contentData);
          if (errorTitle || errorContent) {
            return;
          }
        const title = inputModule.getValue(titleData);
        const content = inputModule.getValue(contentData);
        if (!title || !content) {
          return;
        }
        const id = document.querySelector('#note_id').value;
        const obj = {
            id,
            title,
            content
        };
        myNotes.editNote(obj);
        ROUTER.load('/list');
      } catch(err) {
        modalModule.open({
          title: '¡Atención!',
          content: 'Ha ocurrido un error editando la nota',
          accept: ROUTER.load,
          paramAccept: '/list',
          cancel: false
        });
      }
    },
    cancel: function() {
      ROUTER.load('/list');
    }
  }
}());

var listNotesModule = (function () {
  var noteSectionTmpl = function(elem) {
   return `<section class="note-section note-section-hide-content" id="note_${elem.id}">
      <div class ="note-section-header">
        <div class="note-section-header--title">
          <a onClick="listNotesModule.toggle(${elem.id})">${elem.title} </a>
        </div>
        <div class="note-section-header--additional">
          <ul class="note-section-header--menu">
            <li>
              <a onClick="listNotesModule.toggle(${elem.id})">
                  <i class="im im-eye"></i>
              </a>
            </li>
            <li>
              <a onClick="ROUTER.load('/edit/${elem.id}')">
                  <i class="im im-pencil"></i>
              </a>
            </li>
            <li>
              <a href="javascript:void(0)" onclick="listNotesModule.deleteNote(${elem.id})">
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
  return {
    getTmpl: function() {
      let notes = myNotes.getNotes();
      let template = '';
      for(let i=0; i< notes.length; i++) {
          template +=  noteSectionTmpl(notes[i])
      }
      return template;
    },
    deleteNote: function(id) {
      modalModule.open({
        title: '¡Atención!',
        content: '¿Desea borrar la nota seleccionada?',
        accept: this.deleteNoteConfirm,
        paramAccept: id
      });
    },
    deleteNoteConfirm: function(id) {
      try {
        myNotes.deleteNote(id);
        ROUTER.load('/list');
      } catch(err) {
        modalModule.open({
          title: '¡Atención!',
          content: 'Ha ocurrido un error eliminando la nota'
        });
      }
    },
    toggle: function(id) {
      let element = document.querySelector(`#note_${id}`);
      if (element.classList.contains('note-section-hide-content')) {
        element.classList.remove('note-section-hide-content');
      } else {
        element.classList.add('note-section-hide-content');
      }
    }
  }
}());

var errorModule = (function () {
  return {
    getTmpl: function() {
      return `<section>Página no encontrada</section>`
    }
  }
}());

var modalModule = (function () {
  return {
    open: function(data)  {
      if (document.getElementsByClassName('.modal').length === 0) {
        var modalElem = document.createElement('div');
        modalElem.innerHTML = this.getTmpl();
        document.querySelector('#content').appendChild(modalElem);
      }
      document.querySelector('.modal-header h1').innerHTML = data.title;
      document.querySelector('.modal-body p').innerHTML = data.content;
      if (data.accept) {
        document.querySelector('.modal .button-list--accept')
          .addEventListener('click', function(){
          data.accept(data.paramAccept);
      });
      if (data.cancel === false)
        document.querySelector('.modal .button-list--cancel').classList.add('no-display');
      } else {
        document.querySelector('.modal .button-list--cancel').classList.remove('no-display');
      }
      document.querySelector('.modal').classList.add('display');
      document.querySelector('.modal').classList.remove('no-display');
      
    },
    close: function() {
      document.querySelector('.modal').classList.remove('display');
      document.querySelector('.modal').classList.add('no-display');
    },
    cancel: function() {
      this.close();
    },
    accept: function() {
      this.close();
    },
    getTmpl: function() {
      return `<div class="modal no-display">
        <div class="modal-content">
          <div class="modal-header"><h1></h1></div>
          <div class="modal-body"><p></p></div>
          <div class="modal-footer">
            <ul class="button-list center-content">
              <li><a class="button-list--accept" onClick="modalModule.accept()">Aceptar</a></li>
              <li><a class="button-list--cancel" onClick="modalModule.cancel()">Cancelar</a></li>
            </ul>
          </div>
        </div>
      `
    }
  };
}());

var inputModule = (function () {
  return {
    getTmpl: function(data) {
      const content = data.textarea ? `<div contenteditable="true" class="div-editable" id="${data.id}" name="${data.id}">${data.value ? data.value : ''}</div>`
                                    : `<input class="div-control--input--input" id="${data.id}" name="${data.id}" placeholder="${data.placeholder ? data.placeholder : ''}" ${data.required ? 'required' : ''} value="${data.value ? data.value : ''}"></input>`;
      return `<div class="div-control">
      <label>${data.title}</label>
        <div class="div-control--input">
          ${content}
        </div>
        <div class="error no-display"><p>Campo obligatorio</p></div>
      </div>
      `
    },
    checkError: function(data) {
      if (!data.required) {
        return false;
      }
      const elem = document.querySelector(`#${data.id}`);
      let content = data.textarea ? elem.innerHTML.replaceAll('<br>', '').trim() : elem.value;
      if (!content) {
          elem.parentElement.parentElement.querySelector('.error').classList.remove('no-display');
          elem.parentElement.classList.add('div-control--error');
      }
      return content ? false : true;
    },
    getValue: function(data) {
      if (data.textarea) {
        return document.querySelector(`#${data.id}`).innerHTML;
      } else {
        return document.querySelector(`#${data.id}`).value;
      }
    },
    reset: function(data) {
      let titleErrorClasses = document.querySelector(`#${data.id}`)
      .parentElement.parentElement.querySelector('.error').classList;
      if (!titleErrorClasses.contains('no-display')) {
        titleErrorClasses.add('no-display');
      }
      let titleBorderClasses = document.querySelector(`#${data.id}`)
      .parentElement.classList;
      if (titleBorderClasses.contains('div-control--error')) {
        titleBorderClasses.remove('div-control--error');
      }
    }
  };
}());
