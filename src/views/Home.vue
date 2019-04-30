<template>
  <div id="app">
    <el-container>
      <el-header>
        <v-header ref="myheader"></v-header>
      </el-header>

      <el-main>
        <el-carousel :interval="4000" type="card" height="300px">
          <el-carousel-item v-for="item in imgs" :key="item.id">
            <img :src="item.imgpath" style="width: 100%;height: 100%" fit="fill">
            <!-- <el-image style="width: 100%;height: 100%" :src="item.imgpath"></el-image> -->
            <!-- <el-image
              style="width: 100px; height: 100px"
              :src="url"
              :fit="fit"></el-image> -->
          </el-carousel-item>
        </el-carousel>
        <br>
         <el-row>
           <el-col :span="4" :offset="4">
             <div class="grid-content">
               <h1 class="logo">WPM</h1>
             </div>
           </el-col>
           <el-col :span="8" :offset="2">
             <div class="grid-content">
                <br>
                <h1 class="logo2">简单、快捷</h1>
                <br>
                <el-button type="info" plain class="mybtn" @click="startMaker">开始制作网页</el-button>
             </div>
           </el-col>
         </el-row>
        <!-- <my-input :span="10" :placeholder="msg" :input='input'></my-input> -->
      </el-main>

      <el-footer>
        <v-footer></v-footer>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import '@/assets/css/logo.css'
import VHeader from '@/components/VHeader'
import VFooter from '@/components/VFooter'
import MyInput from '@/pieces/input'
import axios from 'axios'
export default {
  name: 'App',
  data () {
    return {
      msg: 'hjahsj',
      imgs: [
        {id: 0, imgpath: '/static/imgs/1.jpg'},
        {id: 1, imgpath: '/static/imgs/2.jpg'},
        {id: 2, imgpath: '/static/imgs/3.jpg'},
        {id: 3, imgpath: '/static/imgs/4.jpg'},
        {id: 4, imgpath: '/static/imgs/5.jpg'},
        {id: 5, imgpath: '/static/imgs/6.jpg'}
      ]
    }
  },
  components: {
    VHeader,
    MyInput,
    VFooter
  },
  mounted () {
  },
  methods: {
    test () {
      axios.get('/users').then(response => {
        let res = response.data
        console.log(res)
        if (res.status !== '0') {
          this.$message.error({
            message: res.msg
          })
        }
      })
    },
    startMaker () {
      axios.get('/users/checkLogin').then(res => {
        let response = res.data
        if (response.status === '0') {
          this.$router.push('/workspace')
        } else {
          this.$message.error({
            message: response.msg
          })
          this.$refs.myheader.logindialogVisible = true
        }
      })
    }
  }
}
</script>

<style>
.logo {
    font-family: 'Times New Roman', Times, serif;
    font-size: 62px;
    color: lightslategrey;
}
.logo2 {
  font-family: 'Times New Roman', Times, serif;
  font-size: 50px;
  color: lightslategrey;
}
.mybtn {
  width: 60%;
}
</style>
