<template>
  <div class="loading-wrapper">
    <div class="load7">
      <transition name="fade">
        <div class="loader" v-if="state===0"></div>
      </transition>
    </div>

    <transition name="fade">
      <div class="nodata" v-if="state===2">{{emptyText}}</div>
    </transition>

    <transition name="move">
      <div v-if="state===1" class="data-wrapper">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: "QBLoading",
    props: {
      // 1: loading , 2: nodata
      state: {
        type: Number,
        default: 0
      },
      emptyText: {
        type: String,
        default: 'No Data'
      }
    },
    data() {
      return {}
    },
    mounted() {

    },
    methods: {}
  }
</script>

<style scoped lang="stylus">
  @import "../../common/stylus/mixins.styl"
  .loading-wrapper
    fullwh()
    overflow hidden
    position: relative

  .nodata
    fullwh()
    position: absolute
    flex-center()
    font-size 1.5rem
    color: #6b677d

  .data-wrapper
    fullwh()
    position: absolute
    padding: 2rem
    overflow-y scroll

  .move-enter-active, .move-leave-active
    transition: all .4s;

  .move-enter, .move-leave-to /* .fade-leave-active below version 2.1.8 */
    opacity: 0;
    transform translateY(2rem)

  .fade-enter-active, .fade-leave-active
    transition: opacity .4s;

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
    opacity: 0;

  .load7
    display: flex
    fullwh()
    position: absolute

  .load7 .loader,
  .load7 .loader:before,
  .load7 .loader:after {
    border-radius: 50%;
    margin auto
    width: 2.5em;
    height: 2.5em;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    -webkit-animation: load7 1.8s infinite ease-in-out;
    animation: load7 1.8s infinite ease-in-out;
  }

  .load7 .loader {
    top: -1.2rem
    color: #6b677d;
    font-size: .6rem;
    position: relative;
    text-indent: -9999em;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-animation-delay: -0.16s;
    animation-delay: -0.16s;
  }

  .load7 .loader:before,
  .load7 .loader:after {
    content: '';
    position: absolute;
    top: 0;
  }

  .load7 .loader:before {
    left: -3.5em;
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
  }

  .load7 .loader:after {
    left: 3.5em;
  }

  @-webkit-keyframes load7 {
    0%,
    80%,
    100% {
      box-shadow: 0 2.5em 0 -1.3em;
    }
    40% {
      box-shadow: 0 2.5em 0 0;
    }
  }

  @keyframes load7 {
    0%,
    80%,
    100% {
      box-shadow: 0 2.5em 0 -1.3em;
    }
    40% {
      box-shadow: 0 2.5em 0 0;
    }
  }

</style>
