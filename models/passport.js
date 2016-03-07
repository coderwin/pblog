var mongoose = require('mongoose');
var PassportSchema = require('../schemas/passport');

var Passport = mongoose.model('Passport', PassportSchema);

module.exports = Passport;