<template> 
  <el-card class="form-container" shadow="never">
    <el-steps :active="active" finish-status="success" align-center>
      <el-step title="上传商品图片"></el-step>
    </el-steps>
    <banner-attr-detail
      v-show="showStatus"
      v-model="bannerParam"
      :is-edit="isEdit"
      @finishCommit="finishCommit">
    </banner-attr-detail>
  </el-card>
</template>

<script>
import BannerAttrDetail from './BannerAttrDetail';

export default {
  name: '',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  components: {
    BannerAttrDetail
  },
  data () {
    return {
      active: 0,
      showStatus: true,
      bannerParam: {}
    }
  },
  methods: {
    finishCommit(isEdit) {
      this.$confirm('是否要提交该海报', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$router.back();
      })
    }
  }
}
</script>

<style>

</style>