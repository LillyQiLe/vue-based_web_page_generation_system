<template>
  <div>
    <el-divider></el-divider>
    <div class="footer">
      <div> © 2019 </div>
      <div><i class="el-icon-reading"></i></div>
      <div><i class="el-icon-user-solid"></i>{{ userName }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['userName']
}
</script>

<style>
* {
  padding: 0px;
  margin: 0px;
}
.footer {
  /* background-color: #24292e; */
  color: #24292e;
  font-size: 14px;
  line-height: 1.5;
  padding: 16px;
  z-index: 32;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.footer div:nth-child(2) i:first-child {
  font-size: 1.7em;
}
.footer i {
  font-size: 1.3em;
}
.footer div .el-button {
  color: hsla(0,0%,100%,.7);
}
</style>
