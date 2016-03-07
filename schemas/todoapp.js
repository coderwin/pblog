var mongoose = require('mongoose');

var TodoAppSchema = new mongoose.Schema({
    content: String,
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        }
    }
});

TodoAppSchema.pre('save', function(next) {
    this.meta.createAt = Date.now();
    next();
})

TodoAppSchema.statics = {
    fetch: function(cb) {
        return this.find({}).sort('meta.createAt').exec(cb);
    },
    findById: function(id, cb) {

        return this.findOne({
            _id: id
        }).exec(cb);
    }
}

module.exports = TodoAppSchema;