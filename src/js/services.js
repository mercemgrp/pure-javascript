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
    if (resp.error) {
      throw('error');
    } else {
      return resp;
    }
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
    if (resp.error) {
      throw('error');
    } else {
      return resp;
    }
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
      if (resp.error) {
        throw('error');
      } else {
        return resp;
      }
    };
  var get = async function getData(url = '') {
    var myHeaders = new Headers();
    const response = await fetch(url, {
      method: 'GET',
      headers: myHeaders,
      credentials: 'omit'
    });
    const resp = await response.json();
    if (resp.error) {
      throw('error');
    } else {
      return resp;
    }
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
        components.loader.open();
        return serviceCalls.get(`${ENV.api}/notes/${id}`)
          .then(response => response)
          .catch(err => {
            components.loader.close();
            throw(err)
          })
      },
      getNotes: function() {
        components.loader.open();
        return serviceCalls.get(`${ENV.api}/notes`)
          .then(response => {
            components.loader.close();
              notes = response.data;
              return response.data;
          })
          .catch(err => {
            components.loader.close();
            throw(err)
          })
      },
      deleteNote: function(id) {
        components.loader.open();
          return serviceCalls.delete(`${ENV.api}/notes/${id}`)
          .then(response => {
            components.loader.close();
            notes = response.data;
            return response.data;
          })
          .catch(err => {
            components.loader.close();
            throw(err)
          })
      },
      editNote: function(data) {
        components.loader.open();
          return serviceCalls.post(`${ENV.api}/notes/${data.id}`, data)
          .then(response => {
            components.loader.close();
            notes = response.data;
            return response.data;
          })
          .catch(err => {
            components.loader.close();
            throw(err)
          })
          
      },
      createNote: function(data) {
        components.loader.open();
          return serviceCalls.put(`${ENV.api}/notes`, data)
          .then(response => {
            components.loader.close();
            notes = response.data;
            return response.data;
          })
          .catch(err => {
            components.loader.close();
            throw(err)
          })
      }
    }       
}());