<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="namespace" placeholder="请选择">
        <el-option
          v-for="item in namespaceList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-button type="primary" icon="el-icon-search" @click="fetchData">Search</el-button>
      <router-link to="/app/create">
        <el-button type="primary" icon="el-icon-plus">New APP</el-button>
      </router-link>
    </div>
    <el-table
      v-loading="listLoading"
      :data="appList"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="Code">
        <template slot-scope="scope">
          {{ scope.row.appCode }}
        </template>
      </el-table-column>
      <el-table-column label="Tier" width="100">
        <template slot-scope="scope">
          {{ scope.row.appTier }}
        </template>
      </el-table-column>
      <el-table-column label="Env" width="150">
        <template slot-scope="scope">
          {{ scope.row.appEnv }}
        </template>
      </el-table-column>
      <el-table-column label="Replicas" width="100">
        <template slot-scope="scope">
          {{ scope.row.replicas }}
        </template>
      </el-table-column>
      <el-table-column label="LimitMemory" width="150">
        <template slot-scope="scope">
          {{ scope.row.resources.limitMemory }}
        </template>
      </el-table-column>
      <el-table-column label="Action" width="220">
        <template slot-scope="scope">
          <router-link :to="'/app/edit/'+ scope.row.appId" target="_blank">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
            />
          </router-link>
          <el-button
            size="mini"
            type="success"
            icon="el-icon-s-promotion"
            @click="handlePublish(scope.$index, scope.row, 1)"
          />
          <el-button
            size="mini"
            type="warning"
            icon="el-icon-close"
            @click="handlePublish(scope.$index, scope.row, 3)"
          />
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="publishData.title" :visible.sync="dialogFormVisible" width="40%">
      <el-form ref="form" :model="publishData" :rules="rules" :label-width="formLabelWidth">
        <el-form-item label="Namespace" prop="namespace">
          <el-select v-model="publishData.namespace" placeholder="Namespace" style="width: 430px" disabled>
            <el-option
              v-for="item in namespaceList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="App Code" prop="appCode">
          <el-input v-model="publishData.appCode" autocomplete="off" disabled />
        </el-form-item>
        <el-form-item v-if="publishData.appVersionVisible" label="App Version" prop="appVersion">
          <el-select
            v-model="publishData.appVersion"
            placeholder="请选择"
            :loading="publishData.appVersionLoading"
            style="width: 430px"
            @focus="handleFocus()"
          >
            <el-option
              v-for="item in publishData.imageTags"
              :key="item.imageTag"
              :label="item.imageTag"
              :value="item.imageTag"
            >
              <span>{{ item.imageTag }}</span>
              <span
                style="color: #8492a6; font-size: 13px; margin-left: 15px"
              >{{ item.imagePushedAt }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Publish Desc" prop="publishDesc">
          <el-input
            v-model="publishData.publishDesc"
            type="textarea"
            :rows="5"
            placeholder="请输入内容"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" :loading="publishData.submitLoading" @click="handleSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listApp, publishApp, listImageTag } from '@/api/deploy'

export default {
  data() {
    return {
      appList: null,
      listLoading: false,
      namespaceList: [
        {
          value: 'nonda-java-qa',
          label: 'nonda-java-qa'
        },
        {
          value: 'nonda-php-qa',
          label: 'nonda-php-qa'
        },
        {
          value: 'nonda-static-qa',
          label: 'nonda-static-qa'
        },
        {
          value: 'nonda-java-prod',
          label: 'nonda-java-prod'
        },
        {
          value: 'nonda-php-prod',
          label: 'nonda-php-prod'
        },
        {
          value: 'nonda-static-prod',
          label: 'nonda-static-prod'
        }
      ],
      namespace: 'nonda-java-qa',
      dialogFormVisible: false,
      publishData: {
        title: '',
        appId: 0,
        namespace: '',
        appName: '',
        appCode: '',
        appVersion: '',
        publishDesc: '',
        imageTags: [],
        publishType: 1,
        appVersionVisible: true,
        submitLoading: false,
        appVersionLoading: false
      },
      formLabelWidth: '120px',
      rules: {
        namespace: [
          { required: true, message: 'Please select app version', trigger: 'change' }
        ],
        appCode: [
          { required: true, message: 'Please input publish desc', trigger: 'blur' }
        ],
        appVersion: [
          { required: true, message: 'Please select app version', trigger: 'change' }
        ],
        publishDesc: [
          { required: true, message: 'Please input publish desc', trigger: 'blur' }
        ]
      }
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
      listApp(this.namespace)
        .then(response => {
          console.log(response.data)
          this.listLoading = false
          this.appList = response.data.data.items
        })
        .catch(err => {
          console.log(err)
          this.listLoading = false
        })
    },
    handlePublish(index, row, publishType) {
      if (this.$refs['form']) {
        this.$refs['form'].resetFields()
      }

      console.log(row)
      this.publishData.appId = row.appId
      this.publishData.namespace = row.namespace
      this.publishData.appCode = row.appCode
      this.publishData.appName = row.appName
      this.publishData.appVersion = ''
      this.publishData.imageTags = []
      this.publishData.publishDesc = ''
      this.publishData.publishType = publishType

      if (publishType === 3) {
        this.publishData.appVersionVisible = false
        this.publishData.title = 'Stop App'
      } else {
        this.publishData.appVersionVisible = true
        this.publishData.title = 'New Publish'
      }

      this.dialogFormVisible = true
      console.log(this.publishData)
    },
    handleFocus() {
      if (this.publishData.imageTags.length > 0) {
        return
      }
      this.publishData.imageTags = []
      this.publishData.appVersionLoading = true
      listImageTag(this.publishData.namespace, this.publishData.appName)
        .then(response => {
          console.log(response.data)
          this.publishData.imageTags = response.data.data.imageDetails
          this.publishData.appVersionLoading = false
        })
        .catch(err => {
          console.log(err)
          this.publishData.appVersionLoading = false
        })
    },
    handleSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.publishData.submitLoading = true
          console.log(this.publishData)
          publishApp(this.publishData.appId, this.publishData.appVersion, this.publishData.publishDesc, this.publishData.publishType)
            .then(response => {
              console.log(response.data)
              this.publishData.submitLoading = false
              this.dialogFormVisible = false
              this.$message({
                dangerouslyUseHTMLString: true,
                message: `publish submit success <a href="/#/publish/detail/${response.data.data}">#${response.data.data}</a>`,
                type: 'success'
              })
            })
            .catch(err => {
              console.log(err)
              this.publishData.submitLoading = false
              this.$notify.error({
                title: 'publish error',
                message: 'publish error',
                duration: 0
              })
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    formatTimestamp(timestamp) {
      const date = new Date(timestamp * 1000)
      const year = date.getFullYear()
      const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
      const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
      const min = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
      const second = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
      return year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + second
    }
  }
}
</script>

<style lang="css" scoped>
  .el-form {
    width: 550px;
  }
</style>
