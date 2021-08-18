<template>
  <div class="app-container">
    <el-select v-model="namespace" placeholder="请选择">
      <el-option
        v-for="item in namespaceList"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-button type="primary" icon="el-icon-search" @click="fetchData">查询</el-button>
    <el-table
      v-loading="listLoading"
      :data="podList"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="Name" width="400">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="Tier">
        <template slot-scope="scope">
          {{ scope.row.tier }}
        </template>
      </el-table-column>
      <el-table-column label="Version">
        <template slot-scope="scope">
          {{ scope.row.version }}
        </template>
      </el-table-column>
      <el-table-column label="Node" width="220" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.nodeName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="CreateTime" width="220" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.creationTimestamp }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Status">
        <template slot-scope="scope">
          <el-tag :type="getTagType(scope.row.status)">
            {{ scope.row.status }}
          </el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { listPod } from '@/api/deploy'

export default {
  data() {
    return {
      podList: [],
      listLoading: false,
      namespaceList: [
        {
          value: 'nonda-java-qa',
          label: 'nonda-java-qa'
        },
        {
          value: 'nonda-java-prod',
          label: 'nonda-java-prod'
        },
        {
          value: 'nonda-php-qa',
          label: 'nonda-php-qa'
        },
        {
          value: 'nonda-php-prod',
          label: 'nonda-php-prod'
        },
        {
          value: 'nonda-static-qa',
          label: 'nonda-static-qa'
        },
        {
          value: 'nonda-static-prod',
          label: 'nonda-static-prod'
        },
        {
          value: 'nonda-socket-qa',
          label: 'nonda-socket-qa'
        },
        {
          value: 'nonda-socket-prod',
          label: 'nonda-socket-prod'
        },
        {
          value: 'nonda-ailab-qa',
          label: 'nonda-ailab-qa'
        },
        {
          value: 'nonda-ailab-prod',
          label: 'nonda-ailab-prod'
        },
        {
          value: 'nonda-infra-resource-prod',
          label: 'nonda-infra-resource-prod'
        }
      ],
      namespace: 'nonda-java-qa'
    }
  },
  created() {
    // this.fetchData()
  },
  methods: {
    fetchData() {
      if (this.namespace === '') {
        this.$message.error('Please select namespace first')
        return
      }

      this.listLoading = true
      listPod(this.namespace)
        .then(response => {
          console.log(response.data)
          this.listLoading = false
          this.podList = response.data.data
        })
        .catch(err => {
          console.log(err)
          this.listLoading = false
        })
    },
    getTagType(status) {
      if (status === 'Running') {
        return 'success'
      }
      return 'danger'
    }
  }
}
</script>
