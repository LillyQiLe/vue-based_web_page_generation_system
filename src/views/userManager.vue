<template>
  <div>
    <el-container>
      <el-main>
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <h3>用户管理</h3>
            <el-divider></el-divider>
            <div class="grid-content">
              <el-table :data="users" stripe style="width: 100%">
                <el-table-column prop="userName" label="用户名" width="180"></el-table-column>
                <!-- <el-table-column prop="pwd" label="用户密码" width="180"></el-table-column> -->
                <el-table-column prop="status" label="用户状态" width="180"></el-table-column>
                <el-table-column width="200" label="操作" fixed="right">
                  <template slot-scope="scope">
                    <el-button @click="checkWebPage(scope.row)" type="primary" plain size="small">查看项目</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-col>
        </el-row>
        <br>
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <el-row type="flex" justify="end">
              <el-col :span="15">
                <div class="grid-contente">
                  <el-pagination background @current-change="handleCurrentChange" :current-page="currentPage" layout="prev, pager, next" :total="total" :page-size="pageSize">
                  </el-pagination>
                </div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-main>
      <el-footer>
        <v-footer></v-footer>
      </el-footer>
    </el-container>
    <el-dialog title="WebPage列表" :visible.sync="dialogTableVisible">
      <el-table :data="apps">
        <el-table-column property="appName" label="名称" width="150"></el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button @click="ViewWebPage(scope.row)" type="primary" plain size="small">浏览网页</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import VFooter from '@/components/VFooter'
export default {
  data () {
    return {
      users: [],
      total: 40,
      currentPage: 1,
      pageSize: 6,
      appList: [],
      apps: [],
      dialogTableVisible: false
    }
  },
  components: {
    VFooter
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
    },
    async checkWebPage (val) {
      let aa = axios.post('/users/getWebPageList', {
        _id: val._id
      }).then(res => {
        if (res.data.status === '1') {
          this.$message.error({
            message: res.data.msg
          })
        } else if (res.data.status === '0') {
          this.appList = []
          if (res.data.result !== '不存在') {
            this.appList = res.data.result
          }
        }
      }).catch(error => {
        console.error('error init.' + error)
      })
      // 实现同步
      await aa
      this.apps = []
      this.appList.forEach(appid => {
        axios.post('/apps/getAppInfo', {
          _id: appid
        }).then(res => {
          let response = res.data
          if (response.status === '1') {
            this.$message.error({
              message: response.msg
            })
          } else if (response.status === '0' && response.result !== '不存在') {
            this.apps.push(response.result)
            // console.log('****************** this.apps ******************' + this.apps)
          }
        })
      })
      this.dialogTableVisible = true
    },
    ViewWebPage (val) {
      console.log(val)
    }
  }
}
</script>
