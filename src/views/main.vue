<template>
  <el-container>
    <el-header style="background-color: #545c64;height=20px">
      <v-header style="color:white"></v-header>
    </el-header>
    <el-row>
      <el-col :span=4>
        <button v-bind:class="{opend: !isCollapse}" class="open iconfont ali-iconbutton" @click="collapse"></button>
        <el-menu default-active="1-1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-submenu index="1">
            <template slot="title" >
              <i class="icon iconfont ali-iconcascades"></i>
              <span slot="title">布局容器</span>
            </template>
            <el-menu-item index="1-1" @click="addHeader">Header</el-menu-item>
            <el-menu-item index="1-2" @click="addFooter">Footer</el-menu-item>
            <el-menu-item index="1-3" @click="addAside">Aside</el-menu-item>
            <el-menu-item index="1-4" @click="addMain">Main</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title" >
              <i class="icon iconfont ali-iconinput"></i>
              <span slot="title">输入框</span>
            </template>
            <el-menu-item index="2-1">简单输入框</el-menu-item>
            <el-menu-item index="2-2">密码输入框</el-menu-item>
            <el-menu-item index="2-3">邮箱输入框</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
      <el-col :span="20">
      </el-col>
    </el-row>
  </el-container>
</template>
<script>
import VHeader from '@/components/VHeader'
import VFooter from '@/components/VFooter'
export default {
  data () {
    return {
      isCollapse: true
    }
  },
  components: {
    VHeader,
    VFooter
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    collapse () {
      this.isCollapse = !this.isCollapse
    },
    addHeader () {
      document.getElementById('here').innerHTML = '<el-header style="background-color: #545c64;height=20px"><v-header style="color:white"></v-header></el-header>'
    },
    addFooter () {
      document.getElementById('elFooter').innerHTML = '<v-footer><v-footer>'
      alert('hahdsjahsu')
    },
    addAside () {
      alert('hahdsjahsu')
    },
    addMain () {
      alert('hahdsjahsu')
    }
  }
}
</script>

<style>
* {
  margin: 0px;
  padding: 0px;
}
.el-row {
  margin: 0px;
}
.el-menu {
  margin: 0px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.open {
  padding: 10px 24px;
  background: #545c64;
  border: none;
  outline: none;
  color: #fff;
  /* transition: width 0.2s, padding 0.3s, transform 0.3s;
  -moz-transition: width 0.3s, padding 0.3s, -moz-transform 0.3s;
  /*-webkit-transition: width 0.3s, padding 0.3s, -webkit-transform 0.3s;
  /*-o-transition: width 0.3s, padding 0.3s, -o-transform 0.3s; */
  transition: width 0.45s;
  -moz-transition: width 0.4s;
  -webkit-transition: padding 0.37s;
  -o-transition: width 0.5s;
}
.open:active {
  color: #ffd04b;
}
.opend {
  padding: 10px 92px;
}
</style>
