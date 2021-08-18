<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.appCode" placeholder="App Code" style="width: 280px;" />
      <el-button type="primary" icon="el-icon-search" @click="handleSearch">Search</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="publishList"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="ID" width="50">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="App Code">
        <template slot-scope="scope">
          {{ scope.row.appCode }}
        </template>
      </el-table-column>
      <el-table-column label="Env" width="140">
        <template slot-scope="scope">
          {{ scope.row.appEnv }}
        </template>
      </el-table-column>
      <el-table-column label="Namespace" width="130">
        <template slot-scope="scope">
          {{ scope.row.namespace }}
        </template>
      </el-table-column>
      <el-table-column label="Version" width="150">
        <template slot-scope="scope">
          {{ scope.row.appVersion }}
        </template>
      </el-table-column>
      <el-table-column label="Start Time" width="220">
        <template slot-scope="scope">
          {{ scope.row.publishStartTime }}
        </template>
      </el-table-column>
      <el-table-column label="End Time" width="220">
        <template slot-scope="scope">
          {{ scope.row.publishEndTime }}
        </template>
      </el-table-column>
      <el-table-column label="Status" width="80">
        <template slot-scope="scope">
          {{ formatStatus(scope.row.publishStatus) }}
        </template>
      </el-table-column>
      <el-table-column label="Action" width="100">
        <template slot-scope="scope">
          <router-link :to="'/publish/detail/'+ scope.row.id" target="_blank">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-view"
            />
          </router-link>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getPublishList" />
  </div>
</template>

<script>
import { listPublish } from '@/api/deploy'
import Pagination from '@/components/Pagination'
export default {
  name: 'Index',
  components: { Pagination },
  data() {
    return {
      listLoading: false,
      publishList: [],
      total: 0,
      listQuery: {
        page: 1,
        limit: 20,
        appCode: ''
      }
    }
  },
  methods: {
    handleSearch() {
      this.listQuery.page = 1
      this.getPublishList()
    },
    getPublishList() {
      this.listLoading = true
      listPublish(this.listQuery)
        .then(response => {
          console.log(response.data)
          this.publishList = response.data.data.items
          this.total = response.data.data.total
          this.listLoading = false
        })
        .catch(err => {
          console.log(err)
          this.listLoading = false
        })
    },
    formatStatus(status) {
      const statusMap = {
        0: 'New',
        10: 'Building',
        20: 'Downloading',
        30: 'Applying',
        40: 'Checking',
        50: 'Success',
        60: 'Fail'
      }
      return statusMap[status]
    }
  }
}
</script>

<style scoped>

</style>
