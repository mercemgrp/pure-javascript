const ROUTER = (function (paths) {   
  var initRouter = function() {
    const {
        location: {
            hash = "/"
        }
    } = window;
    let URI = (!hash || hash === "/") ? "#/list" : hash;
    URI = URI.indexOf('#') === 0 ? URI.substring(1) : hash;
    this.load(URI);
  };
  var load = function (page = "/list") {
    let template = paths[page];
    let params = {};
    if (!template) {
      Object.keys(paths).forEach(
        key => {
          const pathWithoutParams = getPathWithoutPathParams(key) || false;
          if(page.indexOf(pathWithoutParams) !== -1) {
            params = getPathParams(key, page);
            template = paths[key];
          }
        }
      ); 
    }
    if (template) {
      try {
        const templateRendered = template.func(params);
        if (typeof templateRendered === 'object') {
          templateRendered.then(
            resp => {
              Functions.render(resp, document.querySelector("#content"));
              window.history.pushState({}, "", '/#' + page);    
            }
          )
        } else {
          Functions.render(templateRendered, document.querySelector("#content"));
          window.history.pushState({}, "", '/#' + page);
        }

      } catch(error) {
        Functions.render(pages.error.getTmpl, document.querySelector('#content'));
        window.history.pushState({}, "", '/#/error');  
      }
    } else {
      Functions.render(pages.error.getTmpl, document.querySelector('#content'));
        window.history.pushState({}, "", '/#/error');  
        window.history.pushState({}, "", '/#');
    }
  }

  var getPathWithoutPathParams = function(str) {
    const index = str.indexOf('{{');
    return str.substring(0, index);
  }

  var getPathParams = function(varPath, path) {
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
  return {
    initRouter,  
    load
  }
})(PATHS);
ROUTER.initRouter();
