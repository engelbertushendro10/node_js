//const notes = require('./note')
const { nanoid } = require('nanoid');
const notes = require('./note');

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
const getAllNotesHandler = (response, h) => ({
    status: 'success',
    data: {
        notes
    }
})

const getNotesHandlerById = (request, h) => {
    const { id } = request.params
    const note = notes.filter((n) => n.id === id)[0]
    if (note !== undefined) {
        return {
            status: 'success',
            data: {
                notes
            }
        }
    }
    const response = h.response({
        status: 'fail',
        message: 'catatan tidak di temukan'
    })
    response.code(404)
    return response
}

const editNotesHandlerByid = (request, h) => {
    const { id } = request.params
    const { title, tags, body } = request.payload
    const updatedAt = new Date().toISOString()
    const index = notes.findIndex((note) => note.id === id)

    if (index !== -1) {
        notes[index] = {
            ...notes[index],
            title,
            tags,
            body,
            updatedAt
        }
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil diubah',
        })
        response.code(200)
        return response
    }
    const response = h.response({
        status: 'fail',
        message: 'Catatan Gagal Di Perbarui, id Tidak Di temukan'
    })
    response.code(404)
    return response

}

const hapusNoteHandlerById = (request, h) => {
    const { id } = request.params
    const index = notes.findIndex((note) => note.id === id)

    if (index !== -1) {
        notes.splice(index, 1)
        const response = h.response({
            status: 'success',
            message: ' Catatan Berhasil Di Hapus'
        })
        response.code(200)
        return response
    }
    const response = h.response({
        status: 'fail',
        message: 'Catatan Gagal Di Hapus, id Tidak Di temukan'
    })
    response.code(404)
    return response
}

module.exports = {
    addNoteHandler,
    getAllNotesHandler,
    getNotesHandlerById,
    editNotesHandlerByid,
    hapusNoteHandlerById
}