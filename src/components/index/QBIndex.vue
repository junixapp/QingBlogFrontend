<template>
  <div class="container">
    <div class="left hoverable">
      <div class="top"></div>
      <div class="bottom">
        <h1 class="name">Dance</h1>
        <h1 class="intro">
          90后，现居深圳 。<br/><br/>
          -----------------------------
          <br/><br/>
          coding is life , <br/><br/>
          I love my life , <br/><br/>
          and make a good app .
        </h1>
        <h1 class="contact">
          <div class="github-icon icon"></div>
          <div class="juejin-icon icon"></div>
        </h1>
      </div>
      <div class="avatar"></div>
      <h1 class="qingblog-link" @click="gotoQingBlogLink">@ QingBlog</h1>
    </div>
    <div class="main">
      <QBNav @onCategoryChange="getBlogByCategory"></QBNav>

      <div class="blog-list">
        <Loading :state="loadingState">
          <QBBlogItem v-for="blog in blogs" :key="blog._id" :blog="blog"></QBBlogItem>
        </Loading>
      </div>

    </div>
  </div>
</template>

<script>
  import QBNav from '../nav/QBNav'
  import QBBlogItem from '../blog/QBBlogItem'
  import BlogApi from '../../fed/api/blog'
  import Loading from '../loading/QBLoading'

  export default {
    name: "QBIndex",
    components: {
      QBNav, QBBlogItem, Loading
    },
    data() {
      return {
        page: 1,
        loadingState:0,
        blogs: []
      }
    },
    mounted() {

    },
    methods: {
      gotoQingBlogLink() {
        window.open("https://github.com/li-xiaojun/QingBlogFrontend")
      },
      getBlogByCategory(categoryId) {
        this.loadingState = 0;
        BlogApi.getBlogs(this.page, categoryId, data => {
          this.blogs = []
          this.blogs.push(...data.data.blogs);
          setTimeout(()=>{
            if(this.blogs.length===0){
              this.loadingState = 2
            }else {
              this.loadingState = 1
            }
          }, 500)
        });
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "../../common/stylus/mixins.styl"
  .container
    fullwh()
    display flex
    .left
      wh(18rem, 100%)
      position: relative
      flex-shrink 0 // 空间不足也不缩小，默认是缩小的
      .top
        height: 10rem
        background-color: #6b677d;
      .bottom
        text-align center
        padding-top: 5.5rem;
        position: relative
        .name
          font-size 2rem
          color #555
        .intro
          font-size 1rem
          color #999
          margin-top 1.5rem
        .contact
          margin-top 4rem
          display flex
          justify-content center
          .icon
            wh(2rem, 2rem)
            opacity .6
            cursor pointer
          .icon:hover
            opacity 1
          .github-icon
            bg-image("github_ico.png")
          .juejin-icon
            margin-left: 2rem;
            bg-image("juejin_ico.png")

      .qingblog-link
        position: absolute
        bottom 4rem
        color #888
        cursor pointer
        left 50%
        transform translateX(-50%)
      .qingblog-link:hover
        color #6b677d

      .avatar
        wh(8rem, 8rem)
        position: absolute
        left 50%
        transform translateX(-50%)
        top 6rem
        border .35rem solid #ffffff
        border-radius 50%
        background-image url("avatar.png")
        background-repeat no-repeat
        background-size cover

    .main
      flex-grow 1
      display flex
      flex-direction column
      background-color: #efefef;
      .blog-list
        flex-grow 1
        overflow: hidden;
        fullwh()



</style>
