var components = (function() {
    var modal = (function () {
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
                  <li><a class="button-list--accept" onClick="components.modal.accept()">Aceptar</a></li>
                  <li><a class="button-list--cancel" onClick="components.modal.cancel()">Cancelar</a></li>
                </ul>
              </div>
            </div>
          `
        }
      };
    }());
    var input = (function (data) {
      return {
        getTmpl: function() {
          const content = data.textarea ? `<div contenteditable="true" class="div-editable" id="${data.id}" name="${data.id}">${data.value ? data.value : ''}</div>`
                                        : `<input class="div-control--input--input" id="${data.id}" name="${data.id}" placeholder="${data.placeholder ? data.placeholder : ''}" ${data.required ? 'required' : ''} value="${data.value ? data.value : ''}"></input>`;
          return `<div class="div-control display-flex">
          <label>${data.title}</label>
            <div class="div-control--input">
              ${content}
            </div>
            <div class="error no-display"><p>Campo obligatorio</p></div>
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
              elem.parentElement.parentElement.querySelector('.error').classList.remove('no-display');
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
          if (!titleErrorClasses.contains('no-display')) {
            titleErrorClasses.add('no-display');
          }
          let titleBorderClasses = document.querySelector(`#${data.id}`)
          .parentElement.classList;
          if (titleBorderClasses.contains('div-control--error')) {
            titleBorderClasses.remove('div-control--error');
          }
        }
      }
    });
    return {
      modal,
      input
    }
  })();