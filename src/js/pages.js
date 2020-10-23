var pages = (function() {
  var createNotes = (function () {
    var create = function() {
      var form;
      var createNote = function() {
        var myNote = form.onSubmit();
        if (!myNote) {
          return;
        }
        myNotes.createNote(myNote)
          .then(() => ROUTER.load('/list'))
          .catch((e) => {
            console.error('createNote :: error :: ', e);
            components.modal.open({
              title: '¡Atención!',
              content: 'Ha ocurrido un error creando la nota',
              accept: ROUTER.load,
              paramAccept: '/list',
              cancel: false
            });
          });
      };
      var getTmpl = function() {
          form = components.noteForm();
          return form.getTmpl({}); 
      };
      return {
        getTmpl: getTmpl,
        load: function() {
          document.querySelector('.header-menu--create').classList.add('no-display');
          form.load();
          document.querySelector('.note-form-create .note-form-section--button-accept a')
            .addEventListener('click', e => {
              e.preventDefault();
              createNote();
            });
        }  
      }
    };
    var instance = create();
    return {
      getTmpl: instance.getTmpl,
      load: instance.load
    }
  }());  
    
    var editNotes = (function () {
      var edit = (function () {
        var form;
        var editNote = (function() {
          var myNote = form.onSubmit();
          if (!myNote) {
            return;
          }
          myNotes.editNote(myNote)
            .then(() => ROUTER.load('/list'))
            .catch(() => {
              console.error('editNote :: error :: ', e);
              components.modal.open({
                title: '¡Atención!',
                content: 'Ha ocurrido un error editando la nota',
                accept: ROUTER.load,
                paramAccept: '/list',
                cancel: false
              });
              return false;
            })
        });
        var getTmpl = (function(params){
            form = components.noteForm();
            return myNotes.getNote(params.id)
              .then(elem => form.getTmpl(elem))
              .catch((e) => {
                console.error('editNotes :: error :: ', e);
                components.modal.open({
                  title: '¡Atención!',
                  content: 'Ha ocurrido un error abriendo  la página',
                  accept: ROUTER.load,
                  paramAccept: '/list',
                  cancel: false
                });
                return false;
              });  
        });
        var load = function() {
          form.load();
          listener = document.querySelector('.note-form-edit .note-form-section--button-accept a')
            .addEventListener('click', function (event) {
              event.preventDefault();
              editNote();
            });
        }
        return {
          getTmpl,
          load,
          editNote  
        }
      });
      var instance = edit();
      return {
        getTmpl: instance.getTmpl,
        load: instance.load
      }
    }());
    
    var listNotes = (function () {
      var noteSectionTmpl = function(elem) {
       return `<section onClick="pages.listNotes.toggle(event, ${elem.id})" class="note-section note-section-hide-content ${elem.style ?  elem.style : 'classic'}" id="note_${elem.id}">
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
                  <a href="javascript:void(0)" onclick="event.stopPropagation();pages.listNotes.deleteNote(${elem.id})">
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
          return myNotes.getNotes()
            .then(resp => 
              `<div class="note-list">
                ${resp.reduce((total, currentValue) => total += noteSectionTmpl(currentValue), '')}
                </div>`
              )
            .catch(() => error.getTmpl())  
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
        toggle: function(event, id) {
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
    }());
    var error = (function () {
      return {
        getTmpl: function() {
          return `<section>Página no encontrada</section>`
        }
      }
    }());
    return {
      createNotes,
      editNotes,
      listNotes,
      error: error
    }
  })();
