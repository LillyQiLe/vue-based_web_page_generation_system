<template>
  <div>
    <el-form class="form" ref="form" label-position="top" label-width="80px" :model="formData">
      <el-form-item label="用户名">
        <el-input v-model="formData.userName"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="formData.pwd"></el-input>
      </el-form-item>
      <el-form-item>
        <el-switch
          v-model="remberme"
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-text="记住我">
        </el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login" plain>登录</el-button>
        <el-button plain>注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      formData: {
        userName: '',
        pwd: ''
      },
      remberme: true
    }
  },
  mounted () {

  },
  methods: {
    login () {
      let userName = this.formData.userName
      let pwd = this.formData.pwd
      if (!userName || !pwd) {
        this.$message.error({
          message: '输入不能为空'
        })
        return
      }
      axios.post('/admins/login', {
        userName: userName,
        pwd: pwd
      }).then(res => {
        if (res.data.status === '1') {
          this.$message.error({
            message: '用户名或密码有误'
          })
          return
        }
        if (res.data.status === '0') {
          // this.$message({
          //   message: '登录成功',
          //   type: 'success'
          // })
          this.$router.push({path: '/admin'})
        }
      }).catch(error => {
        console.error('error init.' + error)
      })
    }
  }
}
</script>

<style>
.form {
  margin: 10% 30%;
  padding: 39px 70px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
</style>
