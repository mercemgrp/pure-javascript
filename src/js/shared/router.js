const PATHS = {
  '/list':  NoteListPageComponent,
  '/edit/{{id}}': EditNotePageComponent,
  '/create': CreateNotePageComponent
}

class Router  {   
  paths;

  constructor(paths) {
    this.paths = paths;
    this.initRouter();
  }
  initRouter() {
    const {
        location: {
            hash = "/"
        }
    } = window;
    let URI = (!hash || hash === "/") ? "#/list" : hash;
    URI = URI.indexOf('#') === 0 ? URI.substring(1) : hash;
    this.load(URI);
  }
  load(page = "/list") {
    let component = this.paths[page];
    let params = {};
    if (!component) {
      Object.keys(this.paths).forEach(
        key => {
          const pathWithoutParams = this.getPathWithoutPathParams(key) || false;
          if(page.indexOf(pathWithoutParams) !== -1) {
            params = this.getPathParams(key, page);
            component = this.paths[key];
          }
        }
      ); 
    }
    if (component) {
      try {
        currentPageComp = new component(params);
          const templateRendered = currentPageComp.getTmpl();
        if (typeof templateRendered === 'object') {
          templateRendered.then(
            resp => this.renderAndLoadPage(resp, page)
          )
        } else {
          this.renderAndLoadPage(templateRendered, page);
        }

      } catch(e) {
        currentPageComp = new ErrorPageComponent('Ha ocurrido un error abriendo la página solicitada');
        console.error('routes.js :: error :: ', e);
        this.renderAndLoadPage(currentPageComp.getTmpl(), '/error');
      }
    } else {
      console.error('No ha encontrado el componente en las rutas');
      currentPageComp = new ErrorPageComponent('Página no encontrada');
      this.renderAndLoadPage(currentPageComp.getTmpl(), '/error');
    }
  }

  renderAndLoadPage(template, page) {
    this.page = page;
    Functions.render(template, document.querySelector("#content"));
    if (currentPageComp.load) {
      currentPageComp.load();
    }
    window.history.pushState({}, "", '/#' + page);    
  }

  getPathWithoutPathParams(str) {
    const index = str.indexOf('{{');
    return str.substring(0, index);
  }

  getPathParams(varPath, path) {
    const varPathSplit = varPath.split('/');
    const pathSplit = path.split('/');
    let paramObj = {};
    for(let i= 0; i < varPathSplit.length; i++) {
      let variable = varPathSplit[i];
      if(variable && variable.indexOf(`{{`) !== -1) {
        paramObj[variable.substring(2, variable.length - 2)] = pathSplit[i];
      }
    }
    return paramObj;
  } 
}
