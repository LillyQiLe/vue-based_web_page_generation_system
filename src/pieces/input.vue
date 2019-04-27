<template>
  <div>
    <el-row>
      <el-col :span="span">
        <div class="grid-content bg-purple-dar">
          <el-input v-model="currentinput" :placeholder="placeholder"></el-input>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import '@/assets/bc.css'
export default {
  props: {
    span: {
      type: Number,
      default: 6
    },
    input: String,
    placeholder: {
      type: String,
      default: '请输入'
    }
  },
  data () {
    return {
      currentinput: this.input
    }
  }
}
</script>

<style>
.size {
  width: 50%;
}
</style>
