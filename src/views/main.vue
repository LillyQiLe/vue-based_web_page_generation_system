<template>
  <el-container>
    <el-header style="background-color: #545c64;height=20px">
      <v-header style="color:white"></v-header>
    </el-header>
    <el-row>
      <el-col :span=4>
        <!-- <el-radio-button @click="collapse">展开</el-radio-button> -->
        <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
          <el-radio-button :label="false" icon="el-icon-s-unfold">展开</el-radio-button>
          <el-radio-button :label="true">收起</el-radio-button>
        </el-radio-group>
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
          <el-submenu index="1">
            <template slot="title" >
              <i class="el-icon-menu"></i>
              <span slot="title">布局容器</span>
            </template>
            <el-menu-item index="1-1">Header</el-menu-item>
            <el-menu-item index="1-2">Footer</el-menu-item>
            <el-menu-item index="1-3">Aside</el-menu-item>
            <el-menu-item index="1-4">Main</el-menu-item>
            <template slot="title" >
              <i class="el-icon-menu"></i>
              <span slot="title">输入框</span>
            </template>
            <el-menu-item index="2-1">简单输入框</el-menu-item>
            <el-menu-item index="2-2">密码输入框</el-menu-item>
            <el-menu-item index="2-3">邮箱输入框</el-menu-item>
            <el-menu-item index="2-4">邮箱输入框</el-menu-item>
            <el-menu-item index="2-5">邮箱输入框</el-menu-item>
            
            <!-- <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group> -->
            <!-- <el-submenu index="1-4">
              <span slot="title">选项4</span>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu> -->
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
          <el-menu-item index="3" disabled>
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
    <el-main>
    </el-main>
    <el-footer></el-footer>
  </el-container>
</template>
<script>
import VHeader from '@/components/VHeader'
export default {
  data () {
    return {
      isCollapse: true
    }
  },
  components: {
    VHeader
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
</style>
