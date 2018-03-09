<template>
  <div class="edit-wrapper">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="0px">
      <el-form-item prop="title">
        <el-input type="text" v-model="ruleForm.title" auto-complete="off" placeholder="请输入博客标题"></el-input>
      </el-form-item>
      <el-form-item>
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
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          >
          </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">添加标签</el-button>
        </div>
      </el-form-item>
      <!--博客编辑区-->
      <div ref="editor" class="editor">
        {{ruleForm.content}}
      </div>

    </el-form>
    <div class="operate-wrapper">
      <el-button class="circle-button" @click="onPreviewClick" type="success">预览</el-button>
      <el-button
        class="circle-button" @click="onSaveClick" type="primary">{{getText}}
      </el-button>
    </div>

    <el-dialog
      :title="ruleForm.title"
      :visible.sync="centerDialogVisible"
      width="80%"
      center>
      <!--博客预览区-->
      <div class="ql-container ql-snow preview-wrapper">
        <div class="ql-editor" data-gramm="false" contenteditable="false" v-html="content">
          {{content}}
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import BlogApi from '../../api/blog'
  import 'quill/dist/quill.snow.css'
  import Quill from 'quill'

  let quill;

  export default {
    name: "QBBlogEdit",
    props: ["editedBlog"],
    data() {
      return {
        type: 1,// 1: 表示新添加 2：表示更新,
        centerDialogVisible: false,
        inputVisible: false,
        content: "",
        tags: [],
        inputValue: '',
        ruleForm: {
          title: ""
        },
        rules: {
          title: [
            {validator: this.validateTitle, trigger: 'blur'}
          ],
        }
      }
    },
    computed: {
      getText() {
        return this.type === 1 ? "添加" : "更新"
      }
    },
    mounted() {
      this.type = this.editedBlog ? 2: 1
      //初始化数据
      if (this.type === 2) {
        this.ruleForm.title = this.editedBlog.title
        this.tags = this.editedBlog.tags
        this.content = this.editedBlog.content
      }
      //初始化quill
      quill = new Quill(this.$refs.editor, {
        modules: {
          toolbar: [
            [{header: [1, 2, 3, false]}],
            [{'background': []} ],
            ['bold', 'italic', 'link', 'blockquote','code-block', 'image'],
            [{list: 'ordered'}, {list: 'bullet'}]
          ]
        },
        placeholder: 'Write something...',
        theme: 'snow'
      });
      quill.on('text-change', (delta, oldDelta, source) => {
        if (source === 'api') {
          this.$log("quill change from api!")
        } else if (source === 'user') {
          this.$log("quill change from user!")
          this.content = quill.root.innerHTML
        }
      });
      //初始化内容
      quill.root.innerHTML = this.content
    },
    methods: {
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
        let inputValue = this.inputValue;
        if (inputValue) {
          this.tags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      },
      onPreviewClick() {
        this.centerDialogVisible = true
      },
      onSaveClick() {
        //保存或者更新
        if(this.ruleForm.title===""){
          this.$message.error("标题不能为空")
          return
        }
        if(!this.content){
          this.$message.error("博客内容不能为空！")
          return
        }

        let blog = {
          title: this.ruleForm.title,
          tags: this.tags,
          content: this.content
        }
        if(this.type===1){
          BlogApi.addBlog(blog, (data)=>{
            this.$message.success(data.msg)
          })
        }else {
          BlogApi.updateBlog(this.editedBlog.id, blog, (data)=>{
            this.$message.success(data.msg)
          })
        }
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
      .editor
        wh(50rem, 30rem)
    .operate-wrapper
      wh(4rem, 42rem)
      margin-left 3rem
      flex-center-v()
      .circle-button
        wh(4rem, 4rem)
        border-radius 2rem
        display block
        margin-left 0
        margin-top: 3rem

  //定制quill editor样式
  .preview-wrapper
    font-size 1rem
    border 0
    margin 0 3rem

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

  .dialog-content
    wh(100%, 100%)
    word-break: break-all;
    word-wrap: break-word;

</style>
