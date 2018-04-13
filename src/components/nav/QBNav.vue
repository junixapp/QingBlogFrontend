<template>
  <div class="nav-wrapper">
    <ul>
      <li v-for="(c,index) in categories" :class="{current: index===currentIndex}" @click="changeCategory(index)">{{c.name}}</li>
    </ul>
  </div>
</template>

<script>
  import CategoryApi from '../../fed/api/category'
  export default {
    name: "QBNav",
    data() {
      return {
        categories: [],
        currentIndex: 0
      }
    },
    mounted() {
      CategoryApi.getAllCategories(data=>{
        this.categories = []
        this.categories.push(...data.data.categories)
        // 默认发送第0个
        this.$emit('onCategoryChange', this.categories[0]._id)
      })
    },
    methods: {
      changeCategory(index){
        this.currentIndex = index
        this.$emit('onCategoryChange', this.categories[index]._id)
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "../../common/stylus/mixins.styl"
  .nav-wrapper
    height: auto
    background-color: #fff;
    box-shadow: 0 0 .4em .2em rgba(20, 20, 20, 0.1)
    z-index 10
    ul
      display flex
      list-style none
      flex-wrap wrap
      & > li
        height 4rem
        vertical-align center
        padding 0 2.5rem
        line-height 3.6rem
        font-size 1.2rem
        color #999
        cursor pointer
        transition all .3s
        &:hover
          color #575466
          background-color: #f1f1f1;
          border-bottom .3rem solid #6b677d
        &.current
          color #575466
          border-bottom .3rem solid #6b677d

</style>
