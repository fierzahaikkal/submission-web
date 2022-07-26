const { nanoid } = require("nanoid");
const notes = require("./notes");

const addNoteHandler = (request, h) => {
    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading
    } = request.payload;

    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    const newNote = {
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

    notes.push(newNote);

    const isSuccess = notes.filter((note) => note.name === name || note.readPage === readPage).length > 0;

    if (isSuccess) {
        const response = h.respone({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: `${note.id}`
            },
        });
        response.code(201);
        return response;
    }
    if (isSuccess !== note.name) {
        const response = h.respone({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
        });
        response.code(400);
        return response;
    }
    if (isSuccess >= note.pageCount) {
        const response = h.respone({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);
        return response;
    }
    const response = h.respone({
        status: 'fail',
        message: 'Buku gagal ditambahkan',
    });
    response.code(500);
    return response;
}

module.exports = {addNoteHandler};