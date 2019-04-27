<template>
  <div>
    <el-container>
      <el-main>
        <h1>管理员</h1>
        <el-row :gutter="10">
          <el-col :xs="0" :sm="2" :md="4" :lg="5" :xl="8"><div class="grid-content"></div></el-col>
          <el-col :xs="24" :sm="20" :md="16" :lg="14" :xl="8">
            <div class="grid-content bg-purple-light">
              <el-table :data="users" stripe style="width: 100%">
                <el-table-column prop="userName" label="用户名" width="180"></el-table-column>
                <el-table-column prop="status" label="用户状态" width="180"></el-table-column>
                <el-table-column prop="level" label="等级" width="180"></el-table-column>
                <el-table-column width="180">
                  <el-button type="danger" v-text="power" @click="lock"></el-button>
                </el-table-column>
              </el-table>
            </div>
          </el-col>
          <el-col :xs="0" :sm="2" :md="4" :lg="5" :xl="8"><div class="grid-content"></div></el-col>
        </el-row>
      </el-main>

      <el-footer></el-footer>
    </el-container>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      users: [],
      power: '权限受限'
    }
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
  },
  methods: {
    lock () {
      alert('hahhhhh')
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
