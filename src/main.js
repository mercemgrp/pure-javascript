
const JSFiles = [
    'js/functions.js',
    'js/app.js',
    'js/components.js',
    'js/pages.js',
    'js/services.js',
    'js/router/routes.js',
    'js/router/router.js',
    'js/router/index.js'
];
const CSSFiles = [
    'stylesheets/css/generic.css',
    'stylesheets/css/styles.css'
];
const LoadFiles = function() {
    var loadJSSinc = function(JSFiles, i) {
        if (JSFiles.length <= i) {
            return;
        }
        var jsElm = document.createElement("script");
        jsElm.addEventListener("load", () => {
            console.log("Script terminó de cargarse y ejecutarse, ", JSFiles[i]);
            loadJSSinc(JSFiles, ++i);
          });
        jsElm.type = "application/javascript";
        jsElm.src = JSFiles[i];
        document.body.appendChild(jsElm);
    };
    var loadCSS = function(file) {
        var cssElem = document.createElement("link");
        cssElem.type = "text/css";
        cssElem.rel = "stylesheet";
        cssElem.href = file;
        document.head.appendChild(cssElem);
    };
    var load = function(JSFiles, CSSFiles) {
        if(CSSFiles) {
            CSSFiles.forEach(file => loadCSS(file));    
        }
        if(JSFiles) {
            loadJSSinc(JSFiles, 0);
        }
        
        
    };
    return {
        load
    }
}();

LoadFiles.load(JSFiles, CSSFiles);

