var mongoose = require('mongoose')
var Schema = mongoose.Schema

var cols = {
  row: Number,
  span: Number,
  offset: Number,
  id: String
}
var components = {
  name: String,
  position: String
}
var appSchema = new Schema({
  userId: String,
  appName: String,
  registertime: {type: Date, default: Date.now},
  lastlogintime: {type: Date, default: Date.now},
  status: {type: Number, default: 1, min: 0, max: 3},
  componentsList: {
    type: [components],
    default: []
  },
  colsList: {
    type: [cols],
    default: []
  }
})

// appSchema.createIndexs({registertime: 1})

module.exports = mongoose.model('App', appSchema)

// status: 0正常 1已删除