'use strict';

var Functions = function () {
    var calculateHeight = function calculateHeight() {
        var windowHeight = window.innerHeight;
        var headerHeight = document.getElementsByTagName('header')[0].offsetHeight;
        var footerHeight = document.querySelector('footer') ? document.querySelector('footer').offsetHeight : 0;
        document.querySelector('#content').removeAttribute('style');
        var content = document.querySelector('#content').offsetHeight;
        var contentHeight = windowHeight - headerHeight - footerHeight;
        if (content < contentHeight) {
            document.querySelector('#content').style.height = contentHeight + 'px';
        }
    };
    var resetStyles = function resetStyles() {
        document.querySelector('.header-menu--create').classList.remove('no-display');
    };
    return {
        resize: function resize() {
            calculateHeight();
        },
        render: function render(template, node) {
            resetStyles();
            if (!node) {
                return;
            }
            var data = typeof template === 'function' ? template() : template;
            if (data) {
                node.innerHTML = data;
            }
            calculateHeight();
        }
    };
}();