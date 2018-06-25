<template>
  <div>
    <div class="title">{{total}} comments.</div>
    <div class="comment-item" v-for="item,index in list" :key="index">
      <div class="nickname-wrapper">
        <div class="item-nickname">{{getNickname(item)}}</div>
        <div class="item-time">{{formatDate(item.createdAt)}}</div>
      </div>
      <div class="item-content">
        {{item.content}}
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: "CBComment",
    props: ['total', 'list'],
    data() {
      return {
      }
    },
    methods: {
      getNickname(c) {
        return c.nickname ? c.nickname : "匿名用户";
      },
      formatDate(time) {
        return new Date(time).toLocaleString('en')
      }
    }
  }
</script>

<style scoped lang="stylus">
  .title
    color #111
    font-size 1.2rem
    padding-top: 2rem;
    padding-bottom 1rem
    border-bottom: solid 1px #ddd;

  .comment-item
    padding: 1rem 0;
    border-bottom: solid 1px #ddd;
    .nickname-wrapper
      display: flex;
      .item-nickname
        color #333
        font-style: 1.1rem;
        font-weight: 600;
        flex 1
      .item-time
        color #999999
        font-size 1rem
        line-height: 1.1rem;
  .item-content
    padding: .4rem 0;
    color #444

</style>
