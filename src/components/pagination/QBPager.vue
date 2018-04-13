<template>
  <div class="pager-wrapper">
      <i class="icon-arrow-left  arrow" :class="{ disabled: currentPage===1}" @click="clickLeft"></i>
      <span class="page-item" v-for="num in totalPage" :class="{ current: num===currentPage}" @click="clickPage(num)">{{num}}</span>
    <i class="icon-arrow-right arrow" :class="{ disabled: currentPage===totalPage}" @click="clickRight"></i>
  </div>
</template>

<script>
  export default {
    name: "QBPager",
    props: {
      totalCount: {
        type: Number,
        default: 0
      },
      perPageCount: {
        type: Number,
        default: 10
      },
      currentPage: {
        type: Number,
        default: 1
      },
    },
    data() {
      return {}
    },
    mounted() {
    },
    computed: {
      totalPage() {
        let remainder = this.totalCount % this.perPageCount;
        let res = Math.floor(this.totalCount / this.perPageCount)
        return remainder === 0 ? res : (res + 1);
      },
    },
    methods: {
      clickPage(page){
        if(this.currentPage === page){
          return
        }
        this.$emit('update:currentPage', page)
        this.$emit('currentChange', page)
      },
      clickLeft(){
        if(this.currentPage === 1){
          return
        }
        this.clickPage(this.currentPage-1)
      },
      clickRight(){
        if(this.currentPage === this.totalPage){
          return
        }
        this.clickPage(this.currentPage+1)
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "../../common/stylus/mixins.styl"
  .pager-wrapper
    wh(100%, 4rem)
    display flex
    justify-content center
    padding-top: 1rem;
    .arrow
      font-size 1.6rem
      line-height 1.6rem
      color: #625e72
      opacity: .5;
      cursor pointer
      transition all .2s
      &:last-child
        margin-left: 1rem;
      &:hover
        font-weight 600
        opacity: 1;
      &.disabled
        font-weight 100
        opacity: .5;
        cursor not-allowed

    .page-item
      height: 1.6rem
      min-width 1.6rem
      padding 0 .4rem
      font-size 1rem
      text-align center
      color: #fefefe
      cursor: pointer;
      background-color: #625e72;
      box-shadow 0 0 .01rem .01rem rgba(98,94,114,1)
      opacity: .5;
      border-radius 50%
      transition all .3s
      margin-left 1rem
      &:hover
        font-weight 600
        box-shadow 0 0 0 .18rem rgba(98,94,114,1)
        opacity: 1;
      &.current
        font-weight 600
        box-shadow 0 0 0 .18rem rgba(98,94,114,1)
        opacity: 1;
        cursor: default;

</style>
