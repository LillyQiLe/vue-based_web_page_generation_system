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
export default {
  data () {
    return {
      userName: 'Jack',
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
          let Footer = Vue.extend({
            template: '<div><i class="el-icon-location"></i>' + this.userName + '</div>'
          })
          let newFooter = new Footer().$mount()
          document.getElementById(element.position).appendChild(newFooter.$el)
        } else if (element.name === 'addCalender') {
          let Calender = Vue.extend({
            template: '<el-calendar v-model="dateValue"></el-calendar>',
            props: ['dateValue']
          })
          let newCalender = new Calender().$mount()
          document.getElementById(element.position).appendChild(newCalender.$el)
        }
      })
    }
  }
}
</script>
