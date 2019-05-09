<template>
  <div>
    <button @click="add">click</button>
    <div id="mount-point"></div>
  </div>
</template>

<script>
import Vue from 'vue'
import VHeader from '@/components/VHeader'
// var Profile = Vue.extend({
//   template: '<v-header></v-header>',
//   data: function () {
//     return {
//       firstName: 'Walter',
//       lastName: 'White',
//       alias: 'Heisenberg'
//     }
//   }
// })
export default {
  methods: {
    add () {
      var Profile = Vue.extend(VHeader)
      new Profile().$mount('#mount-point')
    }
  },
  components: {
    VHeader
  }
}
</script>
