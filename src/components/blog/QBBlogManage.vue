<template>
  <div class="manager-wrapper">
    <div class="title-wrapper">
      <el-button type="text" class="manager-title" v-show="isShowTitle" @click="gotoBlogList"><i class="el-icon-back"></i>&nbsp;博客列表
      </el-button>
      <el-button type="primary" class="manager-add" @click="gotoEdit" v-show="!isShowTitle">写博客</el-button>
    </div>
    <div class="blog-wrapper">
      <component :is="currentView" @editBlog="gotoEditWithBlog" :editedBlog="editedBlog">
      </component>
    </div>
  </div>
</template>

<script>
  export default {
    name: "QBBlogManage",
    data() {
      return {
        isShowTitle: false,
        currentView: "QBBlogList",
        editedBlog: null
      }
    },
    components: {
      QBBlogList: () => import('./QBBlogList'),
      QBBlogEdit: () => import('./QBBlogEdit'),
    },
    methods:{
      gotoEdit(){
        //check login
        if(!this.$store.state.token){
          this.$router.push('login')
          return
        }

        this.currentView = "QBBlogEdit"
        this.isShowTitle = true
        this.editedBlog = null
      },
      gotoEditWithBlog(blog){
        this.currentView = "QBBlogEdit"
        this.isShowTitle = true
        this.editedBlog = blog
      },
      gotoBlogList(){
        this.currentView = "QBBlogList"
        this.isShowTitle = false
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "../../common/stylus/mixins.styl"
  .manager-wrapper
    wh(100%, 100%)
    overflow-y scroll
    padding 2rem
    .title-wrapper
      position relative
      wh(100%, 2rem)
      margin-bottom 1rem
      .manager-add
        position absolute
        right 0
    .blog-wrapper
      wh(100%, auto)
      shadow-bg()


</style>
