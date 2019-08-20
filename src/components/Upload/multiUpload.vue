<template> 
  <div>
    <el-upload
      :action="uploadUrl()"
      :data="dataObj"
      list-type="picture-card"
      :file-list="fileList"
      :on-remove="handleRemove"
      :on-success="handleUploadSuccess"
      :on-preview="handlePreview"
      :limit="maxCount"
      :on-exceed="handleExceed"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
  import {saveBannerApi} from '@/api/banner'

  let index = 0;
  export default {
    name: 'multiUpload',
    props: {
      //图片属性数组
      value: Array,
      //最大上传图片数量
      maxCount:{
        type: Number,
        default: 5
      }
    },
    data() {
      return {
        dataObj: {
          policy: '',
          signature: '',
          key: '',
          ossaccessKeyId: '',
          dir: '',
          host: ''
        },
        dialogVisible: false,
        dialogImageUrl: null
      };
    },
    computed: {
      fileList() {
        let fileList=[];
        for(let i=0;i<this.value.length;i++){
          fileList.push({url:this.value[i]});
        }
        return fileList;
      }
    },
    methods: {
      uploadUrl() {
        return '/api/watch/mall/services/batch/upload'
      },
      emitInput(fileList) {
        let value=[];
        for(let i=0;i<fileList.length;i++){
          value.push(fileList[i].url);
        }
        this.$emit('input', value)
      },
      handleRemove(file, fileList) {
        this.emitInput(fileList);
      },
      handlePreview(file) {
        this.dialogVisible = true;
        this.dialogImageUrl = file.url;
      },
      // 图片上传
      handleUploadSuccess(res, file) {
        switch (this.$store.state.app.setFlag) {
          case 'banner':
            let data1 = {
              pictureId: res.result[0].rowId,
              showOrder: ++this.$store.state.app.bannerListLength
            }
            saveBannerApi(data1).then(response => {
              let url = URL.createObjectURL(file.raw);
              this.$message({
                type: 'success',
                message: '上传成功',
                duration: 1000
              })
            })
            break;
          case 'product':
            let data2 = {
              pictureId: res.result[0].rowId,
              showOrder: ++this.$store.state.app.productListLength
            }
            this.$emit('handleSaveProduct', data2)
            break;
        }
      },
      handleExceed(files, fileList) {
        this.$message({
          message: '最多只能上传' + this.maxCount + '张图片',
          type: 'warning',
          duration: 1000
        });
      },
    }
  }
</script>
<style>

</style>
