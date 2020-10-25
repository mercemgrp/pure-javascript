'use strict';

var JSFiles = ['js/functions.js', 'js/app.js', 'js/components.js', 'js/pages.js', 'js/services.js', 'js/router/routes.js', 'js/router/router.js', 'js/router/index.js'];
var CSSFiles = ['styles/css/generic.css', 'styles/css/styles.css', 'styles/css/iconmonstr-iconic-font.css'];
var LoadFiles = function () {
    var loadJSSinc = function loadJSSinc(JSFiles, i) {
        if (JSFiles.length <= i) {
            return;
        }
        var jsElm = document.createElement("script");
        jsElm.addEventListener("load", function () {
            console.log("Script terminó de cargarse y ejecutarse, ", JSFiles[i]);
            loadJSSinc(JSFiles, ++i);
        });
        jsElm.type = "application/javascript";
        jsElm.src = JSFiles[i];
        document.body.appendChild(jsElm);
    };
    var loadCSS = function loadCSS(file) {
        var cssElem = document.createElement("link");
        cssElem.type = "text/css";
        cssElem.rel = "stylesheet";
        cssElem.href = file;
        document.head.appendChild(cssElem);
    };
    var load = function load(JSFiles, CSSFiles) {
        if (CSSFiles) {
            CSSFiles.forEach(function (file) {
                return loadCSS(file);
            });
        }
        if (JSFiles) {
            loadJSSinc(JSFiles, 0);
        }
    };
    return {
        load: load
    };
}();

LoadFiles.load(JSFiles, CSSFiles);