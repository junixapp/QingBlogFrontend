<template>
  <div>
    <transition name="move">
      <div v-show="isShow">
        <div class="title">{{blog.title}}</div>
        <div class="detail-wrapper">
          <blog-preview :content="blog.content"></blog-preview>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import BlogPreview from '../blog/QBBlogPreview'

  export default {
    name: "QBDetail",
    components: {BlogPreview},
    data() {
      return {
        isShow: false,
        blog: {}
      }
    },
    mounted(){

    },
    activated(){
      this.blog = this.$route.params.blog;
      setTimeout(()=>{
        this.isShow = this.blog.title.length>0;
      },100)
    },
    deactivated(){
      this.isShow = false;
    },
    methods: {}
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
    display flex
    justify-content center

  .title
    padding 2rem 0
    font-size 1.8rem
    font-weight: 800;
    text-align center

</style>
