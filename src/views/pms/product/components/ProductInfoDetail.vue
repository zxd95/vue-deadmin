<template>
  <div style="margin-top: 50px">
    <el-form :model="value" :rules="rules" ref="productInfoForm" label-width="120px" style="width: 600px" size="small">
      <el-form-item label="商品名称：" prop="name">
        <el-input v-model="value.name"></el-input>
      </el-form-item>
      <!-- <el-form-item label="商品标识：" prop="select">
        <el-select
          v-model="value.brandId"
          @change="handleBrandChange"
          placeholder="请选择标识">
          <el-option
            v-for="item in brandOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="商品价格：" prop="price">
        <el-input v-model="value.price"></el-input>
      </el-form-item>
      <el-form-item label="商品简介：" prop="outline">
        <el-input v-model="value.outline"></el-input>
      </el-form-item>
      <el-form-item label="商品描述：" prop="description">
        <el-input v-model="value.description"></el-input>
      </el-form-item>
      <el-form-item style="text-align: center">
        <el-button type="primary" size="medium" @click="handleNext('productInfoForm')">下一步，填写商品促销</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {getProduct} from '@/api/product';

  export default {
    name: "ProductInfoDetail",
    props: {
      value: Object,
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        hasEditCreated:false,
        //选中商品分类的值
        // selectProductCateValue: [],
        productCateOptions: [],
        rules: {
          name: [
            {required: true, message: '请输入商品名称', trigger: 'blur'},
            {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
          ],
          price: [
            {required: true, message: '请输入商品价格', trigger: 'blur'}
          ]
        }
      };
    },
    created() {
      console.log('fdsfdsafsfdsafdsafds', this.value)
      // this.getProductCateList();
      // this.getBrandList();
    },
    computed:{
      //商品的编号
      productId(){
        return this.value.id;
      }
    },
    watch: {
      productId:function(newValue){
        if(!this.isEdit)return;
        if(this.hasEditCreated)return;
        if(newValue===undefined||newValue==null||newValue===0)return;
        this.handleEditCreated();
      },
      selectProductCateValue: function (newValue) {
        if (newValue != null && newValue.length === 2) {
          this.value.productCategoryId = newValue[1];
          this.value.productCategoryName= this.getCateNameById(this.value.productCategoryId);
        } else {
          this.value.productCategoryId = null;
          this.value.productCategoryName=null;
        }
      }
    },
    methods: {
      //处理编辑逻辑
      handleEditCreated(){
        if(this.value.productCategoryId!=null){
          this.selectProductCateValue.push(this.value.cateParentId);
          this.selectProductCateValue.push(this.value.productCategoryId);
        }
        this.hasEditCreated=true;
      },
      // getProductCateList() {
      //   fetchListWithChildren().then(response => {
      //     let list = response.data;
      //     this.productCateOptions = [];
      //     for (let i = 0; i < list.length; i++) {
      //       let children = [];
      //       if (list[i].children != null && list[i].children.length > 0) {
      //         for (let j = 0; j < list[i].children.length; j++) {
      //           children.push({label: list[i].children[j].name, value: list[i].children[j].id});
      //         }
      //       }
      //       this.productCateOptions.push({label: list[i].name, value: list[i].id, children: children});
      //     }
      //   });
      // },
      // getBrandList() {
      //   fetchBrandList({pageNum: 1, pageSize: 100}).then(response => {
      //     this.brandOptions = [];
      //     let brandList = response.data.list;
      //     for (let i = 0; i < brandList.length; i++) {
      //       this.brandOptions.push({label: brandList[i].name, value: brandList[i].id});
      //     }
      //   });
      // },
      getCateNameById(id){
        let name=null;
        for(let i=0;i<this.productCateOptions.length;i++){
          for(let j=0;i<this.productCateOptions[i].children.length;j++){
            if(this.productCateOptions[i].children[j].value===id){
              name=this.productCateOptions[i].children[j].label;
              return name;
            }
          }
        }
        return name;
      },
      handleNext(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$emit('nextStep');
          } else {
            this.$message({
              message: '验证失败',
              type: 'error',
              duration:1000
            });
            return false;
          }
        });
      },
      handleBrandChange(val) {
        let brandName = '';
        for (let i = 0; i < this.brandOptions.length; i++) {
          if (this.brandOptions[i].value === val) {
            brandName = this.brandOptions[i].label;
            break;
          }
        }
        this.value.brandName = brandName;
      }
    }
  }
</script>

<style scoped>
</style>
