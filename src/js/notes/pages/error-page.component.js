
 class ErrorPageComponent {
   message;
  constructor(message) {
    this.message = message || 'Página no encontrada';
  }
  getTmpl() {
    return `<section>${this.message}</section>`
  }
}