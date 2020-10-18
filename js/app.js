var appModule = (function () {
    var calculateHeight = function() {
        const windowHeight = window.innerHeight;
        const headerHeight = document.getElementsByTagName('header')[0].offsetHeight;
        const footerHeight = document.getElementsByTagName('footer')[0].offsetHeight;
        document.querySelector('#content').removeAttribute('style');
        const content = document.querySelector('#content').offsetHeight;
        const contentHeight = windowHeight - headerHeight - footerHeight;
        if (content < contentHeight) {
            document.querySelector('#content').style.height = contentHeight + 'px';
        }
    }
    return {
        resize: function() {
            calculateHeight();
        },
        render: function (template, node) {
           if(!node) { return; }
           node.innerHTML = (typeof template === 'function' ? template() : template);
           calculateHeight();
       }

    }
}());

window.onresize = function() {
    appModule.resize();
}
