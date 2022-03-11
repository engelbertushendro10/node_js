//const hapi = require('@hapi/hapi');

const { addNoteHandler, getAllHandler } = require('./handler');

const routes = [
    {
        method: 'GET',
        path: '/',
        handler: ()=>({
            return: 'Hello World!'
        })
    },
    {
        method: 'POST',
        path: '/notes',
        handler: addNoteHandler
    },
    {
        method: 'GET',
        path: '/notes',
        handler: getAllHandler
    }
]


module.exports = routes;