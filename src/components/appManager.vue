<template>
  <div>
    <el-container>
      <el-main>
        <h1>网页管理</h1>
        <el-row type="flex" justify="center">
          <el-col :span="12" :offset="6">
            <div class="grid-content">
              <el-table :data="apps" stripe style="width: 100%">
                <el-table-column prop="appName" label="应用" width="180"></el-table-column>
                <el-table-column prop="appId" label="应用ID" width="180"></el-table-column>
                <el-table-column prop="_id" label="操作" width="180"></el-table-column>
              </el-table>
            </div>
          </el-col>
        </el-row>
        <br>
        <el-row type="flex" justify="center">
          <el-col :span="4" :offset="10">
            <div class="grid-contente">
              <el-pagination
                background
                :pager-count="paperCount"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                layout="prev, pager, next"
                :total="total"
                :page-size="pageSize"
                >
              </el-pagination>
            </div>
          </el-col>
        </el-row>
      </el-main>
      <el-footer>footer</el-footer>
    </el-container>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      apps: [],
      total: 40,
      currentPage: 1,
      paperCount: 3,
      pageSize: 6
    }
  },
  mounted () {
    this.getApps(this.currentPage)
  },
  methods: {
    getApps (val) {
      axios.get('/apps', {
        params: {
          currentPage: val
        }
      }).then((res) => {
        this.apps = res.data.result.list
        this.total = res.data.result.count
      }).catch(error => {
        console.log(error)
      })
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getApps(val)
      // console.log(`当前页：${val}`)
    }
  }
}
</script>
