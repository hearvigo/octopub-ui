<template>
  <div class="app-container">
    <el-select v-model="cmd" placeholder="请选择">
      <el-option
        v-for="item in cmdList"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-input v-model="cmd" placeholder="请输入内容" />
    <el-button type="primary" icon="el-icon-search" @click="handleExecute">执行</el-button>
    <el-input v-model="shellResult" type="textarea" :autosize="{minRows: 5, maxRows: 50}" readonly />
  </div>
</template>

<script>
import { executeShell } from '@/api/deploy'

export default {
  data() {
    return {
      appList: null,
      listLoading: false,
      shellResult: '',
      cmd: 'kubectl get pod',
      cmdList: [
        {
          label: '[k8s]get deploy',
          value: 'kubectl -n <namespace> get deploy [appName]'
        },
        {
          label: '[k8s]get pod',
          value: 'kubectl -n <namespace> get pod [appName]'
        }
      ]
    }
  },
  created() {
    //
  },
  methods: {
    handleExecute() {
      executeShell(this.cmd)
        .then(response => {
          console.log(response.data)
          this.shellResult = response.data.data.result
          this.$notify.info({
            title: '执行完成',
            message: '执行完成'
          })
        })
        .catch(err => {
          console.log(err)
          this.$notify.info({
            title: '执行异常',
            message: '执行完成'
          })
        })
      console.log()
    }
  }
}
</script>
