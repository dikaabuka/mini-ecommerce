<template>
  <div v-if="overlayMode" id="overlay-global">
    <div id="modal">

        <div class="webapp-content">
          <div class="webapp-content__inner">
            <div class="overlay-wrapper">
              <!-- Child Component Slot-->
              <slot></slot>
              <!-- Child Component Slot-->
            </div>
          </div>
        </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'UiOverlay',
  template: 'UiOverlay',
  data () {
    return {
      headerTag: {
        'animated fadeIn': false,
        hidden: true
      }
    }
  },
  props: ['overlayMode'],
  watch: {
    overlayMode (mode) {
      if (mode) {
        this.openOverlay()
      }
    }
  },
  methods: {
    openOverlay () {
      const frBody = document.querySelector('body')
      frBody.classList.add('webapp-loading')
    },
    closeOverlay () {
      const frBody = document.querySelector('body')
      frBody.classList.remove('webapp-loading')
      this.$emit('closeOverlayHandler')
    }
  },
  mounted () {
    setTimeout(() => {
      this.headerTag = {
        'animated fadeInUp': true,
        hidden: false
      }
      setTimeout(() => {
        this.headerTag = {
          'animated fadeInDown': false,
          hidden: false
        }
      }, 1500)
    }, 100)
  }
}
</script>
<style scoped>
.close-overlay {
  z-index: 9999999999;
  position: absolute;
  top: -0.5px;
  right: 12.5px;
  font-size: 40px;
  float: right;
  cursor: pointer !important;
  color: #fff;
  -webkit-transition: all 0.4s ease;
  -moz-transition: all 0.4s ease;
  transition: all 0.4s ease;
}
.close-overlay:hover {
  color: crimson;
  -webkit-transition: all 0.4s ease;
  -moz-transition: all 0.4s ease;
  transition: all 0.4s ease;
}
.close-icon {
  font-size: 30px;
  margin-right: 10px;
  color: #fff;
  position: relative;
  z-index: 109;
}
.close-icon:hover {
  color: crimson !important;
  cursor: pointer;
}
</style>
