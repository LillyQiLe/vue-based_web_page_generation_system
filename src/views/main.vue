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
          <el-submenu index="0">
            <template slot="title" >
              <i class="icon iconfont ali-iconcascades"></i>
              <span slot="title">布局容器</span>
            </template>
            <el-menu-item index="0-2">
              添加col
              <el-tooltip class="item right" effect="dark" content="添加" placement="right">
                <el-button type="text" icon="el-icon-circle-plus-outline" @click="addColDialogVisible = true"></el-button>
              </el-tooltip>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="1">
            <template slot="title" >
              <i class="el-icon-brush"></i>
              <span slot="title">Header&Footer</span>
            </template>
            <el-menu-item index="1-1">
              Header
              <el-tooltip class="item right" effect="dark" content="添加" placement="right">
                <el-button type="text" icon="el-icon-circle-plus-outline" @click="addHeaderDialogVisible = true"></el-button>
              </el-tooltip>
            </el-menu-item>
            <el-menu-item index="1-2">
              Footer
              <el-tooltip class="item right" effect="dark" content="添加" placement="right">
                <el-button type="text" icon="el-icon-circle-plus-outline" @click="addFooterDialogVisible = true"></el-button>
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
              <i class="el-icon-thumb"></i>
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
          <el-submenu index="4">
            <template slot="title" >
              <i class="el-icon-s-opportunity"></i>
              <span slot="title">其他</span>
            </template>
            <el-menu-item index="4-1">
              <i class="el-icon-date"></i> 日历
              <el-tooltip class="item right" effect="dark" content="添加" placement="right">
                <el-button type="text" icon="el-icon-circle-plus-outline" @click="addCalenderDialogVisible = true"></el-button>
              </el-tooltip>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
      <el-col :span="20">
        <el-row id="r1"></el-row>
        <el-row id="r2"></el-row>
        <el-row id="r3"></el-row>
        <el-row id="r4"></el-row>
        <el-row id="r5"></el-row>
        <el-row id="r6"></el-row>
        <el-row id="r7"></el-row>
        <el-row id="r8"></el-row>
        <el-row id="r9"></el-row>
        <el-row id="r10"></el-row>
      </el-col>
    </el-row>
    <el-row type="flex" justify="end">
      <el-col :span="3">
        <el-button type="info" icon="el-icon-monitor" circle @click="scanfWP()"></el-button>
        <el-button type="info" icon="el-icon-folder" circle @click="savePage()"></el-button>
      </el-col>
    </el-row>
    <!-- 添加列 -->
    <el-dialog title="添加列" :visible.sync="addColDialogVisible">
      <el-form :model="colForm">
        <el-form-item label="row" label-width="120px">
          <el-input v-model="colForm.row" auto-complete="off" placeholder="位列第几行（从1开始到10）"></el-input>
        </el-form-item>
        <el-form-item label="span" label-width="120px">
          <el-input v-model="colForm.span" auto-complete="off" placeholder="请输入列宽（1-24）"></el-input>
        </el-form-item>
        <el-form-item label="offset" label-width="120px">
          <el-input v-model="colForm.offset" auto-complete="off" placeholder="请输入偏移量（1-24）"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addColDialogVisible = false">取消</el-button>
        <el-button @click="addCol">确定</el-button>
      </div>
    </el-dialog>

    <!-- 添加Header -->
    <el-dialog title="添加Header" :visible.sync="addHeaderDialogVisible">
      <el-form :model="commonUseForm">
        <el-form-item label="位置" label-width="120px">
          <el-input v-model="commonUseForm.position" auto-complete="off" placeholder="输入位置（例如r1c1代表第一行第一列）"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addHeaderDialogVisible = false">取消</el-button>
        <el-button @click="addHeader">确定</el-button>
      </div>
    </el-dialog>

    <!-- 添加Footer -->
    <el-dialog title="添加Footer" :visible.sync="addFooterDialogVisible">
      <el-form :model="commonUseForm">
        <el-form-item label="位置" label-width="120px">
          <el-input v-model="commonUseForm.position" auto-complete="off" placeholder="输入位置（例如r1c1代表第一行第一列）"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFooterDialogVisible = false">取消</el-button>
        <el-button @click="addFooter">确定</el-button>
      </div>
    </el-dialog>

    <!-- 添加Calender -->
    <el-dialog title="添加日历" :visible.sync="addCalenderDialogVisible">
      <el-form :model="commonUseForm">
        <el-form-item label="位置" label-width="120px">
          <el-input v-model="commonUseForm.position" auto-complete="off" placeholder="输入位置（例如r1c1代表第一行第一列）"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addCalenderDialogVisible = false">取消</el-button>
        <el-button @click="addCalender">确定</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>
