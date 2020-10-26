  class APICalls {
    static async delete(url = '', data = {}) {
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
    static async put(url = '', data = {}) {
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
    static async post(url = '', data = {}) {
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
    static async get(url = '') {
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
  }