const ENV = {
  api: 'http://localhost:8888'
};
var serviceCalls = (function() {
  var deleteD = async function deleteData(url = '', data = {}) {
    var myHeaders = new Headers();
    const response = await fetch(url, {
      method: 'DELETE',
      headers: myHeaders,
      credentials: 'omit'
    });
    const resp = await response.json();
    return resp;
  };
  var put = async function putData(url = '', data = {}) {
    var myHeaders = new Headers({
      'Content-type': 'application/json'
    });
    const response = await fetch(url, {
      method: 'PUT',
      headers: myHeaders,
      credentials: 'omit',
      body: JSON.stringify(data)
    });
    const resp = await response.json();
    return resp;
  };
  var post = async function postData(url = '', data = {}) {
      var myHeaders = new Headers({});
      const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: myHeaders,
        credentials: 'omit',
        body: JSON.stringify(data) // body data type must match "Content-Type" header
      });
      const resp = await response.json(); // parses JSON response into native JavaScript objects
      return resp;
    };
  var get = async function getData(url = '') {
    var myHeaders = new Headers();
    const response = await fetch(url, {
      method: 'GET',
      headers: myHeaders,
      credentials: 'omit'
    });
    const resp = await response.json();
    return resp;
  };
  
  return {
      post: post,
      get: get,
      put: put,
      delete: deleteD
  }
})();
var myNotes = (function () {
    var notes;
    return {
      getNote: function(id) {
        return serviceCalls.get(`${ENV.api}/notes/${id}`)
          .then(response => response)
          .catch(err => {
            console.log('error :: ', err);
            return {
              error: 'Error cargando la nota'
            }
          })
      },
        getNotes: function() {
          return serviceCalls.get(`${ENV.api}/notes`)
            .then(response => {
              notes = response.data;
              return response.data;
            })
            .catch(err => {
              console.log('error :: ', err);
              return {
                error: 'Error cargando las notas'
              }
            })
        },
        deleteNote: function(id) {
            return serviceCalls.delete(`${ENV.api}/notes/${id}`)
            .then(response => {
              notes = response.data;
              return response.data;
            })
            .catch(err => {
              console.log('error :: ', err);
              return {
                error: 'Error eliminando la nota'
              }
            })

        },
        editNote: function(data) {
            return serviceCalls.post(`${ENV.api}/notes/${data.id}`, data)
            .then(response => {
              notes = response.data;
              return response.data;
            })
            .catch(err => {
              console.log('error :: ', err);
              return {
                error: 'Error editando la nota'
              }
            })
            
        },
        createNote: function(data) {
            return serviceCalls.put(`${ENV.api}/notes`, data)
            .then(response => {
              notes = response.data;
              return response.data;
            })
            .catch(err => {
              console.log('error :: ', err);
              return {
                error: 'Error creando la nota'
              }
            })
        }
    }       
}());