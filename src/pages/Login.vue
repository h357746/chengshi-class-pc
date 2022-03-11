<template>
  <div class="main">
    <div class="bg">
      <h1 class="login-title">登录</h1>
      <span class="login-desc">澄/视/在/线/学/习/平/台</span>
      <div class="input-from">
        <div class="box1"></div>
        <div class="box2"></div>
        <div class="box3">
          <div class="login-logo">
            <img src="@/static/images/login-lgoo@2x.png" alt="logo"  />
          </div>
          <div class="login-from">
            <div class="login-from-username">
              <span></span>
              <input v-model="username" placeholder="用户名" />
            </div>
            <div class="login-from-password">
              <span></span
              ><input v-model="password" type="password" placeholder="密码" />
            </div>
          </div>
          <div class="login-pwd-options">
            <a-checkbox :checked="remember" @change="rememberPwd">
              记住密码
            </a-checkbox>
          </div>
          <div class="login-btn"><a-button @click="login">登录</a-button></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from '@/service/request.js'
import CryptoJS from 'crypto-js'
import {
  getLocalStorage,
  setLocalStorage,
  setSessionStorage,
  removeLocalStorage
} from '@/utils/storage'
export default {
  name: 'Login-Page',

  data () {
    return {
      username: '',
      password: '',
      remember: false
    }
  },

  mounted () {
    // 初始化，检测本地是否保存了账户密码
    if (getLocalStorage('username')) {
      this.username = this.decrypt(getLocalStorage('username'))
      this.password = this.decrypt(getLocalStorage('userpassword'))
      this.remember = getLocalStorage('remember')
    }
  },

  methods: {
    // 记住密码
    rememberPwd () {
      this.remember = !this.remember
      if (this.remember) {
        setLocalStorage('username', this.encrypt(this.username))
        setLocalStorage('userpassword', this.encrypt(this.password))
        setLocalStorage('remember', true)
      } else {
        removeLocalStorage('username')
        removeLocalStorage('userpassword')
        setLocalStorage('remember', false)
      }
    },

    // 登录
    async login () {
      const result = await login({
        loginname: this.username,
        password: this.password
      })
      if (result.code === 0) {
        this.$message.success('登录成功')
        setSessionStorage('token', this.encrypt(this.username + this.password))
        this.$router.push('/')
        console.log(result)
      } else {
        this.$message.error('账号或密码输入错误！')
      }
    },

    // 加密
    encrypt (word, keyStr) {
      keyStr = keyStr || 'absoietlj32fai12'
      const key = CryptoJS.enc.Utf8.parse(keyStr)
      const srcs = CryptoJS.enc.Utf8.parse(word)
      const encrypted = CryptoJS.AES.encrypt(srcs, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      })
      return encrypted.toString()
    },

    // 解密
    decrypt (word, keyStr) {
      keyStr = keyStr || 'absoietlj32fai12'
      const key = CryptoJS.enc.Utf8.parse(keyStr)
      const decrypt = CryptoJS.AES.decrypt(word, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      })
      return CryptoJS.enc.Utf8.stringify(decrypt).toString()
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 65.625rem;
  overflow: hidden;
  margin: 0 auto;
  background: linear-gradient(360deg, #3ec29c 0%, #35ac96 100%);

  .bg {
    position: relative;
    width: 70.25rem;
    height: 42rem;
    background-image: url("@/static/images/Box@2x.png");
    background-size: 70.25rem 42rem;

    .login-title {
      position: absolute;
      top: 18.75rem;
      left: 10rem;
      width: 7.6875rem;
      height: 4.5625rem;
      font-size: 3.25rem;
      font-weight: 400;
      line-height: 4.5625rem;
      color: #ffffff;
      letter-spacing: 0.5682rem;
      opacity: 1;
    }

    .login-desc {
      position: absolute;
      top: 24.3125rem;
      left: 10.3125rem;
      width: 21.4375rem;
      height: 2.0625rem;
      font-size: 1.5rem;
      font-weight: 400;
      line-height: 2.0625rem;
      color: #ffffff;
      letter-spacing: 0.25rem;
      opacity: 1;
    }

    .input-from {
      position: absolute;
      width: 23.6875rem;
      height: 32.4375rem;
      right: 5.9375rem;
      top: 2.5rem;

      div {
        width: 23.6875rem;
        height: 32.4375rem;
        border-radius: 2.5rem;
      }

      .box1 {
        position: absolute;
        right: -0.3125rem;
        top: -1.8125rem;
        height: 30.625rem;
        background-color: rgba(255, 255, 255, 0.4);
      }

      .box2 {
        position: absolute;
        right: -0.3125rem;
        top: -0.875rem;
        height: 31.5625rem;
        background-color: rgba(255, 255, 255, 0.6);
      }

      .box3 {
        right: -0.3125rem;
        position: absolute;
        // top: -0.3125rem;
        background-color: rgba(255, 255, 255, 1);
        z-index: 1;

        .login-logo {
          width: 7.625rem;
          height: 8.125rem;
          margin: 0 auto;
          margin-top: 2.75rem;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .login-from {
          margin-top: 2.5rem;
          height: 8rem;

          span {
            display: inline-block;
            width: 0.875rem;
            height: 0.875rem;
          }

          input {
            margin-left: 1.1875rem;
            outline: none;
            border: none;
            font-size: 1rem;
            line-height: 1.5rem;
          }

          input::-webkit-input-placeholder {
            font-size: 1rem;
            line-height: 1.5rem;
            color: #b3b3b3;
          }

          .login-from-username,
          .login-from-password {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            margin: 0 auto;
            margin-bottom: 1.5rem;
            text-align: center;
            width: 19.6875rem;
            height: 2.5rem;
            background: rgba(255, 255, 255, 0.39);
            border: 0.0625rem solid #ededed;
            opacity: 1;
            border-radius: 1.25rem;

            span {
              background-image: url("@/static/images/user@2x.png");
              margin-left: 1.1875rem;
              background-size: 0.875rem 0.875rem;
            }
          }

          .login-from-password {

            span {
              background-image: url("@/static/images/password@2x.png");
              background-size: 0.875rem 0.875rem;
            }
          }
        }

        .login-pwd-options {
          height: 1.1875rem;
          text-align: right;
          font-size: .875rem;

          /deep/ .ant-checkbox-wrapper {
            margin-right: 2rem;
          }
        }

        .login-btn {

          /deep/ .ant-btn {
            width: 19.6875rem;
            height: 2.5rem;
            margin: 3.1875rem 2rem 0 2rem;
            background-color: #3ec29c !important;
            border: none;
            border-radius: 1.25rem;
            color: #fff;
            font-size: 0.875rem;
            font-weight: 400;
            line-height: 1.25rem;
            color: #fff;
            opacity: 1;
          }
        }
      }
    }
  }
}
</style>
