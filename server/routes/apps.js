var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var Apps = require('../models/apps') 

mongoose.connect('mongodb://127.0.0.1:27017/VBWPG')

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected success.')
})
mongoose.connection.on('error', () => {
  console.log('MongoDB connected fail.')
})
mongoose.connection.on('disconnected', () => {
  console.log('MongoDB connected disconnected.')
})

/* GET users listing. */
router.get('/', function(req, res, next) {
  let currentPage = req.param("currentPage")
  let pageSize = 6
  let skip = (currentPage-1)*pageSize
  let appCount
  Apps.find().count((err, count) => {
    appCount = count
  })
  Apps.find().skip(skip).limit(pageSize).exec((err, doc) => {
    if(err){
      res.json({
        status: '1',
        msg: err.message
      })
    } else {
      res.json({
        status: '0',
        msg: '',
        result: {
          count: appCount,
          list: doc
        }
      })
    }
  })
});

module.exports = router;
