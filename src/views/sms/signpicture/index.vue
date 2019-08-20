<template> 
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span style="margin-right: 20px;">数据列表</span>
      <el-button
        @click="handleAddProduct()"
        size="mini"
        type="primary">
        添加
      </el-button>
      <el-button
        @click="handleDeleteProduct()"
        size="mini"
        type="danger">
        批量删除
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="productTable"
                :data="list"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                v-loading="listLoading"
                border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="商品图片" width="240" align="center">
          <template slot-scope="scope"><img style="height: 80px" :src="scope.row.pic"></template>
        </el-table-column>
        <el-table-column label="商品名称" align="center">
          <template slot-scope="scope">
            <p>{{scope.row.name}}</p>
            <p>品牌：{{scope.row.brandName}}</p>
          </template>
        </el-table-column>
        <el-table-column label="标签" width="140" align="center">
          <template slot-scope="scope">
            <p>大标志图：
              <el-switch
                disabled
                :active-value="1"
                :inactive-value="0"
                v-model="scope.row.publishStatus">
              </el-switch>
            </p>
            <p>标志图：
              <el-switch
                disabled
                :active-value="1"
                :inactive-value="0"
                v-model="scope.row.newStatus">
              </el-switch>
            </p>
            <p>推荐：
              <el-switch
                disabled
                :active-value="1"
                :inactive-value="0"
                v-model="scope.row.recommandStatus">
              </el-switch>
            </p>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160" align="center">
          <template slot-scope="scope">
            <p>
              <el-button
                size="mini"
                @click="handleUpdateProduct(scope.$index, scope.row)">编辑
              </el-button>
            </p>
            <p>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除
              </el-button>
            </p>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :page-size="listQuery.pageSize"
        :page-sizes="[5,10,15]"
        :current-page.sync="listQuery.pageNum"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import {getSignApi, deleteSignApi} from '@/api/sign';

  const defaultListQuery = {
    pageNum: 1,
    pageSize: 5,
    publishStatus: null
  };
  export default {
    name: "productList",
    data() {
      return {
        listQuery: Object.assign({}, defaultListQuery),
        list: null,
        total: null,
        listLoading: true,
        multipleSelection: [],
        productLength: ''
      }
    },
    created() {
      this.$store.commit('SET_FLAG', 'product');
      this.getList();
    },
    methods: {
      // 商品列表 
      getList() {
        getSignApi().then(response => {
          this.listLoading = false;
          this.list = response.result;
          this.total = response.result.length;
          this.total = response.result !== null ? response.result.length : 0;
          this.productLength = response.result !== null ? response.result.length : 0;
          this.$store.commit('GET_PRODUCTLISTLENGTH', this.productLength);
        });
      },
      // 添加
      handleAddProduct() {
        this.$router.push({path:'/pms/addSignpicture'});
      },
      handleSizeChange(val) {
        this.listQuery.pageNum = 1;
        this.listQuery.pageSize = val;
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val;
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      // 删除
      handleDelete(index, row){
        this.$confirm('是否要进行删除操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteProductApi(row.rowId).then(response => {
            if (response.message === 'success') {
              this.getList();
            }
          });
        });
      },
      // 批量删除
      handleDeleteProduct() {
        if (this.multipleSelection.length === 0) {
          this.$message({
            message: '批量删除功能暂未开启',
            type: 'warning'
          });
          return;
        }
        // let rowIds = this.multipleSelection.map(item => item.rowId).join(',');
        // deleteProductApi(rowIds).then(response => {
        //   if (response.message === 'success') {
        //     this.getList();
        //   }
        // });
      },
      // 编辑
      handleUpdateProduct(index,row) {
        this.$message({
          message: '编辑功能暂未开启',
          type: 'warning'
        });
        // this.$router.push({path:'/pms/updateProduct',query:{id:row.id}});
      }
    }
  }
</script>

<style scoped>
.pagination-container {
  margin-bottom: 20px;
}
</style>>
