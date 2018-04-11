<template>
  <div class="container">
    <div class="left">
      <div class="top"></div>
      <div class="bottom">
        <h1 class="name">Dance</h1>
        <h1 class="intro">
          coding is life , <br/><br/>
          and I love my life ,  <br/><br/>
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
      <div class="nav-wrapper"></div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "QBIndex",
        data() {
            return {}
        },
        methods: {
          gotoQingBlogLink(){
            window.open("https://github.com/li-xiaojun/QingBlogFrontend")
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
      box-shadow: 0 0 .3em .2em rgba(10, 10, 10, 0.1)
      transition all .6s
      &:hover
        box-shadow: 0 0 1.5em .5em rgba(10, 10, 10, 0.1)
      .top
        height:10rem
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
          margin-top 4rem
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
      height: 100%
      flex-grow 1
      overflow-y auto
      background-color: #ccc;
      .nav-wrapper
        height: 4rem
        background-color: #fff;
        border-bottom 1px solid #ccc


</style>
