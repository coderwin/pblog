var mongoose = require('mongoose');

var PassportSchema = new mongoose.Schema({
    name: String,
    password: String,
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        }
    }
});

PassportSchema.pre('save', function(next) {
    this.meta.createAt = Date.now();
    next();
});

PassportSchema.statics = {
    fetch: function(cb) {
        return this.find({}).sort('meta.createAt').exec(cb);
    },
    findById: function(id, cb) {

        return this.findOne({
            _id: id
        }).exec(cb);
    },
    findByName: function(name, cb) {

        return this.find({
            name: new RegExp(name,'i')
        }).exec(cb);
    }
};

module.exports = PassportSchema;