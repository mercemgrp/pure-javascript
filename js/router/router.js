class Router {
    /**
     * Metodo inicial.
     *
     * @return {void}.
     */
    constructor(paths) {
        this.paths = paths;
        this.initRouter();
    }

    /**
     * Permite inicializar el router
     *
     * @return {void}.
     */
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

    /**
     * Permite iniciar la carga de paginas.
     *
     * @return {void}.
     */
    load(page = "/list") {
      let those = this;
      let template = PATHS[page];
      let params = {};
      if (!template) {
         Object.keys(PATHS).forEach(
          key => {
            const pathWithoutParams = those.getPathWithoutPathParams(key) || false;
            if(page.indexOf(pathWithoutParams) !== -1) {
              params = those.getPathParams(key, page);
              template = PATHS[key];
            }
          }
        ); 
      }
      if (template) {
        try {
          const templateRendered = template.func(params);
          appModule.render(templateRendered, document.querySelector("#content"));
          window.history.pushState({}, "", '/#' + page);
        } catch(error) {
          appModule.render(errorModule.getTmpl, document.querySelector('#content'));
          window.history.pushState({}, "", '/#/error');  
        }
      } else {
        appModule.render(errorModule.getTmpl, document.querySelector('#content'));
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