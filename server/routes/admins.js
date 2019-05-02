var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var Users = require('../models/admins') 

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
  Users.find({}, (err, doc) => {
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
          count: doc.length,
          list: doc
        }
      })
    }
  })
});

router.post('/getAdminUser', (req, res, next) => {
  let id = req.cookies.adminId
  console.log('**********' + id + '**********')
  Users.findById(id, (err, doc) => {
    if (err) {
      console.log('************************error************************')
      res.json({
        status: '1',
        msg: 'err.message'
      })
    } else if (doc) {
      console.log('************************doc************************')
      res.json({
        status: '0',
        msg: 'success',
        result: doc
      })
    } else {
      console.log('************************not both************************')
    }
  })
})

router.post('/powerClose', (req, res, next) => {
  let _id = req.body._id
  Users.findOneAndUpdate(_id, {status: 1}, (err, doc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err,
        result: ''
      })
    } else {
      res.json({
        status: '0',
        msg: '关闭权限操作成功',
        result: doc
      })
    }
  })
})
router.post('/powerOpen', (req, res, next) => {
  let _id = req.body._id
  Users.findOneAndUpdate(_id, {status: 0}, (err, doc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err,
        result: ''
      })
    } else {
      res.json({
        status: '0',
        msg: '打开权限操作成功',
        result: doc
      })
    }
  })
})

router.post('/login', (req, res, next) => {
  let param = {
    userName: req.body.userName,
    pwd: req.body.pwd
  }
  Users.findOne(param, (err, doc) => {
    if (err) {
    // console.log('************************error************************')
      res.json({
        status: '1',
        msg: err.message
      })
    } else if (doc) {
      // console.log('************************doc************************')
      // if (doc.status == 1) {
      //   res.json({
      //     status: '1',
      //     msg: '该管理员不再具有权限'
      //   })
      //   return
      // }
      res.cookie('adminId', doc._id, {
        path: '/',
        maxAge: 1000*60*60
      })
      res.cookie('adminName', doc.userName, {
        path: '/',
        maxAge: 1000*60*60
      })
      res.json({
        status: '0',
        msg: '',
        result: {
          userName: doc.userName
        }
      })
    } else if (!doc) {
      // console.log('************************not both************************')
      res.json({
        status: '1',
        msg: '用户不存在',
        result: ''
      })
    }
  })
})

router.post('/logout', (req, res, next) => {
  res.cookie('adminId', '', {
    path: '/',
    maxAge: 0
  })
  res.cookie('adminName', '', {
    path: '/',
    maxAge: 0
  })
  res.json({
    status: '0',
    msg: '登出成功',
    result: ''
  })
})

router.get('/checkLogin', (req, res, next) => {
  if (req.cookies.adminId) {
    res.json({
      status: '0',
      msg: '',
      result: req.cookies.userName || ''
    })
  } else {
    res.json({
      status: '1',
      msg: '未登录',
      result: ''
    })
  }
})

module.exports = router;
