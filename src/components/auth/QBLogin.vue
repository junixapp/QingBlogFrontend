<template>
  <div class="login-container">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" status-icon class="hoverable">
      <div>
        <h1 class="login-title">登录</h1>
      </div>
      <el-form-item label="" prop="username">
        <el-input v-model.trim="ruleForm.username" type="text" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="" prop="pass">
        <el-input type="password" v-model.trim="ruleForm.pass" placeholder="请输入密码"></el-input>
      </el-form-item>
      <div id="captcha-wrapper" class="captcha-wrapper" v-show="false">
        <p class="wait" v-show="isShowCaptchaWait">正在加载验证码...</p>
      </div>
      <div class="submit-wrapper">
        <button class="btn-fw" @click.prevent="submitForm">登录</button>
      </div>
      <div class="goto-wrapper">
        <el-button type="text" @click="gotoRegister">注册<i class="el-icon-arrow-right"></i></el-button>
      </div>
    </el-form>

  </div>
</template>

<script>
  require('./gt')
  import StrUtil from '../../util/StrUtil'
  import AuthApi from '../../admin/api/auth'

  export default {
    name: "QBLogin",
    data() {
      return {
        isShowCaptchaWait: true,
        captchaObj: null,
        ruleForm: {
          username: '',
          pass: '',
        },
        rules: {
          username: [
            {validator: this.validateUsername, trigger: 'blur'}
          ],
          pass: [
            {validator: this.validatePass, trigger: 'blur'}
          ]
        }
      }
    },
    mounted() {
      // this.getCaptcha()
    },
    methods: {
      gotoRegister() {
        this.$router.push({name: "register"})
      },
      getCaptcha() {
        AuthApi.getCaptcha((data, err) => {
          if (!err) {
            // 调用 initGeetest 初始化参数
            // 参数1：配置参数
            // 参数2：回调，回调的第一个参数验证码对象，之后可以使用它调用相应的接口
            initGeetest({
              gt: data.gt,
              challenge: data.challenge,
              new_captcha: data.new_captcha, // 用于宕机时表示是新验证码的宕机
              offline: !data.success, // 表示用户后台检测极验服务器是否宕机，一般不需要关注
              product: "popup", // 产品形式，包括：float，popup
              width: "100%"
              // 更多配置参数请参见：http://www.geetest.com/install/sections/idx-client-sdk.html#config
            }, this.onGetCaptcha);
          }
        })
      },
      onGetCaptcha(captchaObj) {
        this.captchaObj = captchaObj;
        // 更多接口参考：http://www.geetest.com/install/sections/idx-client-sdk.html
        // 将验证码加到id为captcha的元素里，同时会有三个input的值用于表单提交
        captchaObj.appendTo("#captcha-wrapper");
        this.isShowCaptchaWait = false;
      },
      submitForm() {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            //表单验证通过，如果当前是登录界面，则判断极验验证吗是否通过
            // let result = this.captchaObj.getValidate();
            // if (!result) {
            //   //提示用户极验验证没有通过
            //   this.$message.error('请先完成验证！');
            // } else {
            //通过极验验证，进行登录
            AuthApi.login(this.ruleForm.username, this.ruleForm.pass, (data) => {
              //存储数据
              this.$store.commit("saveUser", data.data.user);
              this.$store.commit("saveToken", data.data.token);
              let redirect = this.$router.currentRoute.query.next || {name: "index"}
              this.$router.replace(redirect)
            });
            // }
          } else {
            return false;
          }
        });
      },
      validateUsername(rule, value, callback) {
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else if (!StrUtil.verifyUsername(value)) {
          callback(new Error("用户名密码应该是6-20位的数字字母组合"));
        } else {
          callback()
        }
      },
      validatePass(rule, value, callback) {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (!StrUtil.verifyPassword(value)) {
          callback(new Error("密码应该是6-20位的数字字母组合"));
        } else {
          callback()
        }
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "../../common/stylus/mixins.styl"
  #captcha-wrapper
    .wait
      color: #aaa

  .login-container
    wh(100%, 100%)
    flex-center()
    background #f1eee9
    .el-form
      wh(20rem, auto)
      background: #fff
      flex-center-v()
      padding: 2rem 0
      .login-title
        padding-bottom 2rem
        text-align center
        font-weight bold
        font-size 1.4rem
        color #2f2f39
      .el-form-item
        padding: 0 3rem
      .captcha-wrapper
        wh(100%, 44px) //极验的高度是44px,为了防止布局跳动
        padding: 0 3rem
        .wait
          wh(100%, 100%)
          line-height 44px
      .submit-wrapper
        wh(100%, auto)
        padding: 1rem 3rem 0
      .goto-wrapper
        wh(100%, auto)
        text-align right
        padding: 1rem 3rem 0

</style>
