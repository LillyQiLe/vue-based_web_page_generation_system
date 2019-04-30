<template>
  <div id="app">
    <el-row type="flex" justify="end">
      <el-col>
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :router="ifRouter">
          <el-menu-item @click="logout">安全退出</el-menu-item>
          <el-submenu index="2">
            <template slot="title">我的工作台</template>
            <el-menu-item index="/admin/adminManager">管理员</el-menu-item>
            <el-menu-item index="/admin/userManager">用户管理</el-menu-item>
            <el-menu-item index="/admin/appManager">网页管理</el-menu-item>
          </el-submenu>
          <el-menu-item index="/admin/personalCenter">个人中心</el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
    <router-view></router-view>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'App',
  data () {
    return {
      users: [],
      apps: [],
      activeIndex: '/admin/personalCenter',
      ifRouter: true
    }
  },
  components: {
  },
  mounted () {
    axios.get('/admins/checkLogin').then((response) => {
      let res = response.data
      if (res.status === '1') {
        this.$router.push({path: '/admin/login'})
      }
    })
    this.$router.push('/admin/personalCenter')
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log('key:' + key, 'keyPath:' + keyPath)
    },
    logout () {
      axios.post('/admins/logout').then((response) => {
        let res = response.data
        if (res.status === '0') {
          this.$router.push({path: '/admin/login'})
        }
      })
    }
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
a {
  text-decoration: none;
  color: white;
}
.el-menu--horizontal>.el-menu-item{
  float: right;
}
</style>
