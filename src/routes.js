const {addNoteHandler} = require ('./handler');

const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: addNoteHandler
    },
    {
        method: 'GET',
        path: '/books',
        handler: () => {}
    },
    {
        method: 'GET',
        path: '/books/{bookId}',
        handler: () => {}
    },
    {
        method: 'PUT',
        path: '/books/{bookId}',
        handler: () => {}
    },
    {
        method: 'DELETE',
        path: '/books',
        handler: () => {}
    },
];

module.exports = routes;