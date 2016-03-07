var mongoose = require('mongoose');
var PublishSchema = require('../schemas/publish.js');

var Publish = mongoose.model('Publish', PublishSchema);

module.exports = Publish;