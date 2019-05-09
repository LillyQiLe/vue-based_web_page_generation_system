<template>
  <div>
    <el-button class="loginBtn" type="text" v-text="callbackUserName" v-show="ifLogin" @click="goToHomePage"></el-button>
    <el-button class="loginBtn" type="text" v-show="ifLogin" @click="logout">登出</el-button>
    <el-button class="loginBtn" type="text" @click="logindialogVisible = true" v-show="!ifLogin">登录</el-button>
    <el-button class="loginBtn" type="text" @click="registerdialogVisible = true" v-show="!ifLogin">注册</el-button>
    <el-dialog
      title="登录"
      :visible.sync="logindialogVisible"
      width="40%"
      :before-close="handleClose">
      <div>
        <el-input placeholder="请输入用户名" v-model="userName" clearable></el-input>
        <br><br>
        <el-input placeholder="请输入密码" v-model="pwd" show-password></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="logindialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="login">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="注册"
      :visible.sync="registerdialogVisible"
      width="40%"
      :before-close="handleClose">
      <div>
        <el-input placeholder="请输入用户名" v-model="userName" clearable></el-input>
        <br><br>
        <el-input placeholder="请输入密码" v-model="pwd" show-password></el-input>
        <br><br>
        <el-input placeholder="确认密码" v-model="repwd" show-password></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="registerdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="register">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'HelloWorld',
  data () {
    return {
      logindialogVisible: false,
      registerdialogVisible: false,
      pwd: '',
      repwd: '',
      userName: '',
      callbackUserName: '',
      ifLogin: false
    }
  },
  mounted () {
    axios.get('/users/checkLogin').then((response) => {
      let res = response.data
      if (res.status === '0') {
        this.callbackUserName = res.result
        this.ifLogin = true
      }
    })
  },
  methods: {
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    register () {
      if (!this.userName || !this.pwd || !this.repwd) {
        this.$message.error({
          message: '输入不能为空'
        })
        return
      }
      if (this.pwd !== this.repwd) {
        this.$message.error({
          message: '密码不一致'
        })
        return
      }
      axios.post('/users/register', {
        userName: this.userName,
        pwd: this.pwd
      }).then(res => {
        if (res.data.status === '1') {
          this.$message.error({
            message: res.data.msg
          })
          return
        }
        if (res.data.status === '0') {
          this.$message({
            message: '注册成功',
            type: 'success'
          })
          this.registerdialogVisible = false
          // this.login()
        }
      }).catch(error => {
        console.error('error init.' + error)
      })
    },
    login () {
      if (!this.userName || !this.pwd) {
        this.$message.error({
          message: '输入不能为空'
        })
        return
      }
      axios.post('/users/login', {
        userName: this.userName,
        pwd: this.pwd
      }).then(res => {
        if (res.data.status === '1') {
          this.$message.error({
            message: '登录失败，用户名或密码有误'
          })
          return
        }
        if (res.data.status === '0') {
          this.$message({
            message: '登录成功',
            type: 'success'
          })
          this.callbackUserName = res.data.result.userName
          this.ifLogin = true
        }
      }).catch(error => {
        console.error('error init.' + error)
      })
      this.logindialogVisible = false
    },
    logout () {
      axios.post('/users/logout').then(res => {
        if (res.data.status === '0') {
          this.$message({
            message: '登出成功',
            type: 'success'
          })
          this.ifLogin = false
          this.$router.push('/')
        }
      })
    },
    goToHomePage () {
      this.$router.push('/homePage')
    }
  }
}
</script>

<style>
.loginBtn {
  line-height: 30px;
  margin: 10px;
  float: right;
  color: antiquewhite;
}
.el-button span {
  color: rgb(122, 131, 70);
}
</style>
