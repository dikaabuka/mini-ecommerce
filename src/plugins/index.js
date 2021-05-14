/**
 * import and init global plugins
 */

import Vue from 'vue'
import globalEventBus from '../plugins/globalEventBus'
import VueToast from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'

Vue.use(VueToast, {
  position: 'top-right',
  queue: false
})
Vue.use(globalEventBus)