<script>
import axios from 'axios'
import Vue from 'vue'
import VHeader from '@/pieces/WPHeader'
export default {
  data () {
    return {
      userName: 'Jack',
      isCollapse: true,
      dateValue: new Date(),
      addColDialogVisible: false,
      addHeaderDialogVisible: false,
      addFooterDialogVisible: false,
      addCalenderDialogVisible: false,
      colForm: {
        row: '',
        span: '',
        offset: ''
      },
      cols: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      commonUseForm: {
        position: ''
      },
      colsList: [],
      componentsList: []
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
    },
    addCol () {
      if (!this.colForm.row || this.colForm.row > 10 || this.colForm.row < 1) {
        this.$message.error({
          message: 'row不正确,应为1~10'
        })
        return 0
      }
      if (!this.colForm.span || this.colForm.span > 24 || this.colForm.span < 1) {
        this.$message.error({
          message: 'span不正确,应为1~24'
        })
        return 0
      }
      if (!this.colForm.offset || this.colForm.offset > 24 || this.colForm.offset < 0) {
        this.$message.error({
          message: 'offset不正确,应为0~24'
        })
        return 0
      }
      if (parseInt(this.colForm.offset) + parseInt(this.colForm.span) > 24) {
        this.$message.error({
          message: 'span与offset之和应小于24'
        })
        return 0
      }
      this.addColDialogVisible = false
      // 生成col div的id
      let colN = this.cols[this.colForm.row] + 1
      let id = 'r' + this.colForm.row + 'c' + colN
      // 生成col挂载到的row id
      let row = 'r' + this.colForm.row
      let Col = Vue.extend({
        template: '<el-col :span="' + this.colForm.span + '" :offset="' + this.colForm.offset + '"><div class="grid-content bg-purple" id="' + id + '"></div></el-col></div>'
      })
      let newCol = new Col().$mount()
      document.getElementById(row).appendChild(newCol.$el)
      this.cols[this.colForm.row] += 1
      // 添加到数组中,深拷贝
      let colsInfo = {
        row: this.colForm.row,
        span: this.colForm.span,
        offset: this.colForm.offset,
        id: id
      }
      let copyColForm = Object.assign({}, colsInfo)
      this.colsList.push(copyColForm)
    },
    addToComponentsList (name, position) {
      this.componentsList.push({
        name: name,
        position: position
      })
    },
    addHeader () {
      this.addHeaderDialogVisible = false
      var Header = Vue.extend(VHeader)
      let newHeader = new Header().$mount()
      document.getElementById(this.commonUseForm.position).appendChild(newHeader.$el)

      // 添加到数组中
      this.addToComponentsList('addHeader', this.commonUseForm.position)
    },
    addFooter () {
      let Footer = Vue.extend({
        template: '<div><i class="el-icon-location"></i>' + this.userName + '</div>'
      })
      let newFooter = new Footer().$mount()
      document.getElementById(this.commonUseForm.position).appendChild(newFooter.$el)
      this.addFooterDialogVisible = false

      // 添加到数组中
      this.addToComponentsList('addFooter', this.commonUseForm.position)
    },
    addCalender () {
      let Calender = Vue.extend({
        template: '<el-calendar v-model="dateValue"></el-calendar>',
        props: ['dateValue']
      })
      let newCalender = new Calender().$mount()
      document.getElementById(this.commonUseForm.position).appendChild(newCalender.$el)
      this.addCalenderDialogVisible = false

      // 添加到数组中
      this.addToComponentsList('addCalender', this.commonUseForm.position)
    },
    savePage () {
      axios.post('/apps/updateList', {
        colsList: this.colsList,
        componentsList: this.componentsList
      }).then(res => {
        if (res.data.status === '0') {
          this.$message({
            message: res.data.msg,
            type: 'success'
          })
        } else {
          this.$message.error({
            message: res.data.msg
          })
        }
      })
    },
    scanfWP () {
      this.$router.push('/webpage')
    },
    test () {
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
