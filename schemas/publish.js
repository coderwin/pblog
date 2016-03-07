var mongoose = require('mongoose');

var PublishSchema = new mongoose.Schema({
	title: String,
    content: String,
    filePath: String,
    author: String,
    tag: String,
    reply_count: Number,
    visit_count: Number,
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        }
    }
});

PublishSchema.pre('save', function(next) {
    this.meta.createAt = Date.now();
    next();
})

PublishSchema.statics = {
    fetch: function(cb) {
        return this.find({}).sort('meta.createAt').exec(cb);
    },
    findById: function(id, cb) {

        return this.findOne({
            _id: id
        }).exec(cb);
    },
    findByTag: function(tag, cb){
        return this.find({
            tag: tag
        }).exec(cb);
    },
    findPrev: function(id,items, cb){
        var error = null;
        for (var i = 0; i < items.length; i++) {
            console.log(items[i])
            if(items[i]["_id"]==id){
                if(id==0){
                    return cb(error)
                }
                console.log(items[i-1])
                return cb(error, items[i-1])
            }
        }
        //error = {code: -1, msg: "no find"};
        //cb(error)
    },
    findAfter: function(id,items, cb){
        var error = null;
        for (var i = 0; i < items.length; i++) {
            if(items[i]["_id"]==id){
                if (i==items.length-1) {
                    return cb(error)
                }
                console.log(items[i+1])
                return cb(error, items[i+1])
            }
        }
        //error = {code: -1, msg: "no find"};
        //cb(error)
    }
}

module.exports = PublishSchema;