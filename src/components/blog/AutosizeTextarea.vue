<template>
  <textarea @input="handleChange" @keydown.tab.prevent="addTabIndent()" ref="autoTextArea">{{ value }}</textarea>
</template>

<script>
  import autosize from 'autosize'

  export default {
    name: "AutosizeTextArea",
    props: ['value'],
    data() {
      return {}
    },
    mounted() {
      autosize(this.$el)
      // 更新一下内容，否则一上来的高度就固定了，如果文字很多，高度也不根据文字的高度变化
      this.$nextTick(() => {
        autosize.update(this.$el)
      })
    },
    methods: {
      handleChange(e) {
        this.$emit('textChange', e.target.value);
      },
      addTabIndent() {
        let start = this.$refs.autoTextArea.selectionStart;
        let end = this.$refs.autoTextArea.selectionEnd;
        // set textarea value to: text before caret + tab + text after caret
        let newVal = this.value.substring(0, start)
          + "\x20\x20\x20\x20" + this.value.substring(end);
        this.$refs.autoTextArea.value = newVal;
        this.$emit('textChange', newVal);

        this.$refs.autoTextArea.setSelectionRange(start+4, end+4);

      }
    }

  }
</script>

<style scoped lang="stylus">
  @import "../../common/stylus/mixins.styl"
  textarea
    wh(100%, auto)
    padding .4rem
    font-size 1rem
    border 1px solid #aeaeae
    outline none
    min-height 25rem
    max-width 100%

  textarea:focus
    border 1px solid #409EFF

</style>
