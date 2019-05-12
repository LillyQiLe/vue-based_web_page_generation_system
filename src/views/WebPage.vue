<template>
  <div>
    <el-row>
      <el-col :span="24">
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
  </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
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
    VFooter
  },
  mounted () {
    this.getPageInfo()
  },
  methods: {
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
          template: '<el-col :span="' + col.span + '" :offset="' + col.offset + '"><div id="' + col.id + '"></div></el-col></div>'
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
          let newFooter = new Footer({
            propsData: {
              userName: this.userName
            }
          }).$mount()
          document.getElementById(element.position).appendChild(newFooter.$el)
        } else if (element.name === 'addCalender') {
          let Calender = Vue.extend({
            template: '<el-calendar class="my-border" v-model="dateValue"></el-calendar>',
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
    }
  }
}
</script>
