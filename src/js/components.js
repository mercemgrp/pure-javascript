var components = (function() {
    var modal = (function () {
      var getTmpl =  function() {
        return `<div class="modal no-display">
          <div class="modal-content">
            <div class="modal-header"><h1></h1></div>
            <div class="modal-body"><p></p></div>
            <div class="modal-footer">
              <ul class="button-list center-content">
                <li><a class="button-list--accept" onClick="components.modal.accept()">Aceptar</a></li>
                <li><a class="button-list--cancel" onClick="components.modal.cancel()">Cancelar</a></li>
              </ul>
            </div>
          </div>
        `
      };
      return {
        open: function(data)  {
          if (document.getElementsByClassName('.modal').length === 0) {
            var modalElem = document.createElement('div');
            modalElem.innerHTML = getTmpl();
            document.querySelector('#content').appendChild(modalElem);
          }
          document.querySelector('.modal-header h1').innerHTML = data.title;
          document.querySelector('.modal-body p').innerHTML = data.content;
          if (data.accept) {
            document.querySelector('.modal .button-list--accept')
              .addEventListener('click', e => data.accept(data.paramAccept));
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
        }
      };
    }());
    var loader = (function () {
      var getTmpl =  function() {
        return `<div class="loader no-display">
        <div class="loader-content">
          <i class="im im-note-o"></i>
          </div>
        </div>
        `
      };
      return {
        open: function()  {
          if (document.getElementsByClassName('.loader').length === 0) {
            var loaderElem = document.createElement('div');
            loaderElem.innerHTML = getTmpl();
            document.querySelector('#content').appendChild(loaderElem);
          }
          document.querySelector('.loader').classList.add('display');
          document.querySelector('.loader').classList.remove('no-display');
          
        },
        close: function() {
          document.querySelector('.loader').classList.remove('display');
          document.querySelector('.loader').classList.add('no-display');
        }
      };
    }());
    var input = (function (data) {
      return {
        getTmpl: function() {
          const content = data.textarea ? `<div contenteditable="true" class="div-editable-content" id="${data.id}" name="${data.id}">${data.value ? data.value : ''}</div>`
                                        : `<input class="div-control--input--input" id="${data.id}" name="${data.id}" placeholder="${data.placeholder ? data.placeholder : ''}" ${data.required ? 'required' : ''} value="${data.value ? data.value : ''}"></input>`;
          return `<div class="div-control display-flex ${data.divClass || ''}">
          <label>${data.title}</label>
            <div class="div-control--input ${data.textarea ? 'div-editable' : ''}">
              ${content}
            </div>
            <div class="error hidden"><p>Campo obligatorio</p></div>
          </div>
          `
        },
        checkError: function() {
          if (!data.required) {
            return false;
          }
          const elem = document.querySelector(`#${data.id}`);
          let content = data.textarea ? elem.innerHTML.replaceAll('<br>', '').trim() : elem.value;
          if (!content) {
              elem.parentElement.parentElement.querySelector('.error').classList.remove('hidden');
              elem.parentElement.classList.add('div-control--error');
          }
          return content ? false : true;
        },
        getValue: function() {
          if (data.textarea) {
            return document.querySelector(`#${data.id}`).innerHTML;
          } else {
            return document.querySelector(`#${data.id}`).value;
          }
        },
        reset: function() {
          let titleErrorClasses = document.querySelector(`#${data.id}`)
          .parentElement.parentElement.querySelector('.error').classList;
          if (!titleErrorClasses.contains('hidden')) {
            titleErrorClasses.add('hidden');
          }
          let titleBorderClasses = document.querySelector(`#${data.id}`)
          .parentElement.classList;
          if (titleBorderClasses.contains('div-control--error')) {
            titleBorderClasses.remove('div-control--error');
          }
        }
      }
    });
    var noteForm = (function () {
      var titleData = {
        id: 'note_title',
        title: '',
        required: true,
      };
      var contentData = {
        id: 'note_content',
        title: '',
        required: true,
        textarea: true,
        divClass: 'note-form-section-content'
      } 
      var myNote;
      var titleComp = components.input(titleData);
      var contentComp = components.input(contentData);
    
      var reset = function() {
        titleComp.reset();
        contentComp.reset();
      }
      var colorsModalTmpl = function() {
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
      return {
        getTmpl: function(elem) {
          myNote = elem;
          titleData.value = elem.title;
          contentData.value = elem.content;
          return `<div class="note-form ${elem.id ? 'note-form-edit' : 'note-form-create'} ${elem.style ? elem.style : 'classic'}">
            <section class="note-form-section display-flex-grow ">
            <div class="display-flex edit-buttons">
              <ul class="display-flex-row">
                <li class="display-flex note-form-section--edit-color"><a class="note-form-section--edit-color--link">C</a></li>
              </ul>
            </div>
            <form id="noteForm" name="noteForm" class="display-flex-grow">
            ${titleComp.getTmpl()}
            ${contentComp.getTmpl()}

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
          ${colorsModalTmpl()}`;
        },
        load: function() {
          const elem = document.querySelector('#note_content');
          const html = elem.innerHTML;
          document.querySelector('#note_content').innerHTML = '';
          Functionss.resize();
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
        },
        toggleColors: function() {
          const elem = document.querySelector('.edit-buttons-colors-option');
          if (elem.classList.contains('no-display')) {
            elem.classList.remove('no-display');
            elem.classList.add('display-flex');
          } else {
            elem.classList.add('no-display');
            elem.classList.remove('display-flex');
          }
        },
        selectColor: function(color) {
          document.querySelector('.note-form').classList.remove(myNote.style ? myNote.style : 'classic');
          myNote.style = color;
          document.querySelector('.note-form').classList.add(myNote.style);
          this.toggleColors();
        },
        onSubmit: function() {
          reset();
          let errorTitle = titleComp.checkError();
          let errorContent = contentComp.checkError();
            if (errorTitle || errorContent) {
              return false;
            }
          const title = titleComp.getValue();
          const content = contentComp.getValue();
          if (!title || !content) {
            return;
          }
          myNote.title = title;
          myNote.content = content;
          return myNote;
        },
        cancel: function() {
          ROUTER.load('/list');
        }
      }
    });
    return {
      modal,
      input,
      loader,
      noteForm
    } 
  })();