<template>
  <div class="list-wrapper">
    <div class="table-wrapper">
      <el-table
        :data="blogs"
        style="width: 100%">
        <el-table-column
          type="index"
          header-align="center"
          align="center"
          sortable
          width="50">
        </el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          prop="title"
          label="标题"
          width="250">
        </el-table-column>

        <el-table-column
          header-align="center"
          align="center"
          label="标签">
          <template slot-scope="scope">
            <span class="tag-wrapper">
              <el-tag
                v-for="(tag, index) in scope.row.tags"
                type="success" size="small"
                :key="index">{{tag}}</el-tag>
            </span>
          </template>
        </el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          prop="readCount"
          width="100"
          label="阅读量">
        </el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          prop="updatedAt"
          width="200"
          :formatter="formatDate"
          label="更新时间">
        </el-table-column>
        <el-table-column label="操作"
                         header-align="center"
                         width="250"
                         align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.$index)">编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page-wrapper">
      <el-pagination
        background
        layout="prev, pager, next"
        :current-page="page"
        @current-change="handleCurrentChange"
        :total="totalNum">
      </el-pagination>
    </div>

    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      width="30%"
      center>
      <h1 class="dialog-content">确定要删除这篇Blog么？</h1>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="danger" @click="doDelete">确 定</el-button>
      </span>
    </el-dialog>

  </div>

</template>

<script>
  import BlogApi from '../../api/blog'

  export default {
    name: "QBBlogList",
    data() {
      return {
        blogs: [],
        page: 1,
        totalNum: 0,
        centerDialogVisible: false,
        deleteIndex: -1
      }
    },
    mounted() {
      this.getBlogList()
    },
    methods: {
      getBlogList() {
        BlogApi.getBlogs(this.page, (data) => {
          this.totalNum = data.data.total
          this.blogs = []
          this.blogs.push(...data.data.blogs)
        })
      },
      handleEdit(index) {
        //进入编辑界面
        this.$emit("editBlog", this.blogs[index])
      },
      handleDelete(index) {
        //弹出确认对话框
        this.centerDialogVisible = true
        this.deleteIndex = index;
      },
      doDelete() {
        this.centerDialogVisible = false
        BlogApi.deleteBlog(this.blogs[this.deleteIndex]._id, (data) => {
          this.blogs.splice(this.deleteIndex, 1)
          this.$message.success("删除成功！")
          this.deleteIndex = -1
        })
      },
      handleCurrentChange(val) {
        this.page = val
        this.getBlogList()
      },
      formatDate(row, column, cellValue) {
        return new Date(cellValue).toLocaleString()
      }
    }

  }
</script>

<style scoped lang="stylus">
  @import "../../common/stylus/mixins.styl"
  .list-wrapper
    wh(100%, 100%)
    .dialog-content
      text-align center
      font-weight: bold
      font-size 1.1rem
    .table-wrapper
      wh(100%, auto)
      .tag-wrapper
        .el-tag
          margin-left 0.2rem
          margin-top 0.2rem
    .page-wrapper
      wh(100%, auto)
      padding: 1.5rem
      text-align center
      .el-pagination.is-background .btn-next,.el-pagination.is-background .btn-prev,.el-pagination.is-background .el-pager li
        border-radius  2rem
        color red
</style>
