<template>
  <div>
    <el-container>
      <el-main>
        <el-row :gutter="10">
          <el-col :xs="0" :sm="2" :md="4" :lg="5" :xl="8"><div class="grid-content"></div></el-col>
          <el-col :xs="24" :sm="20" :md="16" :lg="14" :xl="8">
            <h3>管理员</h3>
            <el-divider></el-divider>
            <div class="grid-content bg-purple-light">
              <el-table :data="users" stripe style="width: 100%">
                <el-table-column prop="userName" label="用户名" width="180"></el-table-column>
                <el-table-column prop="status" label="用户状态" width="180"></el-table-column>
                <el-table-column prop="level" label="等级" width="180"></el-table-column>
                <el-table-column width="200" label="操作" fixed="right">
                  <template slot-scope="scope">
                    <el-button type="danger" @click="powerClose(scope.row)" size="small">关闭权限</el-button>
                    <el-button type="danger" @click="powerOpen(scope.row)" size="small">打开权限</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-col>
          <el-col :xs="0" :sm="2" :md="4" :lg="5" :xl="8"><div class="grid-content"></div></el-col>
        </el-row>
      </el-main>

      <el-footer>
        <!-- <v-footer></v-footer> -->
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import axios from 'axios'
import VFooter from '@/components/VFooter'
export default {
  data () {
    return {
      users: [],
      userName: '',
      status: 0,
      level: ''
    }
  },
  components: {
    VFooter
  },
  mounted () {
    axios.get('/admins').then((res) => {
      this.users = res.data.result.list
      this.users.forEach((user) => {
        if (!user.status) {
          user.status = '正常'
        } else if (user.status) {
          user.status = '无权限'
        }
        if (user.level === '2') {
          user.level = '普通管理员'
        } else if (user.level === '1') {
          user.level = '高级管理员'
        }
      })
    }).catch(error => {
      console.log(error)
    })

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
  },
  methods: {
    powerClose (scope) {
      if (!this.status && this.level === '1') {
        let id = scope._id
        axios.post('/admins/powerClose', {
          _id: id
        }).then(res => {
          if (res.data.status === '1') {
            this.$message.error({
              message: res.data.msg
            })
          } else if (res.data.status === '0') {
            this.$message({
              message: res.data.msg,
              type: 'success'
            })
          }
        }).catch(error => {
          console.error('error init.' + error)
        })
      } else {
        this.$message.error({
          message: '您没有权限'
        })
      }
    },
    powerOpen (scope) {
      if (!this.status && this.level === '1') {
        let id = scope._id
        axios.post('/admins/powerOpen', {
          _id: id
        }).then(res => {
          if (res.data.status === '1') {
            this.$message.error({
              message: res.data.msg
            })
          } else if (res.data.status === '0') {
            this.$message({
              message: res.data.msg,
              type: 'success'
            })
          }
        }).catch(error => {
          console.error('error init.' + error)
        })
      } else {
        this.$message.error({
          message: '您没有权限'
        })
      }
    }
  }
}
</script>

<style>
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
