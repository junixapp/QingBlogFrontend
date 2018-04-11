<template>
  <div class="category-wrapper">
    <div class="add-wrapper">
      <el-button type="primary" class="category-add" @click="showDialog(1)" >添加分类</el-button>
    </div>
    <div class="list-wrapper">
      <el-table
        v-loading="loading"
        :data="categories"
        style="width: 100%">

        <el-table-column
          type="index"
          header-align="center"
          align="center"
          width="80">
        </el-table-column>

        <el-table-column
          label="名称"
          header-align="center"
          align="center"
          property="name"
          width="250">
        </el-table-column>

        <el-table-column
          label="博客数量"
          header-align="center"
          align="center"
          property="blogCount"
          width="250">
        </el-table-column>

        <el-table-column
          label="更新时间"
          header-align="center"
          align="center"
          property="updatedAt"
          :formatter="formatDate"
          width="250">
        </el-table-column>

        <el-table-column label="操作"
                         header-align="center"
                         align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page-wrapper">
        <el-pagination
          background
          layout="prev, pager, next"
          :current-page="page"
          @current-change="handleCurrentChange"
          :total="totalNum">
        </el-pagination>
      </div>

    </div>

    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="40%"
      center>
      <h1 class="dialog-content" v-show="dialogType===3">您确定要删除该分类么？</h1>

      <el-form :model="form" :rules="rules" ref="form" label-position="left" class="dialog-form" v-show="dialogType!==3">
        <el-form-item label="名称" label-width="50px" prop="name">
          <el-input v-model="form.name" auto-complete="off" type="text" autofocus="true"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="danger" @click="doOK">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import CategoryApi from '../../admin/api/category'

  export default {
    name: "QBCategoryManage",
    data() {
      return {
        loading: true,
        categories: [],
        page: 1,
        totalNum: 0,
        dialogVisible: false,
        dialogType: 3,
        form:{
          name: ''
        },
        rules:{
          name: [
            { validator: this.validateName, trigger: 'blur' }
          ]
        },
        editedCategoryIndex: -1
      }
    },
    computed:{
      dialogTitle(){
        if(this.dialogType===1){
          // 添加
          return "添加分类"
        }else if(this.dialogType===2){
          // 编辑
          return "编辑分类"
        }else if(this.dialogType===3){
          // 删除
          return "提示"
        }
      }
    },
    mounted() {
      this.getAllCategory()
    },
    methods:{
      showDialog(type){
        //check login
        if(!this.$store.state.token){
          this.$router.push('login')
          return
        }

        this.dialogVisible = true
        this.dialogType = type
        //重置form数据
        this.form.name = ''
      },
      getAllCategory(){
        CategoryApi.getCategories(this.page,(data) => {
          this.categories = []
          this.categories.push(...(data.data.categories))
          this.totalNum = data.data.total
          this.loading = false
        })
      },
      addCategory(category){
        CategoryApi.addCategory(category, (data)=>{
          this.categories.push(data.data)
        })
      },
      validateName(rule, value, callback){
        if (value === '') {
          callback(new Error('请输入分类名字'));
        } else {
          callback();
        }
      },
      formatDate(row, column, cellValue) {
        return new Date(cellValue).toLocaleString()
      },
      handleCurrentChange(val) {
        this.page = val
        this.getAllCategory()
      },
      //编辑
      handleEdit(index, c){
        this.dialogVisible = true
        this.dialogType = 2;
        this.form.name = c.name
        this.editedCategoryIndex = index;
      },
      handleDelete(index, c){
        this.dialogVisible = true
        this.dialogType = 3
        this.editedCategoryIndex = index;
      },
      // 点击确定按钮，要根据dialogType来做
      doOK(){
        // 添加分类
        if(this.dialogType===1) {
          this.$refs.form.validate((valid) => {
            if (valid) {
              this.addCategory({name: this.form.name});
            } else {
              return false;
            }
          });
        }else if(this.dialogType===2) {
          //编辑
          this.$refs.form.validate((valid) => {
            if (valid) {
              CategoryApi.updateCategory(this.categories[this.editedCategoryIndex]._id, {name: this.form.name}, data=>{
                this.categories[this.editedCategoryIndex].name = this.form.name
              });
            } else {
              return false;
            }
          });
        }else if(this.dialogType===3){
          CategoryApi.deleteCategory(this.categories[this.editedCategoryIndex]._id, data=>{
            this.getAllCategory();
          });
        }

        this.dialogVisible = false;
      },
    }
  }
</script>

<style scoped lang="stylus">
  @import "../../common/stylus/mixins.styl"
  .category-wrapper
    fullwh()
    overflow-y auto
    padding:2rem
    .add-wrapper
      width 100%
      margin-bottom: .5rem;
      display flex
      justify-content flex-end
    .list-wrapper
      shadow-bg()
    .dialog-form
      margin 0 4rem

  .dialog-content
    text-align center
    font-weight: bold
    font-size 1.1rem
  .page-wrapper
    wh(100%, auto)
    padding: 1.5rem
    text-align center
</style>
