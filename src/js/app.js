const App = (function () {
    var eventListeners = function() {
        document.addEventListener('paste', e => {
            e.preventDefault();
            document.execCommand('inserttext', false, e.clipboardData.getData('text/plain'));
        });
    }    
    return {
        load: function() {
            Functions.resize();
            window.onresize = function() {
                Functions.resize();
            }  
            eventListeners(); 
        }
    }
}());
App.load();

  

