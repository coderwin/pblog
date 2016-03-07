var mongoose = require('mongoose');

var ReplySchema = new mongoose.Schema({
	infoid: String,
    content: String,
    replyer: String,
    connect: String,
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        }
    }
});

ReplySchema.pre('save', function(next) {
    this.meta.createAt = Date.now();
    next();
})

ReplySchema.statics = {
    fetch: function(cb) {
        return this.find({}).sort('meta.createAt').exec(cb);
    },
    findById: function(id, cb) {

        return this.findOne({
            _id: id
        }).exec(cb);
    },
    findByInfoId: function(infoid, cb) {

        return this.find({
            infoid: infoid
        }).exec(cb);
    }
}

module.exports = ReplySchema;