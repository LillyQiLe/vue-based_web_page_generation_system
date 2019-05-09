const express = require('express');
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
  let _id
  if (req.body._id) {
    _id = req.body._id
  } else {
    _id = req.cookies.appId
  }
  
  console.log('**********' + _id + '**********')
  if (!_id) {
    res.json({
      status: '1',
      msg: '不存在',
      result: '不存在'
    })
  } else {
    Apps.findById(_id, (err, doc) => {
      if (err) {
        // console.log('************************error************************')
        res.json({
          status: '1',
          msg: err.message,
          result: ''
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
        res.json({
          status: '1',
          msg: 'not both',
          result: '不存在'
        })
      }
    })
  }
})

// add app
router.post('/addApp', (req, res, next) => {
  let param = {
    userId: req.body.userId,
    appName: req.body.appName
  }
  Apps.create(param, (err, doc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else if (doc) {
      res.json({
        status: '0',
        msg: 'app添加成功',
        result: doc
      })
    } else {
      res.json({
        status: '1',
        msg: 'app添加失败',
        result: ''
      })
    }
  })
})

// delete app
router.post('/deleteApp', (req, res, next) => {
  Apps.findByIdAndUpdate(req.body._id, {status: 0}, (err, doc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else if (doc) {
      res.json({
        status: '0',
        msg: '删除成功',
        result: doc
      })
    } else {
      res.json({
        status: '1',
        msg: 'not both',
        result: ''
      })
    }
  })
})

// 添加appId到cookie
router.post('/editApp', (req, res, next) => {
  var _id = req.body._id
  Apps.findById(_id, (err, doc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      })
    } else {
      if (doc) {
        res.cookie('appId', doc._id, {
          path: '/',
          maxAge: 1000*60*60*24
        })
        res.json({
          status: '0',
          msg: 'OK COOKIE',
          result: ''
        })
      } else if (!doc) {
        console.log('***************not both***************')
        res.json({
          status: '1',
          msg: 'failed resquest',
          result: ''
        })
      }
    }
  })
})

// 向app中添加colsList和componentsList
router.post('/updateList', (req, res, next) => {
  let colsList = req.body.colsList
  let componentsList = req.body.componentsList
  let appId = req.cookies.appId
  // console.log('********debugger**********')
  // console.log('colsList: '+colsList)
  // console.log(colsList)

  Apps.findById(appId, (err, doc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else if (doc) {
      
      // console.log('doc.componentsList'+doc.componentsList)
      doc.componentsList = doc.componentsList.concat(componentsList)
      // console.log('doc.componentsList'+doc.componentsList)
      doc.colsList = doc.colsList.concat(colsList)
      doc.save()
      res.json({
        status: '0',
        msg: '保存成功',
        result: ''
      })
    }
  })
})

module.exports = router;
