var mongoose = require('mongoose')
var Schema = mongoose.Schema

var appSchema = new Schema({
    'appId': String,
    'appName': String
})

module.exports = mongoose.model('App', appSchema)