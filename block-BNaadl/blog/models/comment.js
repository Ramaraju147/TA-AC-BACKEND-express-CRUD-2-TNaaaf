const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    content: String,
    articleId: {type:Schema.Types.ObjectId, ref:'Article'},
    author: String,
    likes: {type: Number, default:0}
},{timestamps: true})

module.exports = mongoose.model('Comment',commentSchema);