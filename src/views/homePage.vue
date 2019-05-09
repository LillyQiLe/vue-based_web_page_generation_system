<template>
    <div>
      <el-row type="flex" justify="center">
        <el-col :span="24">
          <v-header></v-header>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center" :gutter="40">
        <el-col :xs="0" :sm="5" :md="5" :lg="4" :xl="3" class="wpm-border">
          <div class="grid-content">
            <el-image :src="url"></el-image>
            <div class="leftInfo">
              <i class="el-icon-user-solid"></i>
              {{ userName }}
              <i class="el-icon-s-opportunity"></i>
              {{ status }}
            </div>
          </div>
        </el-col>
        <el-col :xs="20" :sm="16" :md="14" :lg="14" :xl="12">
          <div class="grid-content wpm-border2">
            <el-button type="primary" icon="el-icon-plus" circle plain @click="addAppVisible = true"></el-button>
            <el-divider></el-divider>
            <el-table :data="appList" stripe>
              <el-table-column prop="appName" label="网页"></el-table-column>
              <el-table-column prop="registertime" label="时间"></el-table-column>
              <el-table-column width="300" label="操作" fixed="right">
                <template slot-scope="scope">
                  <el-button type="primary" plain round @click="webPageInfo(scope.row)" size="small">浏览</el-button>
                  <el-button type="primary" plain round @click="editWebPage(scope.row)" size="small">编辑</el-button>
                  <el-button type="danger" plain round @click="deleteWebPage(scope.row)" size="small">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-divider></el-divider>
            <el-pagination
              background
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              layout="prev, pager, next"
              :total="total"
              :page-size="pageSize"
              >
            </el-pagination>
          </div>
        </el-col>
      </el-row>
      <el-dialog title="添加网页" :visible.sync="addAppVisible">
        <el-form :model="addAppForm">
          <el-form-item label="网页名称">
            <el-input v-model="addAppForm.appName" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addAppVisible = false">取 消</el-button>
          <el-button type="primary" @click="addApp()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
import VHeader from '@/components/VHeader'
import axios from 'axios'
export default {
  data () {
    return {
      url: '/static/imgs/head.jpg',
      userName: '',
      status: 0,
      apps: [],
      appList: [],
      total: 10,
      currentPage: 1,
      pageSize: 6,
      userId: '',
      addAppVisible: false,
      addAppForm: {
        userId: '',
        appName: ''
      }
    }
  },
  components: {
    VHeader
  },
  mounted () {
    // 获取用户信息
    axios.get('/users/getUserInfo').then(res => {
      let response = res.data
      if (response.status === '1') {
        this.$message.error({
          message: response.msg
        })
      } else if (response.status === '0') {
        this.userName = response.result.userName
        this.userId = response.result._id
        if (!response.result.status) {
          this.status = '活跃'
        } else {
          this.status = '潜水'
        }
      }
    })
    // 获取网页列表
    this.getAppList()
  },
  methods: {
    async getAppList () {
      let aa = axios.post('/users/getPageList', {
        currentPage: this.currentPage
      }).then(res => {
        if (res.data.status === '1') {
          this.$message.error({
            message: res.data.msg
          })
        } else if (res.data.status === '0') {
          this.apps = []
          // if (res.data.result !== '不存在') {
          this.apps = res.data.result.appList
          this.total = res.data.result.appCount
          // }
        }
      }).catch(error => {
        console.error('error init.' + error)
      })
      await aa
      this.appList = []
      this.apps.forEach(appid => {
        axios.post('/apps/getAppInfo', {
          _id: appid
        }).then(res => {
          let response = res.data
          if (response.status === '1') {
            this.$message.error({
              message: response.msg
            })
          } else if (response.status === '0' && response.result !== '不存在') {
            this.appList.push(response.result)
            // console.log('****************** this.apps ******************' + this.apps)
          }
        })
      })
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getAppList()
      // console.log(`当前页：${val}`)
    },
    webPageInfo (val) {
      console.log(val)
    },
    editWebPage (val) {
      axios.post('/apps/editApp', {
        _id: val._id
      }).then(res => {
        let response = res.data
        if (response.status === '1') {
          this.$message.error({
            message: response.msg
          })
        } else if (response.status === '0') {
          this.$router.push('/workspace')
        }
      })
    },
    deleteWebPage (val) {
      this.$confirm('此操作将删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.post('/apps/deleteApp', {
          _id: val._id
        }).then(res => {
          let response = res.data
          if (response.status === '1') {
            this.$message.error({
              message: response.msg
            })
          } else if (response.status === '0') {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }
        })
        axios.post('/users/deleteapp', {
          userId: this.userId,
          appId: val._id
        }).then(res => {
          let response = res.data
          if (response.status === '1') {
            this.$message.error({
              message: response.msg
            })
          } else if (response.status === '0') {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getAppList()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    async addApp () {
      this.addAppForm.userId = this.userId
      let param = {
        userId: this.userId,
        appId: ''
      }
      let flag = 0
      let aa = axios.post('/apps/addApp', this.addAppForm).then(res => {
        let response = res.data
        if (response.status === '1') {
          this.$message.error({
            message: response.msg
          })
        } else if (response.status === '0') {
          // this.$message({
          //   message: response.msg,
          //   type: 'success'
          // })
          flag++
          // console.log('response.result' + response.result)
          // console.log('response.result._id' + response.result._id)
          param.appId = response.result._id
        }
      })
      await aa
      axios.post('/users/addapp', param).then(res => {
        let response = res.data
        if (response.status === '1') {
          this.$message.error({
            message: response.msg
          })
        } else if (response.status === '0') {
          if (flag === 1) {
            this.$message({
              message: '注册成功',
              type: 'success'
            })
          }
          this.getAppList()
        }
      })
      this.addAppVisible = false
    }
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
.wpm-border2 {
  padding: 20px;
  border: 1px solid #888;
  border-radius: 2px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.5)
}
.leftInfo {
  margin: 20px;
}
.leftInfo i {
  position: relative;
  margin: 0 8px 0 8px;
}
</style>
