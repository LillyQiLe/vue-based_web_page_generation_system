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
  position: String,
  text: {type: String, default: undefined},
  model: {type: String, default: undefined},
  size: {type: String, default: undefined},
  type: {type: String, default: undefined},
  placeholder: {type: String, default: undefined},
  reserve1: {type: String, default: undefined},
  reserve2: {type: String, default: undefined},
  reserve3: {type: String, default: undefined},
  reserve4: {type: String, default: undefined},
  reserve5: {type: String, default: undefined},
  reserve6: {type: String, default: undefined},
  reserve7: {type: String, default: undefined}
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