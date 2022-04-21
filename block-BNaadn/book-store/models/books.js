const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const booksSchema = new Schema({
    title: String,
    summary: String,
    pages: Number,
    publication: String,
    cover_image: {
        data: Buffer,
        contentType: String
    }
})

module.exports = mongoose.model('Book', booksSchema);