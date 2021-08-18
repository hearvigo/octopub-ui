<template>
  <div class="app-container">
    <table>
      <tr>
        <td>
          <code v-html="content" />
        </td>
      </tr>
    </table>
    <i v-if="publishing" class="el-icon-loading" />
  </div>
</template>

<script>
import { getPublishDetail } from '@/api/deploy'
export default {
  name: 'Index',
  data() {
    return {
      content: '',
      publishing: false
    }
  },
  created() {
    const publishId = this.$route.params.publishId
    this.getPublishContent(publishId)
  },
  methods: {
    getPublishContent(publishId) {
      getPublishDetail(publishId)
        .then(response => {
          console.log(response.data)
          this.content = response.data.data.replace(/\n/g, '<br/>')
          if (this.content && this.content.indexOf('complete') < 0) {
            this.publishing = true
          }
        }).catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>
/*table {*/
/*  background-color: #1f2d3d;*/
/*  color: #eef1f6;*/
/*}*/
</style>
