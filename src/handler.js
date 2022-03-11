const notes = require('./note')
const { nanoid } = require('nanoid')

const addNoteHandler = (request, h) => {
    const { title, tags, body } = request.payload;

    const id = nanoid(16)
    const createdAt = new Date().toISOString()
    const updatedAt = createdAt

    const newNote = {
        title, tags, body, id, createdAt, updatedAt
    }

    notes.push(newNote)
    const isSuccess = notes.filter((note) => note.id === id).length > 0;

    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil ditambahkan',
            data: {
                noteId: id
            }
        })
        response.code(201)
        return response
    }
    const response = h.response({
        status: 'error',
        message: "Catatan gagal di tambah"
    })
    response.code(500)
    return response
}
const getAllHandler = () => ({
    status: 'success',
    data: {
        notes
    }
})

module.exports = { addNoteHandler, getAllHandler }