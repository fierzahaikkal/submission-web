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
    const isName = notes.filter((note) => note.name === name).length > 0;

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

}