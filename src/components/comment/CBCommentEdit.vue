<template>
  <div class="edit-wrapper">
    <div class="title">Publish Your Comment</div>
    <div class="input-wrapper">
      <input type="text" placeholder="type a name，not required." class="input" v-model="nickname"/>
    </div>
    <div class="input-wrapper">
      <textarea type="text" placeholder="leave a comment，support markdown syntax." class="textarea" v-model="content"/>
      <div class="error-text" v-show="errmsg">
        {{errmsg}}
      </div>
      <div class="btn-publish" @click="handleClick">Publish</div>
    </div>
  </div>
</template>

<script>
  import CommentApi from '../../fed/api/comment'

  export default {
    name: "CBCommentEdit",
    props: ['blogId'],
    data() {
      return {
        errmsg: '',
        nickname: "",
        content: ''
      }
    },
    watch: {
      content() {
        if (this.content.length > 0) {
          this.errmsg = ''
        }
      }
    },
    activated(){
    },
    deactivated(){
      this.nickname = '';
      this.content = '';
      this.errmsg = '';
    },
    methods: {
      handleClick() {
        if (this.content.length === 0) {
          this.errmsg = "content can not be empty."
          return
        }

        CommentApi.createComment(
          {
            blogId: this.blogId,
            nickname: this.nickname,
            content: this.content
          }, body => {
            this.nickname = '';
            this.content = '';
            this.$emit("create-comment")
          });
      }
    }
  }
</script>

<style scoped lang="stylus">
  .edit-wrapper
    margin-top: 3rem;
    border-top: solid 1px #ddd;
    padding: 1rem
    background-color: #f8f8f8;
    color #333
    .input-wrapper
      padding-top: .6rem;
      .input
        width: 40%;
      .error-text
        color #cd3b39
      .btn-publish
        width 10rem
        height: 1.8rem
        line-height: 1.8rem;
        text-align center
        margin-top .6rem
        color rgb(230, 230, 233)
        background-color: #7b7790;
        cursor: pointer;
        transition all .4s
        &:hover
          background-color: #646175;


</style>
