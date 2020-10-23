debugger;
const PATHS = {
    '/list':  {
        func:  pages.listNotes.getTmpl 
    },
    '/edit/{{id}}': {
        func: pages.editNotes.getTmpl,
        load: pages.editNotes.load
    },
    '/create': {
        func: pages.createNotes.getTmpl,
        load: pages.createNotes.load
    }
}