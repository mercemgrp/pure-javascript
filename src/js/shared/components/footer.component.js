class FooterComponent {
    constructor() {
        
      }
      static openViewModal() {
          let options =
          `<div class="configuration-view--elem"><div class="display-flex"><a><i class="im im-table"></i></a></div><div class="display-flex"><span>Grid</span></div></div>
          <div class="configuration-view--elem"><div class="display-flex"><a><i class="im im-data"></i></a></div><div class="display-flex"><span>Fila</span></div></div>`;
         const template = `<div class="configuration-view opacity-modal no-display">
            <div class="configuration-view--close" onClick="FooterComponent.closeViewModal()">Cerrar</div>
            <div class="configuration-view--list display-flex-row">
              ${options}  
            </div>
          </div>`;
       
        document.querySelector('#configuration-content').innerHTML = template;
        document.querySelector('.configuration-view').classList.add('display');
        document.querySelector('.configuration-view').classList.remove('no-display');
      }

      static closeViewModal() {
        document.querySelector('.configuration-view').classList.add('no-display');
        document.querySelector('.configuration-view').classList.remove('display');
      }
}