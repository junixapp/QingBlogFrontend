<template>
  <div class="blog-wrapper hoverable" >
    <!--标题区-->
    <div class="title-wrapper" @click="gotoBlogDetail">
      <span class="vertical-line"></span>
      <span class="title">{{blog.title}}</span>
      <span class="date"><i class="icon-calendar"></i>{{updatedDate}}</span>
    </div>

    <!--博客预览区-->
    <div class="content-wrapper" @click="gotoBlogDetail">
      <BlogPreview :content="blog.content" :isLimitHeight="isLimit"></BlogPreview>
    </div>
    <div class="line"></div>

    <!--tags区-->
    <div class="tag-wrapper">
      <i class="icon-price-tags"></i>
      <ul>
        <li v-for="tag,index in blog.tags" @click.stop="clickTag(tag)">{{tag}}</li>
      </ul>
    </div>

  </div>
</template>

<script>
  import '../../common/css/icomoon.css'
  import BlogPreview from './QBBlogPreview'

  export default {
    name: "QBBlogItem",
    props: ['blog'],
    components: {
      BlogPreview
    },
    data() {
      return {}
    },
    mounted() {
    },
    computed: {
      updatedDate() {
        return new Date(this.blog.createdAt).toLocaleString('en')
      },
      isLimit(){
        return this.blog.category.name !== 'AboutMe'
      }
    },
    methods: {
      gotoBlogDetail() {
        this.$emit('openBlogDetail', this.blog)
      },
      clickTag(tag){
        this.$log(tag)
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "../../common/stylus/mixins.styl"

  .blog-wrapper
    background-color: #fff;
    margin 0 0 2rem
    padding-bottom: 1.5rem;
    .title-wrapper
      display flex
      cursor pointer
      .vertical-line
        wh(.3rem, 4rem)
        background-color: #6b677d;
      .title
        margin-left 4rem
        line-height 4rem
        font-size 1.4rem
        font-weight: 600;
        color #555
      .date
        flex-grow 1
        line-height 4rem
        font-size 1.2rem
        color #888
        text-align right
        padding-right: 4rem;
        .icon-calendar
          color inherit
          font-size 1rem
          padding-right: .5rem;
    .content-wrapper
      padding .5rem 4rem
      cursor pointer
    .line
      border-bottom 1px solid #ddd
      margin 2rem 4rem
    .tag-wrapper
      margin 2rem 4rem 0
      display flex
      .icon-price-tags
        font-size 1rem
        color #888
        margin-top: .25rem;
        margin-right: .6rem;
      ul
        list-style none
        display flex
        flex-wrap wrap
        & > li
          cursor pointer
          height 1.4rem
          background-color: #b7977e;
          line-height 1.2rem
          padding 0 .5rem
          margin 0 .6rem .5rem
          border-radius .3rem
          font-size .8rem
          position: relative
          color: #fff
          &::before
            content: ''
            position: absolute;
            border 0.55rem solid transparent
            border-left-color #b7977e
            border-bottom-color #b7977e
            border-radius .3rem
            top 0.15rem
            left -0.35rem
            transform rotate(45deg)
</style>
