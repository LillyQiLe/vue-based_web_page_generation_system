var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var Users = require('../models/users') 

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
  let userCount
  Users.find().count((err, count) => {
    userCount = count
  })
  Users.find().skip(skip).limit(pageSize).exec((err, doc) => {
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
          count: userCount,
          list: doc
        }
      })
    }
  })
});

//TODO
// router.post('/getuser', (req, res, next) => {
//   let id = req.param("_id")
//   Users.find({})
// })

router.post('/register', (req, res, next) => {
  var param = {
    userName: req.body.userName,
    pwd: req.body.pwd,
    appList: [],
    status: "active"
  }
  // Users.findOne(param, (err, doc) => {
  //   if (err) {
  //    next()
  //   } else {
  //     res.json({
  //       status: '1',
  //       msg: '用户已存在',
  //       result: doc
  //     })
  //   }
  // })
  new Users(param).save((err, doc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      })
    } else {
      res.json({
        status: '0',
        msg: '',
        result: ''
      })
    }
  })
})

router.post('/login', (req, res, next) => {
  var param = {
    userName: req.body.userName,
    pwd: req.body.pwd
  }
  Users.findOne(param, (err, doc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      })
    } else {
      if (doc) {
        res.cookie('userId', doc._id, {
          path: '/',
          maxAge: 1000*60*60
        })
        res.cookie('userName', doc.userName, {
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
      }
    }
  })
})

router.post('/logout', (req, res, next) => {
  res.cookie('userId', '', {
    path: '/',
    maxAge: 0
  })
  res.cookie('userName', '', {
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
  if (req.cookies.userId) {
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
