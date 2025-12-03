var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
    'content': String,
    'author': {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    'thread': {
        type: Schema.Types.ObjectId,
        ref: 'photo'
    },
    'postedOn': Date,
    'likes': Number
});

module.exports = mongoose.model('comment', commentSchema);
