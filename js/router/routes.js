const PATHS = {
    '/list':  {
        func:  listNotesModule.getTmpl, 
    },
    '/list/{{id}}': {
        func:  viewNotesModule.getTmpl
    },
    '/edit/{{id}}': {
        func: editNotesModule.getTmpl
    },
    '/create': {
        func: createNotesModule.getTmpl
    }
}