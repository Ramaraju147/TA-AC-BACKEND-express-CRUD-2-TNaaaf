const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title: String,
    description: String,
    tags: [String],
    author: String,
    likes: Number
})

module.exports = mongoose.model('Article',articleSchema);