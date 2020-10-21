const JSFiles = [
    'src/js/app.js',
    'src/js/functions.js',
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
    var loadJS = function(file) {
        var jsElm = document.createElement("script");
        jsElm.type = "application/javascript";
        jsElm.src = file;
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
            JSFiles.forEach(file => loadJS(file));    
        }
        
        
    };
    return {
        load
    }
}();

LoadFiles.load(JSFiles, CSSFiles);

