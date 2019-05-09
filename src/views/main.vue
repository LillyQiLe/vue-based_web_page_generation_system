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
            <el-menu-item index="1-1">
              Header
              <el-tooltip class="item right" effect="dark" content="添加" placement="right">
                <el-button type="text" icon="el-icon-circle-plus-outline" @click="addHeader"></el-button>
              </el-tooltip>
            </el-menu-item>
            <el-menu-item index="1-2">
              Footer
              <el-tooltip class="item right" effect="dark" content="添加" placement="right">
                <el-button type="text" icon="el-icon-circle-plus-outline" @click="addFooter"></el-button>
              </el-tooltip>
            </el-menu-item>
            <el-menu-item index="1-3">
              Aside
              <el-tooltip class="item right" effect="dark" content="添加" placement="right">
                <el-button type="text" icon="el-icon-circle-plus-outline" @click="test"></el-button>
              </el-tooltip>
            </el-menu-item>
            <el-menu-item index="1-4">
              Main
              <el-tooltip class="item right" effect="dark" content="添加" placement="right">
                <el-button type="text" icon="el-icon-circle-plus-outline" @click="test"></el-button>
              </el-tooltip>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title" >
              <i class="icon iconfont ali-iconinput"></i>
              <span slot="title">输入框</span>
            </template>
            <el-menu-item index="2-1">
              简单输入框
              <el-tooltip class="item right" effect="dark" content="添加" placement="right">
                <el-button type="text" icon="el-icon-circle-plus-outline" @click="test"></el-button>
              </el-tooltip>
            </el-menu-item>
            <el-menu-item index="2-2">
              密码输入框
              <el-tooltip class="item right" effect="dark" content="添加" placement="right">
                <el-button type="text" icon="el-icon-circle-plus-outline" @click="test"></el-button>
              </el-tooltip>
            </el-menu-item>
            <el-menu-item index="2-3">
              邮箱输入框
              <el-tooltip class="item right" effect="dark" content="添加" placement="right">
                <el-button type="text" icon="el-icon-circle-plus-outline" @click="test"></el-button>
              </el-tooltip>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title" >
              <i class="icon iconfont ali-iconcascades"></i>
              <span slot="title">按钮</span>
            </template>
            <el-menu-item index="3-1">
              <el-button type="primary" size="mini">click</el-button>
              <el-tooltip class="item right" effect="dark" content="添加" placement="right">
                <el-button type="text" icon="el-icon-circle-plus-outline" @click="test"></el-button>
              </el-tooltip>
            </el-menu-item>
            <el-menu-item index="3-2">
              <el-button type="primary" size="mini" plain>click</el-button>
              <el-tooltip class="item right" effect="dark" content="添加" placement="right">
                <el-button type="text" icon="el-icon-circle-plus-outline" @click="test"></el-button>
              </el-tooltip>
            </el-menu-item>
            <el-menu-item index="3-3">
              <el-button type="primary" size="mini" plain circle>click</el-button>
              <el-tooltip class="item right" effect="dark" content="添加" placement="right">
                <el-button type="text" icon="el-icon-circle-plus-outline" @click="test"></el-button>
              </el-tooltip>
            </el-menu-item>
            <el-menu-item index="3-3">
              <el-button type="text" size="mini" plain circle>click</el-button>
              <el-tooltip class="item right" effect="dark" content="添加" placement="right">
                <el-button type="text" icon="el-icon-circle-plus-outline" @click="test"></el-button>
              </el-tooltip>
            </el-menu-item>
            <el-menu-item index="3-4">
              <el-button size="mini">click</el-button>
              <el-tooltip class="item right" effect="dark" content="添加" placement="right">
                <el-button type="text" icon="el-icon-circle-plus-outline" @click="test"></el-button>
              </el-tooltip>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
      <el-col :span="20">
        <el-row>
          
        </el-row>
      </el-col>
    </el-row>
    <el-row type="flex" justify="end">
      <el-col :span="1">
        <el-button type="info" icon="el-icon-folder" circle @click="savePage()"></el-button>
      </el-col>
    </el-row>
  </el-container>
</template>
<script>
import Vue from 'vue'
import VHeader from '@/pieces/WPHeader'
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
  computed: {
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
      var Profile = Vue.extend(VHeader)
      new Profile().$mount('#mount-point')
      // document.getElementById('here').innerHTML = '<el-header style="background-color: #545c64;height=20px"><v-header style="color:white"></v-header></el-header>'
    },
    addFooter () {
      var Profile = Vue.extend(VFooter)
      new Profile().$mount('#mount-point')
    },
    addAside () {
      alert('hahdsjahsu')
    },
    addMain () {
      alert('hahdsjahsu')
    },
    savePage () {

    },
    test () {
      alert('afsfgafuhaegdsg')
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
.right {
  float: right;
  margin: 5px 0 0 10px;
}
</style>
