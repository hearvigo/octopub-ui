<template>
  <div class="app-container">
    <span>TODO</span>
  </div>
</template>

<script>
import { listDeploy } from '@/api/deploy'

export default {
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  created() {
    // this.fetchData()
  },
  methods: {
    fetchData() {
      const namespace = 'nonda-static-qa'
      listDeploy(namespace)
        .then(response => {
          console.log(response)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
