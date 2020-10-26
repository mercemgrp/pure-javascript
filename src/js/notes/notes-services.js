
 const notesAPI = `${ENV.api}/notes`;

 class NotesServices {
    constructor() {}
      static getNote(id) {
        loader.open();
        return APICalls.get(`${notesAPI}/${id}`)
          .then(response => {
            loader.close();
            return response;
          })
          .catch(e => {
            console.error('NotesServices.getNote :: error :: ', e);
            loader.close();
            throw(e)
          })
      }
      static getNotes() {
        loader.open();
        return APICalls.get(`${notesAPI}`)
          .then(response => {
            loader.close();
            return response.data;
          })
          .catch(e => {
            console.error('NotesServices.getNotes :: error :: ', e);
            loader.close();
            throw(e)
          })
      }
      static deleteNote(id) {
        loader.open();
          return APICalls.delete(`${notesAPI}/${id}`)
          .then(response => {
            loader.close();
            return response.data;
          })
          .catch(e => {
            console.error('NotesServices.deleteNote :: error :: ', e);
            loader.close();
            throw(e)
          })
      }
      static editNote(data) {
        loader.open();
          return APICalls.post(`${notesAPI}/${data.id}`, data)
          .then(response => {
            loader.close();
            return response.data;
          })
          .catch(e => {
            console.error('NotesServices.editNote :: error :: ', e);
            loader.close();
            throw(e)
          })
          
      }
      static createNote(data) {
        loader.open();
          return APICalls.put(`${notesAPI}`, data)
          .then(response => {
            loader.close();
            return response.data;
          })
          .catch(e => {
            console.error('NotesServices.createNote :: error :: ', e);
            loader.close();
            throw(e)
          })
      }
    }       
