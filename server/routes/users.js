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
  console.log(req.body.userName)
  console.log(req.body)
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

router.post('/logout', (req, res, next) => {
  res.cookie('userId', '', {
    path: '/',
    maxAge: 0
  })
  res.cookie('userName', '', {
    path: '/',
    maxAge: 0
  })
  res.cookie('appId', '', {
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

//获取某人的网页列表
router.post('/getWebPageList', (req, res, next) => {
  let _id = req.cookies.userId
  Users.findById(_id, (err, doc) => {
    if (err) {
      res.json({
        status: '1',
        msg: '查询失败',
        result: err
      })
    } else if (doc) {
      res.json({
        status: '0',
        msg: '查询成功',
        result: doc.appList
      })
    }
  })
})

//获取某人的网页列表(后台)
router.post('/getWebPageListBE', (req, res, next) => {
  let _id = req.body._id
  Users.findById(_id, (err, doc) => {
    if (err) {
      res.json({
        status: '1',
        msg: '查询失败',
        result: err
      })
    } else if (doc) {
      res.json({
        status: '0',
        msg: '查询成功',
        result: doc.appList
      })
    }
  })
})

//获取某人的网页列表（分页）
router.post('/getPageList', (req, res, next) => {
  let _id = req.cookies.userId
  let currentPage = req.body.currentPage
  let pageSize = 6
  let skip = (currentPage-1)*pageSize
  let appCount

  Users.findById(_id, (err, doc) => {
    if (err) {
      console.log('*************count error**************')
    } else if (doc) {
      appCount = doc.appList.length
      console.log("doc.appList.length" + doc.appList.length)
    } else {
      console.log('count failed')
    }
  })
  Users.findById(_id).exec((err, doc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.msg,
        result: '查询失败'
      })
    } else if (doc) {
      let list = []
      for (let i=skip;i<skip+pageSize&&i<appCount;i++) {
        list.push(doc.appList[i])
      }
      res.json({
        status: '0',
        msg: '查询成功',
        result: {
          appList: list,
          appCount: appCount
        }
      })
    } else {
      console.log('find failed')
      res.json({
        status: '1',
        msg: 'find failed',
        result: ''
      })
    }
  })
})

//获取某人的用户名
router.post('/getUserName', (req, res, next) => {
  let _id = req.cookies.userId
  Users.findById(_id, (err, doc) => {
    if (err) {
      res.json({
        status: '1',
        msg: '查询用户名失败',
        result: err
      })
    } else if (doc) {
      res.json({
        status: '0',
        msg: '查询用户名成功',
        result: doc.userName
      })
    }
  })
})

router.get('/getUserInfo', (req, res, next) => {
  let _id = req.cookies.userId
  Users.findById(_id, (err, doc) => {
    if (err) {
      res.json({
        status: '1',
        msg: '查询用户失败',
        result: err
      })
    } else if (doc) {
      res.json({
        status: '0',
        msg: '查询用户名成功',
        result: doc
      })
    }
  })
})

// 向某人的appList中添加
router.post('/addapp', (req, res, next) => {
  let param = {
    userId: req.body.userId,
    appId: req.body.appId
  }
  console.log('*******param********' + param)

  Users.findById(param.userId, (err, doc) => {
    if (err) {
      console.log('*******users findById ERROR********')
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else if (doc) {
      console.log('*******users findById doc push appList********' + doc.appList)
      doc.appList.push(param.appId)
      doc.save()
      console.log('*******users findById doc pushed********' + doc.appList)
      res.json({
        status: '0',
        msg: 'users->appList添加成功',
        result: ''
      })
    }
  })
})

// 删除appList中的某项
router.post('/deleteapp', (req, res, next) => {
  let param = {
    userId: req.body.userId,
    appId: req.body.appId
  }
  Users.findById(param.userId, (err, doc) => {
    if (err) {
      console.log('*******users findById ERROR********')
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else if (doc) {
      // TODO
      console.log('*******appList**********')
      console.log(doc.appList)
      doc.appList.forEach((element,index) => {
        if (element === param.appId) {
          doc.appList.splice(index,1)
        }
      });
      console.log('*******appList Later**********')
      console.log(doc.appList)
      // doc.appList.pop(param.appId)
      doc.save()
      console.log('*******users findById doc poped********' + doc.appList)
      res.json({
        status: '0',
        msg: 'users->appList删除成功',
        result: ''
      })
    }
  })
})

module.exports = router;
