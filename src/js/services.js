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
        loader.open();
        return serviceCalls.get(`${ENV.api}/notes/${id}`)
          .then(response => {
            loader.close();
            return response;
          })
          .catch(err => {
            loader.close();
            throw(err)
          })
      },
      getNotes: function() {
        loader.open();
        return serviceCalls.get(`${ENV.api}/notes`)
          .then(response => {
            loader.close();
              notes = response.data;
              return response.data;
          })
          .catch(err => {
            loader.close();
            throw(err)
          })
      },
      deleteNote: function(id) {
        loader.open();
          return serviceCalls.delete(`${ENV.api}/notes/${id}`)
          .then(response => {
            loader.close();
            notes = response.data;
            return response.data;
          })
          .catch(err => {
            loader.close();
            throw(err)
          })
      },
      editNote: function(data) {
        loader.open();
          return serviceCalls.post(`${ENV.api}/notes/${data.id}`, data)
          .then(response => {
            loader.close();
            notes = response.data;
            return response.data;
          })
          .catch(err => {
            loader.close();
            throw(err)
          })
          
      },
      createNote: function(data) {
        loader.open();
          return serviceCalls.put(`${ENV.api}/notes`, data)
          .then(response => {
            loader.close();
            notes = response.data;
            return response.data;
          })
          .catch(err => {
            loader.close();
            throw(err)
          })
      }
    }       
}());