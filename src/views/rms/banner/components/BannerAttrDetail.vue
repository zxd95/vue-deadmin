<template>
  <div style="margin-top: 50px">
    <el-form :model="value" ref="productAttrForm" label-width="120px" style="width: 720px" size="small">
      <el-form-item label="海报相册：">
        <multi-upload v-model="selectProductPics"></multi-upload>
      </el-form-item>
      <el-form-item style="text-align: center">
        <el-button type="primary" size="medium" @click="handleFinishCommit">完成，提交海报</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import MultiUpload from '@/components/Upload/multiUpload'

  export default {
    name: "BannerAttrDetail",
    props: {
      value: {
        type: Object,
        default: {}
      },
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    components: {
      MultiUpload
    },
    data () {
      return {
        selectProductPics: []
      }
    },
    methods: {
      handleFinishCommit() {
        this.$emit('finishCommit', this.isEdit);
      }
    }
  }
</script>

<style scoped>
</style>
