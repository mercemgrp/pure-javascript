class InputComp {
    data;
    constructor(param) {
      this.data = param;
    }
    getTmpl() {
      const content = this.data.textarea ? `<div contenteditable="true" class="div-editable-content" id="${this.data.id}" name="${this.data.id}">${this.data.value ? this.data.value : ''}</div>`
                                    : `<input class="div-control--input--input" id="${this.data.id}" name="${this.data.id}" placeholder="${this.data.placeholder ? this.data.placeholder : ''}" ${this.data.required ? 'required' : ''} value="${this.data.value ? this.data.value : ''}"></input>`;
      return `<div class="div-control display-flex ${this.data.divClass || ''}">
      <label>${this.data.title}</label>
        <div class="div-control--input ${this.data.textarea ? 'div-editable' : ''}">
          ${content}
        </div>
        <div class="error hidden"><p>Campo obligatorio</p></div>
      </div>
      `
    }
    checkError() {
      if (!this.data.required) {
        return false;
      }
      const elem = document.querySelector(`#${this.data.id}`);
      let content = this.data.textarea ? elem.innerHTML.replaceAll('<br>', '').trim() : elem.value;
      if (!content) {
          elem.parentElement.parentElement.querySelector('.error').classList.remove('hidden');
          elem.parentElement.classList.add('div-control--error');
      }
      return content ? false : true;
    }
    getValue() {
      if (this.data.textarea) {
        return document.querySelector(`#${this.data.id}`).innerHTML;
      } else {
        return document.querySelector(`#${this.data.id}`).value;
      }
    }
    reset() {
      let titleErrorClasses = document.querySelector(`#${this.data.id}`)
      .parentElement.parentElement.querySelector('.error').classList;
      if (!titleErrorClasses.contains('hidden')) {
        titleErrorClasses.add('hidden');
      }
      let titleBorderClasses = document.querySelector(`#${this.data.id}`)
      .parentElement.classList;
      if (titleBorderClasses.contains('div-control--error')) {
        titleBorderClasses.remove('div-control--error');
      }
    }
}