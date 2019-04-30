<template>
  <div>
    <el-row>
      <el-col :span="4">
        <el-image :src="url"></el-image>
      </el-col>
      <el-col :span="4">
        {{userName}}
        {{status}}
        {{level}}
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
      level: '1'
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
        this.status = response.result.status
        this.level = response.result.level
      }
    }).catch(error => {
      console.error('error init.' + error)
    })
  }
}
</script>
