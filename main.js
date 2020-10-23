var MY_NOTES = MY_NOTES || {};
const JSFiles = [
    'src/js/functions.js',
    'src/js/app.js',
    'src/js/components.js',
    'src/js/pages.js',
    'src/js/services.js',
    'src/js/router/routes.js',
    'src/js/router/router.js'
];
const CSSFiles = [
    'src/stylesheets/css/generic.css',
    'src/stylesheets/css/styles.css'
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

