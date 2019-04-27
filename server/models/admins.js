var mongoose = require('mongoose')
var Schema = mongoose.Schema

var adminSchema = new Schema({
    'userName': String,
    'pwd': String,
    "status": Number,
    "level": String
})

module.exports = mongoose.model('Admin', adminSchema)