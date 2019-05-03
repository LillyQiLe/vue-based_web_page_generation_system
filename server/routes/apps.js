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

router.post('/getAppInfo', (req, res, next) => {
  let _id = req.body._id
  console.log('**********' + _id + '**********')
  if (!_id) {
    res.json({
      status: '0',
      msg: '不存在',
      result: '不存在'
    })
  } else {
    Apps.findById(_id, (err, doc) => {
      if (err) {
        // console.log('************************error************************')
        res.json({
          status: '1',
          msg: err
        })
      } else if (doc) {
        // console.log('************************doc************************')
        res.json({
          status: '0',
          msg: 'success',
          result: doc
        })
      } else {
        console.log('************************not both************************')
      }
    })
  }
})

module.exports = router;
