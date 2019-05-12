 <template>
  <div>
    <el-container>
      <el-main>
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <h3>网页管理</h3>
            <el-divider></el-divider>
            <div class="grid-content">
              <el-table :data="apps" stripe style="width: 100%">
                <el-table-column prop="appName" label="应用" width="580"></el-table-column>
                <!-- <el-table-column prop="userName" label="用户名" width="380"></el-table-column> -->
                <el-table-column label="操作"  fixed="right" width="180">
                  <template slot-scope="scope">
                    <el-button type="primary" round @click="webPageInfo(scope.row)" size="small">详情</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-col>
        </el-row>
        <br>
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <el-row type="flex" justify="end">
              <el-col :span="15">
                <div class="grid-contente">
                  <el-pagination
                    background
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
          </el-col>
        </el-row>
      </el-main>
      <el-footer>
        <v-footer></v-footer>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import axios from 'axios'
import VFooter from '@/components/VFooter'
export default {
  data () {
    return {
      apps: [],
      total: 40,
      currentPage: 1,
      pageSize: 6
    }
  },
  components: {
    VFooter
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
      // await aa
      // this.apps.forEach(element => {
      //   axios.post('/users/getUserName', {
      //     _id: element.userId
      //   }).then(res => {
      //     let response = res.data
      //     if (response.status === '1') {
      //       this.$message.error({
      //         message: res.data.msg
      //       })
      //     } else if (response.status === '0') {
      //       element.userName = response.result
      //     }
      //   })
      // })
      // let i = 0
      // this.apps.forEach(element => {
      //   console.log(i + ': ')
      //   console.log(this.apps[i])
      //   i++
      // })
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getApps(val)
      // console.log(`当前页：${val}`)
    },
    webPageInfo (val) {
      axios.post('/apps/editApp', {
        _id: val._id
      }).then(res => {
        let response = res.data
        if (response.status === '1') {
          this.$message.error({
            message: response.msg
          })
        } else if (response.status === '0') {
          this.$router.push('/webpage')
        }
      })
    }
  }
}
</script>
