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
            <el-button type="primary" icon="el-icon-plus" circle plain></el-button>
            <el-divider></el-divider>
            <el-table :data="appList" stripe>
              <el-table-column prop="appName" label="网页"></el-table-column>
              <el-table-column label="操作" fixed="right">
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
      pageSize: 6
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
      this.getApps(val)
      // console.log(`当前页：${val}`)
    },
    webPageInfo (val) {
      console.log(val)
    },
    editWebPage (val) {

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
