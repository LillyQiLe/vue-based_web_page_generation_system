<template>
  <div>
    <el-container>
      <el-main>
        <h1>用户管理</h1>
        <el-row type="flex" justify="center">
          <el-col :span="12" :offset="6">
            <div class="grid-content">
              <el-table :data="users" stripe style="width: 100%">
                <el-table-column prop="userId" label="用户Id" width="180"></el-table-column>
                <el-table-column prop="userName" label="用户名" width="180"></el-table-column>
                <!-- <el-table-column prop="pwd" label="用户密码" width="180"></el-table-column> -->
                <el-table-column prop="status" label="用户状态" width="180"></el-table-column>
              </el-table>
            </div>
          </el-col>
          <el-col :xs="0" :sm="2" :md="4" :lg="5" :xl="8"><div class="grid-content"></div></el-col>
        </el-row>
        <br>
        <el-row type="flex" justify="center">
          <el-col :span="4" :offset="10">
            <div class="grid-contente">
              <el-pagination background @current-change="handleCurrentChange" :pager-count="3" :current-page="currentPage" layout="prev, pager, next" :total="total" :page-size="pageSize">
              </el-pagination>
            </div>
          </el-col>
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
      total: 40,
      currentPage: 1,
      // pagerCount: 3,
      pageSize: 6
    }
  },
  mounted () {
    this.getUsers(this.currentPage)
  },
  methods: {
    getUsers (val) {
      axios.get('/users', {
        params: {
          currentPage: val
        }
      }).then((res) => {
        if (res.data.status === '0') {
          this.users = res.data.result.list
          this.total = res.data.result.count
        } else if (res.status === '10001') {
          this.$message({
            message: res.data.msg,
            type: 'warning'
          })
        }
      }).catch(error => {
        console.log(error)
      })
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getUsers(val)
      // console.log(`当前页：${val}`)
    }
  }
}
</script>
