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
          MY_NOTES.currentPage = new component(params);
          const templateRendered = MY_NOTES.currentPage.getTmpl();
        if (typeof templateRendered === 'object') {
          templateRendered.then(
            resp => {
              Functions.render(resp, document.querySelector("#content"));
              if (MY_NOTES.currentPage.load) {
                MY_NOTES.currentPage.load();
              }
              window.history.pushState({}, "", '/#' + page);    
            }
          )
        } else {
          Functions.render(templateRendered, document.querySelector("#content"));
          if (MY_NOTES.currentPage.load) {
            MY_NOTES.currentPage.load();
          }
          window.history.pushState({}, "", '/#' + page);
        }

      } catch(e) {
        console.error('routes.js :: error :: ', e);
        Functions.render(new Error().getTmpl, document.querySelector('#content'));
        window.history.pushState({}, "", '/#/error');  
      }
    } else {
      Functions.render(new Error().getTmpl, document.querySelector('#content'));
        window.history.pushState({}, "", '/#/error');  
        window.history.pushState({}, "", '/#');
    }
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
