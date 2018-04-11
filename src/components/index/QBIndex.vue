<template>
  <div class="container">
    <nav class="menu">
      <el-menu
        default-active="QBBlogManage"
        background-color="#4c535a"
        text-color="#fff"
        @select="onSelect"
        active-text-color="#409EFF">
        <el-menu-item index="QBBlogManage">
          <i class="el-icon-document"></i>
          <span slot="title">Blog管理</span>
        </el-menu-item>
        <el-menu-item index="QBCategoryManage">
          <i class="el-icon-menu"></i>
          <span slot="title">分类管理</span>
        </el-menu-item>
        <el-menu-item index="QBSetting">
          <i class="el-icon-setting"></i>
          <span slot="title">网站设置</span>
        </el-menu-item>
      </el-menu>

    </nav>
    <main class="main">
      <!--<keep-alive>-->
        <component :is="currentView">
        </component>
      <!--</keep-alive>-->
    </main>
  </div>
</template>

<script>

  import QBBlogManage from '../blog/QBBlogManage'

  export default {
    name: 'QBIndex',
    data() {
      return {
        currentView: "QBBlogManage"
      }
    },
    components:{
      QBBlogManage,
      QBCategoryManage: () => import('../category/QBCategoryManage'),
      QBSetting: () => import('../setting/QBSetting'),
    },
    mounted() {

    },
    methods: {
      onSelect(index){
        if(index==='QBSetting'){
          if(!this.$store.state.token){
            this.$router.push('login')
            return
          }
        }
        this.currentView = index
      },
      logout() {
        this.$store.commit("logout")
      },
    }

  }
</script>

<style scoped lang="stylus">
  @import "../../common/stylus/mixins.styl"
  .container
    wh(100%, 100%)
    overflow-x hidden
    overflow-y hidden
    .menu
      position absolute
      left 0
      top 0
      wh(15%, 100%)
      background #4c535a
      .el-menu
        border-right 0
        .el-menu-item
          text-align center
          padding-right 3.5rem
    .main
      wh(85%, 100%)
      position absolute
      left 15%
      top 0


</style>
