//const hapi = require('@hapi/hapi');

const {
    addNoteHandler,
    getAllNotesHandler,
    getNotesHandlerById,
    editNotesHandlerByid,
    hapusNoteHandlerById
} = require('./handler');

const routes = [
    {
        method: 'GET',
        path: '/notes',
        handler: getAllNotesHandler
    },
    {
        method: 'POST',
        path: '/notes',
        handler: addNoteHandler
    },
    {
        method: 'GET',
        path: '/notes/{id}',
        handler: getNotesHandlerById
    },
    {
        method: 'PUT',
        path: '/notes/{id}',
        handler: editNotesHandlerByid
    },
    {
        method: 'DELETE',
        path: '/notes/{id}',
        handler: hapusNoteHandlerById
    }
]


module.exports = routes;