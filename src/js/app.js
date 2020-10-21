const App = (function () {    
    return {
        load: function() {
            window.onresize = function() {
                Functions.resize();
            }
            
        }

    }
}());
App.load();
  

