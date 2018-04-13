<template>
  <div :class="{'limit-height': isLimitHeight}">
    <article class="markdown-body" v-html="content">
    </article>
  </div>
</template>

<script>
  import './github.css'

  export default {
    name: "QBBlogPreview",
    props: {
      content: {
        type: String,
        default: ''
      },
      isLimitHeight: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {}
    }
    ,
    mounted() {
    }
    ,
    methods: {}
  }
</script>

<style scoped lang="stylus">
  @import "../../common/stylus/mixins.styl"

  .limit-height
    overflow: hidden
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical
</style>
