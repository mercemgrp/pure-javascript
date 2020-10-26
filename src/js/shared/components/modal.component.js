class ModalComp {
    constructor() {
      var modalElem = document.createElement('div');
        modalElem.innerHTML = this.getTmpl();
        document.querySelector('#shared-content').appendChild(modalElem);
    }
    getTmpl() {
      return `<div class="modal no-display">
        <div class="modal-content">
          <div class="modal-header"><h1></h1></div>
          <div class="modal-body"><p></p></div>
          <div class="modal-footer">
            <ul class="button-list center-content">
              <li><a class="button-list--accept" onClick="modal.accept()">Aceptar</a></li>
              <li><a class="button-list--cancel" onClick="modal.cancel()">Cancelar</a></li>
            </ul>
          </div>
        </div>
      `
    }
      open(data)  {
        document.querySelector('.modal-header h1').innerHTML = data.title;
        document.querySelector('.modal-body p').innerHTML = data.content;
        if (data.accept) {
          document.querySelector('.modal .button-list--accept')
            .addEventListener('click', e => data.accept(data.paramAccept));
        }
        if (data.cancel === false) {
          document.querySelector('.modal .button-list--cancel').classList.add('no-display');
        } else {
          document.querySelector('.modal .button-list--cancel').classList.remove('no-display');
        }
        document.querySelector('.modal').classList.add('display');
        document.querySelector('.modal').classList.remove('no-display');
        
      }
      close() {
        document.querySelector('.modal').classList.remove('display');
        document.querySelector('.modal').classList.add('no-display');
      }
      cancel() {
        this.close();
      }
      accept() {
        this.close();
      }
  }