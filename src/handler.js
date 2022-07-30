const { nanoid } = require('nanoid');
const books = require("./books");

const addBookHandler = (request, h) => {    
    const {name, 
        year, 
        author, 
        summary, 
        publisher, 
        pageCount, 
        readPage, 
        reading} = request.payload;

    const checkName = request.payload.hasOwnProperty('name');

    if (!checkName) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal menambahkan buku. Mohon isi nama buku',
      });
      response.code(400);
      return response;
    }

    if (readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);
        return response;
    }

    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const finished = readPage === pageCount;

    const newBook = {
        id,
        name, 
        year, 
        author, 
        summary, 
        publisher, 
        pageCount, 
        readPage,
        finished,
        reading, 
        insertedAt, 
        updatedAt
    };

    books.push(newBook);

    const isSuccess = books.filter((book) => book.id === id).length > 0;

    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: id,
            },
        });
        response.code(201);
        return response;
    }
    const response = h.response({
        status: 'fail',
        message: 'Buku gagal ditambahkan',
    });
    response.code(500);
    return response;
};

const getAllBooksHandler = (request, h) => {
    let responseBody;
    const query = request.query;// ngambil query daru url dengan nilai berupa object
    const {name, reading, finished} = query;// object destructuring, memasukkan value dari property object ke variabel
  
    if (name) {// kalo name nya ada pasti true, kalo tidak ada false, kalo false tidak akan dijalankan
      const array = [];
      for (let i=0; i<books.length; i++) {
        if (books[i].name.toLowerCase().includes(name.toLowerCase())) {
          const {id, name, publisher} = books[i];
          array.push({id, name, publisher});
        }
      }
      responseBody = {
        'status': 'success',
        'data': {
          'books': array,
        },
      };
      return responseBody;
    }
  
    if (reading && Number(reading) === 0 || Number(reading) === 1) {// kalo reading ada dan bernilai 0 atau 1, akan dijalankan
      const array = [];
      for (let i=0; i<books.length; i++) {
        if (books[i].reading == reading) {
          const {id, name, publisher} = books[i];
          array.push({id, name, publisher});
        }
      }
      responseBody = {
        'status': 'success',
        'data': {
          'books': array,
        },
      };
      return responseBody;
    }
  
    if (finished && Number(finished) === 0 || Number(finished) === 1) {// kalo finished ada dan bernilai 0 atau 1, akan dijalankan
      const array = [];
      for (let i=0; i<books.length; i++) {
        if (books[i].finished == finished) {
          const {id, name, publisher} = books[i];
          array.push({id, name, publisher});
        }
      }
      responseBody = {
        'status': 'success',
        'data': {
          'books': array,
        },
      };
      return responseBody;
    } else if (finished && Number(finished) !== 0 && Number(finished) !== 1) {// kalo finished ada tapi nilainya bukan 0 atau 1
      const array = [];
      for (let i=0; i<books.length; i++) {
        array.push(
            {id: books[i].id, name: books[i].name, publisher: books[i].publisher},
        );
      }
      responseBody = {
        'status': 'success',
        'data': {
          'books': array,
        },
      };
      return responseBody;
    }
    /**
     * PERKONDISIAN YANG QUERY HARUS DI ATAS GET ALL, KARENA KALO DIBAWAH GET ALL GAK KEBACA, GAK TAU KENAPA
     */
    if (books.length > 0 && !name && !reading && !finished) {// get all tanpa query
      const array = [];
      for (let i=0; i<books.length; i++) {
        array.push(
            {id: books[i].id, name: books[i].name, publisher: books[i].publisher},
        );
      }
      responseBody = {
        'status': 'success',
        'data': {
          'books': array,
        },
      };
      return responseBody;
    } else {
      responseBody = {
        status: 'success',
        data: {
          books,
        },
      };
      return responseBody;
    }
  };

const getBookByIdHandler = (request, h) => {
    const {id} = request.params;
  
    const book = books.filter((b) => b.id === id)[0];
  
    if (book !== undefined) {
      return {
        status: 'success',
        data: {
          book,
        },
      };
    }
  
    const response = h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    });
    response.code(404);
    return response;
  };


const editBookByIdHandler = (request, h) => {
        const checkNameProperty = request.payload.hasOwnProperty('name');
        const {readPage, pageCount} = request.payload;
        const checkReadPage = readPage <= pageCount;
    
        if (!checkNameProperty) {
        const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Mohon isi nama buku',
        });
        response.code(400);
        return response;
    } else if (!checkReadPage) {
        const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);
        return response;
    } else if (checkNameProperty && checkReadPage) {
        const {id} = request.params;

        const {name, year, author, summary, publisher, pageCount, readPage, reading} = request.payload;
        const updatedAt = new Date().toISOString();

        const index = books.findIndex((book) => book.id === id);

        if (index !== -1){
            books[index] = {
                ...books[index],
                name,
                year,
                author,
                summary,
                publisher,
                pageCount,
                readPage,
                reading,
                updatedAt,
            };
            const response = h.response({
                status: 'success',
                message: 'Buku berhasil diperbarui',
              });
              response.code(200);
              return response;
            }
        
            const response = h.response({
              status: 'fail',
              message: 'Gagal memperbarui buku. Id tidak ditemukan',
            });
            response.code(404);
            return response;
          }
};

const deleteBookByIdHandler = (request, h) => {
    const { id } = request.params;

    const index = books.findIndex ((book) => book.id === id);

    if (index !== -1) {
        books.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil dihapus'
        });
        response.code(200);
        return response;
    };
    const response = h.response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
};

module.exports = {addBookHandler, getAllBooksHandler, getBookByIdHandler, editBookByIdHandler, deleteBookByIdHandler};