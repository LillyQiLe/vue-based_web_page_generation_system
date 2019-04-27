var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var userSchema = new Schema({
    'userId': String,
    'userName': String,
    'pwd': String,
    'appList': Array,
    'status': String
})

module.exports = mongoose.model('User', userSchema)