<template>
  <div id="app">
    <AppHeader></AppHeader>
    <div style="clear:both;"> </div>
    <div class="wrapper">
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </div>
    <AppFooter></AppFooter>
  </div>

</template>

<script>
import AppHeader from './Header.vue'
import AppFooter from './Footer.vue'

export default {
  name: 'AppLayout',
  components: {
    AppHeader,
    AppFooter
  },
  mounted () {
    this.$bus.$on('notifyUser', notification => {
      this.triggerNotification(notification)
    })
  },
  methods: {
    triggerNotification (update) {
      if (update) {
        this.$toast.open({
          message:
            `<p class="toast-title">${update.title}</p>
        <p class="toast-msg"> ${update.message}</p>`,
          type: update.type,
          duration: update.duration,
          dismissible: update.dismissible

        })
      }
    }
  }
}
</script>
<style scoped>
html,body {
  height:100%;
}
.wrapper{
  position: relative;
}

</style>
