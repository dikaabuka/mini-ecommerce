<template>
  <div class="ui-form-loader animated">
    <!-- PreLoader -->
    <div v-if="status === 'preload'" class="dropdownLoader animated">
      <div class="center-component">
        <div class="loading-circle"></div>
      </div>
    </div>

    <!-- Loader-->
    <div v-if="status === 'loading'" class="overlayLoader animated">
      <div class="center-txt webapp-ripple-text">
        <i :class="loaderIconTop"></i> {{ message }}
      </div>
      <div class="center-component">
        <div class="loading-circle"></div>
      </div>
    </div>

    <!-- Success Loader -->
    <div v-if="status === 'success'" class="overlayLoader animated">
      <div class="center-txt webapp-ripple-text">
        <i :class="loaderIconTop"></i> {{ message }}
      </div>
      <div class="center-component">
        <div class="webapp-ripple">
          <div></div>
          <i
            class="webapp-ripple-notification success-text"
            :class="loaderIconBottom"
          ></i>
          <div></div>
        </div>
      </div>
    </div>

    <!-- Failure Loader -->
    <div v-if="status === 'failure'" class="overlayLoader animated">
      <div v-if="typeof error === 'string'">
        <div class="center-txt webapp-ripple-text">
          <i :class="loaderIconBottom"></i> {{ error }}
        </div>
        <div class="center-component">
          <div class="webapp-ripple">
            <div></div>
            <i
              class="webapp-ripple-notification error-txt"
              :class="loaderIconBottom"
            ></i>
            <div></div>
          </div>
        </div>
      </div>
      <div v-else class="center-txt webapp-ripple-text error-text">
        <div class="center-overlay-component">
          <div
            :key="index"
            v-for="(message, index) in error"
            class="center-txt webapp-error-text"
          >
            {{ message.error }}
          </div>
          <div
            v-if="typeof error !== 'string'"
            class="webapp-ripple-error-icon"
          >
            <div></div>
            <i
              aria-hidden="true"
              class="webapp-ripple-notification"
              :class="loaderIconBottom"
            >
            </i>
            <div></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Custom Loader -->
    <div v-if="status === 'custom'" class="overlayLoader animated">
      <div class="center-txt webapp-ripple-text">
        <i :class="loaderIconTop"></i> {{ message }}
      </div>
      <div class="center-component">
        <div class="webapp-ripple">
          <div></div>
          <i
            aria-hidden="true"
            class="webapp-ripple-notification warning-text"
            :class="loaderIconBottom"

          ></i>
          <div></div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'UiFormLoader',
  props: {
    status: { type: String, default: 'none' },
    error: { type: [Object, String], default: () => {} },
    message: { type: String, default: 'loading...' },
    loaderIconTop: { type: String, default: '' },
    loaderIconBottom: { type: String, default: '' }

  }

}
</script>

<style lang="scss" scoped>

.center-txt {
  text-align: center !important;
  margin: auto;
  width: 100%;
}

.error-txt {
  color: #ec7920 !important;
}

.left-txt {
  text-align: left !important;
  margin: auto;
  width: 100%;
}

.right-txt {
  text-align: right !important;
  margin: auto;
  width: 100%;
}

.center-component {
  position: absolute !important;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%) !important;
}

.center-overlay-component {
  position: absolute !important;
  top: 53% !important;
  left: 50% !important;
  transform: translate(-50%, -50%) !important;
}

.overlayLoader {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 99999 !important;
  padding-top: 4px;
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(3px);
}

.loading-circle {
  height: 0;
  width: 0;
  padding: 14px;
  border: 6px solid #e8e8e8;
  border-right-color: #1bb05d;
  border-radius: 22px;
  -webkit-animation: rotate 1s infinite linear;
  display: block;
  margin: 4px auto auto auto;
}

@-webkit-keyframes rotate {
  /* 100% keyframe for  clockwise.
         use 0% instead for anticlockwise */
  100% {
    -webkit-transform: rotate(360deg);
  }
}

.error-txt {
  color: crimson !important;
}

.success-text {
  color: rgba(27, 176, 93, 0.9) !important;
}
.webapp-ripple-text {
  position: absolute;
  display: block;
  text-align: center;
  top: 36%;
  left: 0;
  right: 0;
  bottom: 0;
  color: #0b2e4f;
  font-weight: 500;
  font-family: 'Roboto', sans-serif;
  letter-spacing: normal;
  font-size: 16px;
  text-shadow: 1px 2px 3px rgba(0, 0, 0, 0.1);
}

.warning-text {
  color: rgba(44, 150, 221, 0.9) !important;
}

.webapp-error-text {
  position: relative;
  display: block;
  text-align: center;
  font-weight: 500;
  letter-spacing: normal;
  font-size: 16px;
  text-shadow: 1px 2px 3px rgba(0, 0, 0, 0.1);
  margin: auto;
  padding: 5px 0;
  width: 100vw;
}

.webapp-ripple-error-icon {
  position: relative;
  display: block;
  text-align: center;
  font-weight: 500;
  letter-spacing: normal;
  font-size: 16px;
  text-shadow: 1px 2px 3px rgba(0, 0, 0, 0.1);
}

.webapp-ripple-notification {
  font-size: 50px;
  margin-left: 4px;
  margin-top: 2px;
  text-shadow: 1px 2px 3px rgba(0, 0, 0, 0.1);
}

.webapp-ripple {
  margin: auto;
  width: 64px;
  height: 64px;
  display: block;
  position: relative;
  bottom: 0;
  left: 0;
  right: 0;
  top: 50%;
}

.webapp-ripple div {
  position: absolute;
  border: 4px solid #fff;
  opacity: 1;
  border-radius: 50%;
  animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}

.webapp-ripple div:nth-child(2) {
  animation-delay: -0.5s;
}

@keyframes lds-ripple {
  0% {
    top: 28px;
    left: 28px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: -1px;
    left: -1px;
    width: 58px;
    height: 58px;
    opacity: 0;
  }
}

</style>
