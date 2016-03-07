var mongoose = require('mongoose');
var TodoAppSchema = require('../schemas/todoapp');

var TodoApp = mongoose.model('TodoApp', TodoAppSchema);

module.exports = TodoApp;