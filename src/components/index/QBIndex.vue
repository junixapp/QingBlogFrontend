<template>
  <div class="wrapper">
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
            <div class="github-icon icon" @click="gotoGithub"></div>
            <div class="juejin-icon icon" @click="gotoJuejin"></div>
          </h1>
        </div>
        <div class="avatar"></div>
        <h1 class="qingblog-link" @click="gotoQingBlogLink">@ QingBlog</h1>
      </div>
      <div class="main">
        <QBNav @onCategoryChange="getBlogByCategory"></QBNav>

        <div class="blog-list">
          <Loading :state="loadingState">
            <!--博客列表-->
            <QBBlogItem v-for="blog in blogs" :key="blog._id" :blog="blog"
                        @openBlogDetail="onOpenBlogDetail"></QBBlogItem>

            <!--分页组件-->
            <Pager :totalCount="total"
                   :currentPage.sync="page"
                   @currentChange="onPageChange">
            </Pager>

          </Loading>
        </div>
      </div>
    </div>

    <!--博客详情-->

    <transition name="fade">
      <div class="shade" v-if="isShowDetail" @click="isShowDetail=false"></div>
    </transition>

    <transition name="move">
      <div class="detail-wrapper" v-if="isShowDetail">
        <i class="icon-close" @click="isShowDetail=false"></i>
        <div class="preview-wrapper" >
          <div class="blog-title">{{blogDetail.title}}</div>
          <BlogPreview :content="blogDetail.content"></BlogPreview>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import QBNav from '../nav/QBNav'
  import QBBlogItem from '../blog/QBBlogItem'
  import BlogApi from '../../fed/api/blog'
  import Loading from '../loading/QBLoading'
  import Pager from '../pagination/QBPager'
  import BlogPreview from '../blog/QBBlogPreview'

  export default {
    name: "QBIndex",
    components: {
      QBNav, QBBlogItem, Loading, Pager, BlogPreview
    },
    data() {
      return {
        page: 1,
        loadingState: 0,
        blogs: [],
        total: 0,
        categoryId: '',
        blogDetail: '',
        isShowDetail: false
      }
    },
    mounted() {

    },
    methods: {
      gotoQingBlogLink() {
        window.open("https://github.com/li-xiaojun/QingBlogFrontend")
      },
      gotoGithub() {
        window.open("https://github.com/li-xiaojun")
      },
      gotoJuejin() {
        window.open("https://juejin.im/user/5641635660b25b79e65bdb4c")
      },
      getBlogByCategory(categoryId) {
        if(this.categoryId !== categoryId){
          // 说明换分类了，要重置page
          this.page = 1;
        }
        this.categoryId = categoryId;
        this.loadingState = 0;

        BlogApi.getBlogs(this.page, categoryId, data => {
          this.blogs = []
          this.blogs.push(...data.data.blogs);
          this.total = data.data.total
          setTimeout(() => {
            if (this.blogs.length === 0) {
              this.loadingState = 2
            } else {
              this.loadingState = 1
            }
          }, 300)
        });
      },
      onPageChange(page) {
        this.page = page
        this.getBlogByCategory(this.categoryId)
      },
      onOpenBlogDetail(blog) {
        this.blogDetail = blog;
        this.isShowDetail = true;
        // 增加阅读量
        BlogApi.addReadCount(blog._id,data=>{})
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "../../common/stylus/mixins.styl"
  .wrapper
    fullwh()
    position: relative
    overflow: hidden;
  .shade
    z-index 15
    left: 0
    top: 0
    right 0
    bottom: 0;
    position: absolute
    background-color: rgba(10, 10, 10, .5);

  .detail-wrapper
    z-index 16
    left: 18rem
    top: 0
    right 0
    bottom: 0;
    position: absolute
    box-shadow 0 0 2rem 1rem rgba(10, 10, 10, .1)
    .icon-close
      position: absolute;
      top:1rem
      left:1rem
      font-size 1.2rem
      color #555263
      cursor: pointer;
    .preview-wrapper
      fullwh()
      overflow-y auto
      background-color: #fff;
      padding:3rem 6rem
      .blog-title
        text-align center
        font-size 1.6rem
        font-weight: 600;
        color #222
        margin-bottom 2rem


  .move-enter-active, .move-leave-active
    transition: transform .5s ease;

  .move-enter, .move-leave-to /* .fade-leave-active below version 2.1.8 */
    transform translateX(100%)
    box-shadow 0 0 0 0 rgba(10, 10, 10, .1)

  .fade-enter-active, .fade-leave-active
    transition: opacity .6s;

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
    opacity: 0;

  .container
    fullwh()
    position: absolute
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
