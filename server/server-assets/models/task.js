var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = mongoose.SchemaTypes.ObjectId
var schemaName = 'Task';
var Comments = require('../models/comment');

var schema = new Schema({
    body: { type: String, required: true },
    listId: { type: ObjectId, ref: 'List' },
    boardId: { type: ObjectId, ref: 'Board' }
});

schema.post('remove', function (next) {
    Comments.remove({ taskId: this._id }).exec();
});

module.exports = mongoose.model(schemaName, schema);