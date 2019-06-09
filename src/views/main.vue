<template>
  <el-container>
    <el-header style="background-color: #545c64;height=20px">
      <my-header style="color:white"></my-header>
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
              输入框
              <el-tooltip class="item right" effect="dark" content="添加" placement="right">
                <el-button type="text" icon="el-icon-circle-plus-outline" @click="addInputDialogVisible = true"></el-button>
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
                <el-button type="text" icon="el-icon-circle-plus-outline" @click="addButtonDialogVisible = true"></el-button>
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
          <el-menu-item @click="help()">HELP</el-menu-item>
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
        <!-- TODO: 添加radio -->
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

    <!-- 添加Button -->
    <el-dialog title="添加按钮" :visible.sync="addButtonDialogVisible">
      <el-form :model="commonUseForm">
        <el-form-item label="位置" label-width="120px">
          <el-input v-model="commonUseForm.position" auto-complete="off" placeholder="输入位置（例如r1c1代表第一行第一列）"></el-input>
        </el-form-item>
        <el-form-item label="文字" label-width="120px">
          <el-input v-model="commonUseForm.text" auto-complete="off" placeholder="button名称"></el-input>
        </el-form-item>
        <el-form-item label="尺寸" label-width="120px">
          <el-radio v-model="commonUseForm.size" label="medium">medium</el-radio>
          <el-radio v-model="commonUseForm.size" label="small">small</el-radio>
          <el-radio v-model="commonUseForm.size" label="mini">mini</el-radio>
        </el-form-item>
        <el-form-item label="类型" label-width="120px">
          <el-radio v-model="commonUseForm.type" label="primary">主要按钮</el-radio>
          <el-radio v-model="commonUseForm.type" label="success">成功按钮</el-radio>
          <el-radio v-model="commonUseForm.type" label="warning">警告按钮</el-radio>
          <el-radio v-model="commonUseForm.type" label="danger">危险按钮</el-radio>
          <el-radio v-model="commonUseForm.type" label="info">信息按钮</el-radio>
          <el-radio v-model="commonUseForm.type" label="text">文字按钮</el-radio>
        </el-form-item>
        <el-form-item label="样例" label-width="120px">
          <el-row>
            <el-button size="mini">朴素按钮</el-button>
            <el-button type="primary" size="mini">主要按钮</el-button>
            <el-button type="success" size="mini">成功按钮</el-button>
            <el-button type="info" size="mini">信息按钮</el-button>
          </el-row>
          <el-row>
            <el-button type="warning" size="mini">警告按钮</el-button>
            <el-button type="danger" size="mini">危险按钮</el-button>
          </el-row>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addButtonDialogVisible = false">取消</el-button>
        <el-button @click="addBtn">确定</el-button>
      </div>
    </el-dialog>

    <!-- 添加文本框 -->
    <el-dialog title="添加输入框" :visible.sync="addInputDialogVisible">
      <el-form :model="commonUseForm">
        <el-form-item label="位置" label-width="120px">
          <el-input v-model="commonUseForm.position" auto-complete="off" placeholder="输入位置（例如r1c1代表第一行第一列）"></el-input>
        </el-form-item>
        <el-form-item label="提示" label-width="120px">
          <el-input v-model="commonUseForm.placeholder" auto-complete="off" placeholder="即placeholder"></el-input>
        </el-form-item>
        <el-form-item label="类型" label-width="120px">
          <el-radio v-model="commonUseForm.type" label="text">text</el-radio>
          <el-radio v-model="commonUseForm.type" label="textarea">textarea</el-radio>
        </el-form-item>
        <!-- <el-form-item label="是否可清空" label-width="120px">
          <el-radio v-model="commonUseForm.reserve1" label="text">text</el-radio>
          <el-radio v-model="commonUseForm.reserve1" label="textarea">textarea</el-radio>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addInputDialogVisible = false">取消</el-button>
        <el-button @click="addInput">确定</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>
