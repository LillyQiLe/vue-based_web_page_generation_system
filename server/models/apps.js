var mongoose = require('mongoose')
var Schema = mongoose.Schema
var componentSchema = {
  name: String,
  span: {
    type: Number,
    default: 0
  },
  offset: {
    type: Number,
    default: 0
  },
  start: Number,
  text: String,
  class: String
}
var appSchema = new Schema({
  userId: String,
  appName: String,
  registertime: {type: Date, default: Date.now},
  lastlogintime: {type: Date, default: Date.now},
  components: componentSchema,
  status: {type: Number, default: 1, min: 0, max: 3}
})

// appSchema.createIndexs({registertime: 1})

module.exports = mongoose.model('App', appSchema)

// status: 0正常 1已删除