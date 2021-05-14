/**
 * import and init global mixins
 */

import Vue from 'vue'
import searchByValue from '@/mixins/searchByValue'
import typeChecker from '@/mixins/typeChecker'
import currentUser from '@/mixins/currentUser'

Vue.mixin(typeChecker)
Vue.mixin(searchByValue)
Vue.mixin(currentUser)