<script>
import axios from 'axios'
import Vue from 'vue'
import MyHeader from '@/components/VHeader'
import VHeader from '@/pieces/WPHeader'
import VFooter from '@/pieces/WPFooter'
export default {
  data () {
    return {
      userName: 'Jack',
      text: '',
      isCollapse: true,
      dateValue: new Date(),
      addColDialogVisible: false,
      addHeaderDialogVisible: false,
      addFooterDialogVisible: false,
      addCalenderDialogVisible: false,
      addButtonDialogVisible: false,
      addInputDialogVisible: false,
      colForm: {
        row: '',
        span: '',
        offset: ''
      },
      cols: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      commonUseForm: {
        position: '',
        text: '',
        model: '',
        size: '',
        type: '',
        placeholder: '',
        reserve1: '',
        reserve2: '',
        reserve3: '',
        reserve4: '',
        reserve5: '',
        reserve6: '',
        reserve7: ''
      },
      colsList: [],
      componentsList: [],
      i: 0,
      value: []
    }
  },
  components: {
    VHeader,
    VFooter,
    MyHeader
  },
  mounted () {
    this.getPageInfo()
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
    addToComponentsList (name, componentInfo) {
      this.componentsList.push({
        name: name,
        position: componentInfo.position,
        text: componentInfo.text,
        model: componentInfo.model,
        size: componentInfo.size,
        type: componentInfo.type,
        placeholder: componentInfo.placeholder,
        reserve1: componentInfo.reserve1,
        reserve2: componentInfo.reserve2,
        reserve3: componentInfo.reserve3,
        reserve4: componentInfo.reserve4,
        reserve5: componentInfo.reserve5,
        reserve6: componentInfo.reserve6,
        reserve7: componentInfo.reserve7
      })
    },
    addHeader () {
      this.addHeaderDialogVisible = false
      var Header = Vue.extend(VHeader)
      let newHeader = new Header().$mount()
      document.getElementById(this.commonUseForm.position).appendChild(newHeader.$el)

      // 添加到数组中
      this.addToComponentsList('addHeader', this.commonUseForm)
    },
    addFooter () {
      let Footer = Vue.extend(VFooter)
      let newFooter = new Footer({
        propsData: {
          userName: this.userName
        }
      }).$mount()
      document.getElementById(this.commonUseForm.position).appendChild(newFooter.$el)
      this.addFooterDialogVisible = false

      // 添加到数组中
      this.addToComponentsList('addFooter', this.commonUseForm)
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
      this.addToComponentsList('addCalender', this.commonUseForm)
    },
    addBtn () {
      let Button = Vue.extend({
        template: '<el-button type="' + this.commonUseForm.type + '" size="' + this.commonUseForm.size + '">click</el-button>',
        props: ['text']
      })
      let newBtn = new Button().$mount()
      document.getElementById(this.commonUseForm.position).appendChild(newBtn.$el)
      this.addToComponentsList('addButton', this.commonUseForm)

      this.addButtonDialogVisible = false
    },
    addInput () {
      let Input = Vue.extend({
        template: '<el-input type="' + this.commonUseForm.type + '" placeholder="' + this.commonUseForm.placeholder + '" v-model="' + this.value[this.i] + '"></el-input>'
      })
      let newInput = new Input().$mount()
      document.getElementById(this.commonUseForm.position).appendChild(newInput.$el)
      this.addToComponentsList('addInput', this.commonUseForm)
      this.addInputDialogVisible = false
      this.i++
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
      this.$confirm('记得保存哦, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$router.push('/webpage')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    test () {
    },
    async getPageInfo () {
      // 获取用户名
      let userinfo = axios.post('/users/getUserName').then(res => {
        if (res.data.status === '1') {
          console.error(res.data.msg)
        } else if (res.data.status === '0') {
          this.userName = res.data.result
        }
      })
      // 获取网页信息
      let appInfo = axios.post('/apps/getAppInfo').then(res => {
        if (res.data.status === '1') {
          console.error(res.data.msg)
        } else {
          this.colsList = res.data.result.colsList
          this.componentsList = res.data.result.componentsList
        }
      })
      await appInfo
      await userinfo
      this.renderWP()
    },
    renderWP () {
      // 渲染COL
      this.colsList.forEach(col => {
        // console.log(col)
        let row = 'r' + col.row
        let Col = Vue.extend({
          template: '<el-col :span="' + col.span + '" :offset="' + col.offset + '"><div class="grid-content bg-purple" id="' + col.id + '"></div></el-col></div>'
        })
        let newCol = new Col().$mount()
        document.getElementById(row).appendChild(newCol.$el)
      })
      this.componentsList.forEach(element => {
        if (element.name === 'addHeader') {
          var Header = Vue.extend(VHeader)
          let newHeader = new Header().$mount()
          document.getElementById(element.position).appendChild(newHeader.$el)
        } else if (element.name === 'addFooter') {
          let Footer = Vue.extend(VFooter)
          let newFooter = new Footer().$mount()
          document.getElementById(element.position).appendChild(newFooter.$el)
        } else if (element.name === 'addCalender') {
          let Calender = Vue.extend({
            template: '<el-calendar v-model="dateValue"></el-calendar>',
            props: ['dateValue']
          })
          let newCalender = new Calender().$mount()
          document.getElementById(element.position).appendChild(newCalender.$el)
        } else if (element.name === 'addButton') {
          let Button = Vue.extend({
            template: '<el-button type="' + element.type + '" size="' + element.size + '">click</el-button>',
            props: ['text']
          })
          let newBtn = new Button().$mount()
          document.getElementById(element.position).appendChild(newBtn.$el)
        } else if (element.name === 'addInput') {
          let Input = Vue.extend({
            template: '<el-input type="' + element.type + '" placeholder="' + element.placeholder + '" v-model="' + this.value[this.i] + '"></el-input>'
          })
          let newInput = new Input().$mount()
          document.getElementById(element.position).appendChild(newInput.$el)
          this.i++
        }
      })
    },
    help () {
      this.$confirm('使用说明敬请期待....', 'Help', {
        confirmButtonText: '确定'
      })
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
