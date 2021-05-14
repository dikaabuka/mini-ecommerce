import state from './productState'
import mutations from './productMutations'
import getters from './productGetters'
import actions from './productActions'

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
