

class LoaderComponent  {
  constructor() {
    let loaderElem = document.createElement('div');
    loaderElem.innerHTML = this.getTmpl();
    document.querySelector('#shared-content').appendChild(loaderElem);
  }
  getTmpl() {
    return `<div class="loader no-display">
    <div class="loader-content">
      <i class="im im-note-o"></i>
      </div>
    </div> `
  }
  open()  {
    document.querySelector('.loader').classList.add('display');
    document.querySelector('.loader').classList.remove('no-display');
  }
  close() {
    document.querySelector('.loader').classList.remove('display');
    document.querySelector('.loader').classList.add('no-display');
  }
}
