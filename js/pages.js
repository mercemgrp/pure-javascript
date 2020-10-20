var pages = (function() {
    var createNotes = (function () {
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
      var titleComp = components.input(titleData);
      var contentComp = components.input(contentData);
      return {
        getTmpl: function() {
          return `<section class="create-note display-flex">
              <form id="createForm" name="createForm" class="display-flex">
                ${titleComp.getTmpl()}
                ${contentComp.getTmpl()}
                <div class="div-control display-flex-center">
                  <div class="div-control--button">
                    <ul>
                      <li><a onClick="pages.createNotes.createNote()">Crear</a></li>
                      <li><a onClick="pages.createNotes.cancel()">Cancelar</a></li>
                    </ul>
                  </div>
              </form>
            </section>`;
        },
        createNote: function(e) {
          try {
            let errorTitle = titleComp.checkError();
            let errorContent = contentComp.checkError();
              if (errorTitle || errorContent) {
                return;
              }
            const title = titleComp.getValue();
            const content = contentComp.getValue();
              let data = {
                  title,
                  content
              };
              myNotes.createNote(data)
              .then(() => ROUTER.load('/list'))
              .catch(() => {
                components.modal.open({
                  title: '¡Atención!',
                  content: 'Ha ocurrido un error editando la nota',
                  accept: ROUTER.load,
                  paramAccept: '/list',
                  cancel: false
                });
              });
          } catch(err) {
            components.modal.open({
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
    
    var viewNotes = (function () {
      return {
        getTmpl: function(params) {
          let notes = myNotes.getNotes();
              const elem = notes.find(elem => +elem.id === +params['id']);
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
                        <a href="javascript:void(0)" onclick="pages.viewNotes.deleteNote(${elem.id})">
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
            myNotes.deleteNote(id)
              .then(
                () => ROUTER.load('/list')
              )
              .catch(() => {
                components.modal.open({
                  title: '¡Atención!',
                  content: 'Ha ocurrido un error editando la nota',
                  accept: ROUTER.load,
                  paramAccept: '/list',
                  cancel: false
                });
            }

            );
        } catch(err) {
          components.modal.open({
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
    
    var editNotes = (function () {
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
      var titleComp = components.input(titleData);
      var contentComp = components.input(contentData);
    
      var reset = function() {
        titleComp.reset();
        contentComp.reset();
      }
      return {
        getTmpl: function(params) {
          return myNotes.getNote(params.id)
            .then(elem => {
              titleData.value = elem.title;
              contentData.value = elem.content;
              return `<section class="create-note display-flex-grow">
                <form id="editForm" name="editForm" class="display-flex-grow" onsubmit="pages.editNotes.editNote(editForm)">
                ${titleComp.getTmpl()}
                ${contentComp.getTmpl()}
                  <div class="div-control display-flex-center">
                    <div class="div-control--button display-flex">
                      <ul>
                        <li><a onClick="pages.editNotes.editNote()">Editar</a></li>
                        <li><a onClick="pages.editNotes.cancel()">Cancelar</a></li>
                      </ul>
                    </div>
                  </div>
                </form>
                <input class="hidden" id="note_id" value="${elem.id}"/>
              </section>`;
            })
            .catch(err => console.log('error :: ', err));  
        },
        editNote: function() {
          try {
            reset();
            let errorTitle = titleComp.checkError();
            let errorContent = contentComp.checkError();
              if (errorTitle || errorContent) {
                return;
              }
            const title = titleComp.getValue();
            const content = contentComp.getValue();
            if (!title || !content) {
              return;
            }
            const id = +document.querySelector('#note_id').value;
            const obj = {
                id,
                title,
                content
            };
            myNotes.editNote(obj)
            .then(() => ROUTER.load('/list'))
            .catch(() => {
              components.modal.open({
                title: '¡Atención!',
                content: 'Ha ocurrido un error editando la nota',
                accept: ROUTER.load,
                paramAccept: '/list',
                cancel: false
              });
            })
            
          } catch(err) {
            components.modal.open({
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
    
    var listNotes = (function () {
      var noteSectionTmpl = function(elem) {
       return `<section class="note-section note-section-hide-content" id="note_${elem.id}">
          <div class ="note-section-header">
            <div class="note-section-header--title">
              <a onClick="pages.listNotes.toggle(${elem.id})">${elem.title} </a>
            </div>
            <div class="note-section-header--additional">
              <ul class="note-section-header--menu">
                <li>
                  <a onClick="pages.listNotes.toggle(${elem.id})">
                      <i class="im im-eye"></i>
                  </a>
                </li>
                <li>
                  <a onClick="ROUTER.load('/edit/${elem.id}')">
                      <i class="im im-pencil"></i>
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)" onclick="pages.listNotes.deleteNote(${elem.id})">
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
          return myNotes.getNotes().then(resp => {
            let notes = resp;
            return  notes.reduce((total, currentValue) => total += noteSectionTmpl(currentValue), '');
          })
          .catch(err => console.log('error :: ', err));  ;   
        },
        deleteNote: function(id) {
          components.modal.open({
            title: '¡Atención!',
            content: '¿Desea borrar la nota seleccionada?',
            accept: this.deleteNoteConfirm,
            paramAccept: id
          });
        },
        deleteNoteConfirm: function(id) {
          try {
            myNotes.deleteNote(id).then(
              response => ROUTER.load('/list'),
              error => {
                components.modal.open({
                  title: '¡Atención!',
                  content: 'Ha ocurrido un error eliminando la nota'
                });
                ROUTER.load('/list');
              }
            );
            
          } catch(err) {
            components.modal.open({
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
    var error = (function () {
      return {
        getTmpl: function() {
          return `<section>Página no encontrada</section>`
        }
      }
    }());
    return {
      createNotes: createNotes,
      viewNotes: viewNotes,
      editNotes: editNotes,
      listNotes: listNotes,
      error: error
    }
  })();