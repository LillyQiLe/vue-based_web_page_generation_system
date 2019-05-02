<template>
  <div>
    <el-row>
      <el-col :span="4" :offset="2"  class="wpm-border">
        <el-image :src="url"></el-image>
        <i class="el-icon-s-custom"></i>
        {{ userName }}
      </el-col>
      <el-col :span="10" :offset="1" class="wpm-border">
        <el-divider content-position="left">你的名字</el-divider>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{userName}}
        <el-divider content-position="left">你的状态</el-divider>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{status}}
        <el-divider content-position="left">你的等级</el-divider>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{level}}
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      url: '/static/imgs/head.jpg',
      userName: '',
      status: 0,
      level: ''
    }
  },
  mounted () {
    let start = document.cookie.indexOf('=') + 1
    let end = document.cookie.indexOf(';')
    let id = document.cookie.slice(start, end)
    axios.post('/admins/getAdminUser', {
      adminId: id
    }).then(res => {
      let response = res.data
      if (response.status === '1') {
        this.$message.error({
          message: response.msg
        })
      } else if (response.status === '0') {
        this.userName = response.result.userName
        if (!response.result.status) {
          this.status = '正常'
        } else {
          this.status = '受限'
        }

        if (response.result.level === '1') {
          this.level = '高级管理员'
        } else if (response.result.level === '2') {
          this.level = '普通管理员'
        }
      }
    }).catch(error => {
      console.error('error init.' + error)
    })
  }
}
</script>

<style>
.wpm-border {
  padding: 20px;
  border: 1px solid #888;
  border-radius: 2px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 1)
}
.el-image {
  margin: 0 0 10px 0;
}
</style>
