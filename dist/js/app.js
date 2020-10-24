'use strict';

var MY_NOTES = MY_NOTES || {};
MY_NOTES = {
    currentPage: null
};

var App = function () {
    var eventListeners = function eventListeners() {
        document.addEventListener('paste', function (e) {
            e.preventDefault();
            document.execCommand('inserttext', false, e.clipboardData.getData('text/plain'));
        });
    };
    return {
        load: function load() {
            Functions.resize();
            window.onresize = function () {
                Functions.resize();
            };
            eventListeners();
        }
    };
}();
App.load();