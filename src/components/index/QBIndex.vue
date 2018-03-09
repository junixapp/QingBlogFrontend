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
        <el-menu-item index="QBProfileInfo">
          <i class="el-icon-info"></i>
          <span slot="title">个人信息</span>
        </el-menu-item>
      </el-menu>

    </nav>
    <main class="main">
      <!--<el-button  type="primary" v-if="!$store.state.user" @click="gotoLogin">登录</el-button>-->
      <!--<el-button  type="primary"  v-if="$store.state.user" @click="logout">注销</el-button>-->
      <keep-alive>
        <component :is="currentView">

        </component>
      </keep-alive>
    </main>
  </div>
</template>

<script>

  export default {
    name: 'QBIndex',
    data() {
      return {
        currentView: "QBBlogManage"
      }
    },
    components:{
      QBBlogManage: () => import('../blog/QBBlogManage'),
      QBCategoryManage: () => import('../category/QBCategoryManage'),
      QBProfileInfo: () => import('../profile/QBProfileInfo'),
    },
    mounted() {

    },
    methods: {
      onSelect(index){
        this.currentView = index
      },
      logout() {
        this.$store.commit("logout")
      },
      gotoLogin() {
        this.$router.push({name: 'login'})
      }
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
