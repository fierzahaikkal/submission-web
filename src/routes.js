const {addBookHandler, getAllBooksHeader} = require ('./handler');

const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: addBookHandler
    },
    {
        method: 'GET',
        path: '/books',
        handler: getAllBooksHeader
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