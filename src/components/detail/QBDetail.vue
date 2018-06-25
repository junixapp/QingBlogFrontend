<template>
  <div>
    <transition name="move">
      <div v-show="isShow">
        <div class="title">{{blog.title}}</div>
        <div class="detail-wrapper">
          <blog-preview :content="blog.content"></blog-preview>
          <comment-edit :blog-id="blog._id" @create-comment="onCreateComment"></comment-edit>
          <comment :total="total" :list="comments"></comment>
          <div class="more-wrapper" v-show="!isHideMoreComment" @click="getNextPageComments">
            view more comment ...
          </div>
          <div class="nomore-wrapper"  v-show="isHideMoreComment">
            no more comment .
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import BlogPreview from '../blog/QBBlogPreview'
  import Comment from '../comment/CBComment'
  import CommentEdit from '../comment/CBCommentEdit'
  import CommonApi from '../../fed/api/comment'

  export default {
    name: "QBDetail",
    components: {BlogPreview, Comment, CommentEdit},
    data() {
      return {
        isShow: false,
        blog: {},
        page: 1,
        comments: [],
        total: 0,
      }
    },
    mounted() {

    },
    computed: {
      isHideMoreComment() {
        return this.comments.length === this.total;
      }
    },
    activated() {
      this.blog = this.$route.params.blog;
      setTimeout(() => {
        this.isShow = this.blog.title.length > 0;
      }, 100)
      this.getComments();
    },
    deactivated() {
      this.isShow = false;
    },
    methods: {
      getComments() {
        this.page = 1;
        CommonApi.getComments(this.page, this.blog._id, (body) => {
          if (body.code === 0) {
            this.total = body.data.total;
            this.comments = [];
            this.comments.push(...body.data.comments)
          }
        })
      },
      onCreateComment(){
        this.getComments();
      },
      getNextPageComments(){
        this.page += 1;
        CommonApi.getComments(this.page, this.blog._id, (body) => {
          if (body.code === 0) {
            this.total = body.data.total;
            this.comments.push(...body.data.comments)
          }
        })
      },
    }
  }
</script>

<style scoped lang="stylus">
  .move-enter-active, .move-leave-active
    transition: all .4s;

  .move-enter, .move-leave-to /* .fade-leave-active below version 2.1.8 */
    opacity: 0;
    transform translateY(2rem)

  .detail-wrapper
    padding 2rem 0
    margin-left 50%
    transform translateX(-50%)
    .more-wrapper
      padding: 1.5rem
      text-align center
      cursor pointer
      color #7b7790
    .nomore-wrapper
      padding: 1.5rem
      text-align center
      color #999

  .title
    padding 2rem 0
    font-size 1.8rem
    font-weight: 800;
    text-align center

</style>
