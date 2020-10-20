const PATHS = {
    '/list':  {
        func:  pages.listNotes.getTmpl, 
    },
    '/list/{{id}}': {
        func:  pages.viewNotes.getTmpl
    },
    '/edit/{{id}}': {
        func: pages.editNotes.getTmpl
    },
    '/create': {
        func: pages.createNotes.getTmpl
    }
}