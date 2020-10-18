var myNotes = (function () {
    var notes = [
        { id: 0, title: 'Lista de la compra 1', date: '15/10/2020 12:15', content: 'Pan </br> Cebolla </br> Leche' },
        { id: 1, title: 'Lista de la compra 2', date: '16/10/2020 12:15', content: 'Pan </br> Cebolla </br> Leche' },
        { id: 2, title: 'Lista de la compra 3', date: '17/10/2020 12:15', content: 'Pan </br> Cebolla </br> Leche' }
    ];
    return {
        getNotes: function() {
            return notes;
        },
        deleteNote: function(id) {
            const indice = notes.findIndex(elem => elem.id === +id);
            notes.splice(indice, 1);

        },
        editNote: function(data) {
            let note = notes.find(elem => elem.id === +data.id);
            note = Object.assign(note, data);
            note.id = +note.id;
            
        },
        createNote: function(data) {
            data.id = notes.length;
            data.date = new Date().toISOString();
            notes.push(data);
        }
    }       
}());