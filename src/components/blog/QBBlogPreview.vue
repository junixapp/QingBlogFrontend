<template>
  <div :class="{'limit-height': isLimitHeight}">
    <article class="markdown-body" v-html="markdContent">
    </article>
  </div>
</template>

<script>
  import './github.css'
  import './androidstudio.css' // hightjs样式
  import './highlight.js'
  hljs.initHighlightingOnLoad();

  const md = require('markdown-it')({
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return '<pre class="hljs"><code>' +
            hljs.highlight(lang, str, true).value +
            '</code></pre>';
        } catch (__) {}
      }
      return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
    }
  });

  // const md = new MarkdownIt();
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
    computed: {
      markdContent(){
        return md.render(this.content)
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "../../common/stylus/mixins.styl"

  .limit-height
    overflow: hidden
    max-height 10rem
</style>
