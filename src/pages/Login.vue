<template>
  <div class="login">

    <div class="main">
      <!--  Micro Animation Form Loader Inline-->
      <UiFormLoader
        :status="loadingStatus"
        :loader-icon-top="loaderIconTop"
        :loader-icon-bottom="loaderIconBottom"
        :message="message"
        :error="error"

      />
      <!--  Micro Animation Form Loader Inline-->

      <!-- Login Form-->
      <div class="animated">
        <div class="header">

          <img
            alt="user image"
            src="../assets/login/login.png"
            class="image--cover"
          />
          <h1 class="login-title"> Welcome Back</h1>
          <h3 class="login-message"> Please Login</h3>

        </div>
        <div class="content">

          <UiInputText
            v-model="email"
            placeholder="Enter UserName"
            @blur="validateInput('text')"
            :error="usernameError"
            :max-length="'20'"
          >
            <div slot="before">
              <i aria-hidden="true" class="fas fa-user-circle"></i>
            </div>

            <div v-if="usernameError" slot="bottom" class="animated-slow error-text">
              <i aria-hidden="true" class="fas fa-exclamation-circle"></i>
              Please enter your username
            </div>

          </UiInputText>

          <UiInputText
            v-model="password"
            placeholder="Enter Password"
            @blur="validateInput('password')"
            @keyup.enter="loginUser"
            :error="passwordError"
            :max-length="'20'"
            :password="true"
          >
            <div slot="before">
              <i aria-hidden="true" class="fas fa-ellipsis-h"></i>
            </div>
            <div v-if="passwordError" slot="bottom" class="animated-slow error-text">
              <i aria-hidden="true" class="fas fa-exclamation-circle"></i>
              Please enter your password
            </div>
          </UiInputText>

        </div>
        <div>
          <button class="buttons" @click="loginUser">
            login &nbsp;&nbsp;<i class="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>
      <!-- Login Form-->

    </div>
  </div>
</template>
<script>
import { AuthService } from '@/services/auth.service'
import UiInputText from '@/components/form-elements/UiInputText.vue'
import UiFormLoader from '@/components/form-loaders/UiFormLoader'
import $store from '@/store'
import { BASE_URL } from '../.env'

export default {
  name: 'Login',
  components: {
    UiInputText,
    UiFormLoader
  },
  data () {
    return {
      email: '',
      password: '',
      error: '',
      usernameError: false,
      passwordError: false,
      loadingStatus: 'none',
      message: 'Verifying Your Credentials',
      loaderIconTop: 'fas fa-user-circle',
      loaderIconBottom: 'fas fa-user-shield'

    }
  },
  methods: {
    validateInput (type = 'login') {
      if (type === 'login') {
        // 1. Login Validation
        const isValidInput = type === 'login' && this.email !== '' && this.password !== ''
        this.usernameError = !isValidInput
        this.passwordError = !isValidInput
        return isValidInput
      } else {
        // 2. Form Validation
        this.usernameError = type === 'text' && this.email === ''
        this.passwordError = type === 'password' && this.password === ''
      }
    },
    async loginUser () {
      if (this.validateInput('login')) {
        this.message = 'Verifying Your Credentials'
        this.loadingStatus = 'loading'
        try {
          const response = await AuthService.loginUser({ email: this.email, password: this.password })
          if (response) {
            const data = {
              ...response.data
            }
            data.expiryDate = new Date()
            localStorage.setItem('currentUser', JSON.stringify(data))
            $store.commit('userModule/SET_CURRENT_USER', data)

            this.error = ''
            const payload = {
              status: 'success',
              message: 'Verification Successful',
              topIcon: 'fas fa-user-circle',
              bottomIcon: 'fas fa-check-circle',
              duration: 5000,
              nextTask: 'none'
            }
            this.inlineToast(payload)
            await setTimeout(() => {
              window.location.replace(`${BASE_URL}/shop`)
            }, 1000)
          }
        } catch (error) {
          // this.$store.commit('toastModule/NEW', { type: 'error', message: error.message })
          this.error = error.status === 404 ? 'User with same email not found' : error.message

          const payload = {
            status: 'failure',
            message: this.error,
            topIcon: 'fas fa-times-circle',
            bottomIcon: 'fas fa-times-circle',
            duration: 5000,
            nextTask: 'none'

          }
          this.inlineToast(payload)
        }
      }
    },
    inlineToast (arg) {
      if (arg) {
        // 1. Extract Props for Loader Component upon before mounting to the DOM
        const { status, message, duration, topIcon, bottomIcon, nextTask } = arg
        this.loadingStatus = status
        this.message = message
        this.loaderIconTop = topIcon
        this.loaderIconBottom = bottomIcon

        // 2. Define Duration before the Loader Component is unmounted from the DOM
        setTimeout(() => {
          this.loadingStatus = nextTask
        }, duration)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.login {
  width: 100%;
  height: 77vh;
  display: flex;
  align-items: center;
  justify-content: center;

  .main {
    position: relative;
    border: 1px solid rgba(0, 0, 0, 0.25);
    padding: 30px 15px;
    background: #fff;
    max-width: 400px;
    width: 100%;
    border-radius: 2px;
    box-shadow: 0 11px 15px -7px rgba(0, 0, 0, .2),
    0 24px 38px 3px rgba(0, 0, 0, .14),
    0 9px 46px 8px rgba(0, 0, 0, .12);

    .header {
      text-align: center;
    }

    .content {
      margin: 25px auto 10px auto;

      .error-text {
        i {
          font-size: 12px;
          opacity: .5
        }
      }
    }

    .buttons {
      display: flex;
      justify-content: center;
      align-items: center;
      align-content: center;
      border: 1px solid rgba(0, 0, 0, 0.22);
      width: 100%;
      height: 45px;
      margin: 10px auto;
      font-weight: 500;
      line-height: normal;
      font-family: Roboto, sans-serif;
      text-transform: capitalize;
      font-size: 1.3rem;
      border-radius: 3px;
      color: #fff;
      background: #039be5;
      box-shadow: 0 7px 13px -6px rgba(0, 0, 0, .42), 0 2px 11px 0 rgba(0, 0, 0, .12), 0 4px 5px -3px rgba(0, 0, 0, .2);

      i {
        opacity: .5;
        font-size: 18px;
        display: inline-block;
        position: relative;
        padding-left: 6px;
        padding-top: 4px;
      }
    }

    .buttons:hover {
      background: #00a27f;
      cursor: pointer;
      opacity: .8;
      box-shadow: 0 2px 5px -2px rgba(0, 0, 0, .42), 0 2px 5px 0 rgba(0, 0, 0, .12), 0 2px 2px -3px rgba(0, 0, 0, .2);
    }

    .error {
      background-color: crimson;
      padding: 10px;
      font-size: 12px;
      opacity: 1;
      transition: all 0.5s;
    }

    .login-title {
      color: #061a2c;
      font-size: 1.2rem;
      text-align: center;
      font-weight: 500;
      margin-top: 10px;
      margin-bottom: 5px;
      width: 100%;
      display: inline-block;
    }

    .login-message {
      font-size: 1rem;
      color: #061a2c;
      text-align: center;
      width: 100%;
      padding: 0 2em;
      display: inline-block;
    }
  }
}

.error-text {
  color: crimson;
}

.image--cover {
  width: auto;
  height: 100px;
  border-radius: 0;
  margin: 0;
  -o-object-fit: cover;
  object-fit: cover;
  -o-object-position: center right;
  object-position: center right;
  border: none;
}

</style>
