<template>
  <div class="edit-wrapper">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="0px">
      <el-form-item prop="title">
        <el-input type="text" v-model="ruleForm.title" auto-complete="off" placeholder="请输入博客标题" autofocus="true"></el-input>
      </el-form-item>
      <el-form-item prop="inputValue">
        <div class="tag-wrapper">
          <el-tag
            :key="tag"
            v-for="tag in tags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)">{{tag}}
          </el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="ruleForm.inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          >
          </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">添加标签</el-button>
        </div>
      </el-form-item>

      <!--分类选择-->
      <el-form-item prop="category">
      <el-select v-model="ruleForm.category" placeholder="请选择分类" v-loading="loadingCategory">
        <el-option
          v-for="item in categories"
          :key="item._id"
          :label="item.name"
          :value="item._id">
        </el-option>
      </el-select>
      </el-form-item>

      <!--markdwon语法提示区-->
      <el-popover
        ref="p1"
        placement="right"
        title=""
        width="500"
        trigger="hover"
        content="">
        <el-table :data="syntaxData">
          <el-table-column width="100" property="name" label="名称"></el-table-column>
          <el-table-column width="auto" property="syntax" label="语法">
            <template slot-scope="scope">
              <span v-html="scope.row.syntax"></span>
            </template>
          </el-table-column>
        </el-table>
      </el-popover>
      <div class="tips">请使用<b>Markdown</b>语法来编辑博客内容。
        <span v-popover:p1 class="tips-help">语法提示</span>
      </div>

      <!--博客编辑区-->
      <el-form-item prop="content" class="textarea_wrapper">
        <!--<el-input type="textarea" v-model="ruleForm.content" class="textarea" ref="textarea"></el-input>-->
        <AutosizeTextarea v-model="ruleForm.content" @textChange="onChange"></AutosizeTextarea>
      </el-form-item>


    </el-form>
    <div class="operate-wrapper">
      <el-button class="circle-button" @click="onPreviewClick" type="success">预览</el-button>
      <el-button
        class="circle-button" @click="onSaveClick" type="primary">{{getText}}
      </el-button>
    </div>

    <el-dialog
      :visible.sync="centerDialogVisible"
      width="80%"
      fullscreen
      center>
      <!--博客预览区-->
      <div class="preview ">
        <BlogPreview :content="ruleForm.content"></BlogPreview>
      </div>

      <span slot="title" v-html="dialogTitle" class="dialog-title"></span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import BlogApi from '../../admin/api/blog'
  import CategoryApi from '../../admin/api/category'
  import AutosizeTextarea from './AutosizeTextarea'
  import BlogPreview from './QBBlogPreview'



  export default {
    name: "QBBlogEdit",
    props: ["editedBlog"],
    components: {
      AutosizeTextarea, BlogPreview
    },
    data() {
      return {
        type: 1,// 1: 表示新添加 2：表示更新,
        centerDialogVisible: false,
        inputVisible: false,
        loadingCategory:true,
        tags: [],
        ruleForm: {
          title: "",
          content: "",
          inputValue: '',
          category:''
        },
        categories:[],
        rules: {
          title: [
            {validator: this.validateTitle, trigger: 'blur'}
          ],
          content: [
            {validator: this.validateContent, trigger: 'blur'}
          ],
          inputValue: [
            {validator: this.validateInput, trigger: 'blur'}
          ],
          category: [
            {validator: this.validateCategory, trigger: 'blur'}
          ]
        },
        syntaxData: [
          {
            name: '插入链接',
            syntax: '[ <b>链接的文字</b> ]( http://www.baidu.com/ )',
          },
          {
            name: '插入图片',
            syntax: '![]( <b>图片的本地路径或者url</b> )',
          },
          {
            name: '任务列表',
            syntax: '<pre><b>已完成</b>： - [x] 选项一    \n<b>未完成</b>： - [ ] 选项二</pre>',
          },
          {
            name: '表格',
            syntax: '<pre>|    a    |       b       |      c     |\n' +
            '|:-------:|:------------- | ----------:|\n' +
            '|   居中  |     左对齐    |   右对齐   |</pre>',
          },
          {
            name: '加粗',
            syntax: '**加粗的部分**',
          },
          {
            name: '斜体',
            syntax: '*斜体的部分*',
          },
        ]
      }
    },
    computed: {
      getText() {
        return this.type === 1 ? "添加" : "更新"
      },
      dialogTitle(){
        return `<h2><b>${this.ruleForm.title}</b></h2>`
      }
    },
    mounted() {
      this.type = this.editedBlog ? 2 : 1
      //初始化数据， 是编辑
      if (this.type === 2) {
        this.ruleForm.title = this.editedBlog.title
        this.tags = this.editedBlog.tags
        this.ruleForm.content = this.editedBlog.content
        // if(this.editedBlog.category){
        //   this.ruleForm.category = this.editedBlog.category._id;
        // }
      }
      // 获取categories
      CategoryApi.getAllCategories((data) => {
        this.categories.push(...data.data.categories)
        this.loadingCategory = false;

        if(this.type === 2 && this.editedBlog.category){
          this.ruleForm.category = this.editedBlog.category._id;
        }
      })

    },
    methods: {
      validateTitle(rule, value, callback) {
        if (value === '') {
          callback(new Error('请输入标题'));
        } else {
          callback()
        }
      },
      validateContent(rule, value, callback) {
        if (value === '') {
          callback(new Error('请输入内容'));
        } else {
          callback()
        }
      },
      validateInput(rule, value, callback) {
        if (this.tags.length === 0) {
          callback(new Error('至少添加一个标签'));
        } else {
          callback()
        }
      },
      validateCategory(rule, value, callback) {
        if (value === '') {
          callback(new Error('请选择博客的分类'));
        } else {
          callback()
        }
      },
      handleClose(tag) {
        this.tags.splice(this.tags.indexOf(tag), 1);
      },
      showInput() {
        this.inputVisible = true;
        this.$nextTick(() => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      handleInputConfirm() {
        let inputValue = this.ruleForm.inputValue;
        if (inputValue) {
          this.tags.push(inputValue);
        }
        this.inputVisible = false;
        this.ruleForm.inputValue = '';
      },
      onPreviewClick() {
        this.$refs.ruleForm.validateField('content', (errMsg) => {
          this.centerDialogVisible = !errMsg
        })
      },
      onSaveClick() {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            let blog = {
              title: this.ruleForm.title,
              tags: this.tags,
              content: this.ruleForm.content,
              category: this.ruleForm.category
            };
            if (this.type === 1) {
              BlogApi.addBlog(blog, (data) => {
                this.$message.success(data.msg)
              })
            } else {

              BlogApi.updateBlog(this.editedBlog._id, blog, (data) => {
                this.$message.success(data.msg)
              })
            }
          } else {
            return false;
          }
        });

      },
      onChange(val) {
        this.ruleForm.content = val;
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "../../common/stylus/mixins.styl"
  .edit-wrapper
    wh(100%, auto)
    flex-center-h()
    .el-form
      padding 2rem 0
      .el-form-item
        wh(50rem, auto)
      .tips
        color #888
        font-size 0.9rem
        margin-bottom: .5rem;
        .tips-help
          display inline-block
          background-color: #efefef;
          padding .1rem .5rem
          cursor pointer
          margin-left: .6rem;

    .preview
      wh(100%, 100%)
      padding:3rem

    .operate-wrapper
      position fixed
      wh(4rem, auto)
      right 8rem
      top: 50%;
      transform translateY(-65%)
      flex-center-v()
      .circle-button
        wh(4rem, 4rem)
        border-radius 50%
        display block
        margin-left 0
        margin-top: 3rem
        box-shadow: .04rem .05rem .04rem .04rem rgba(10, 10, 10, 0.3)

  .dialog-title
    font-size 2rem


  .el-tag
    margin-right: 0.5rem
    margin-top: 0.3rem

  .button-new-tag
    wh(6rem, 2rem)
    line-height: 2rem;
    padding-top: 0;
    padding-bottom: 0;

  .input-new-tag
    wh(6rem, 2rem)



</style>
