var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = mongoose.SchemaTypes.ObjectId
var schemaName = 'List'
var Tasks = require('../models/task');
var Comments = require('../models/comment');

var schema = new Schema({
    name: { type: String, requried: true },
    date: { type: Date, required: true, default: Date.now() },
    boardId: { type: ObjectId, ref: 'Board' }
});

schema.post('remove', function (next) {
    Tasks.remove({ listId: this._id }).exec();
    Comments.remove({ listId: this._id }).exec();
});

module.exports = mongoose.model(schemaName, schema);