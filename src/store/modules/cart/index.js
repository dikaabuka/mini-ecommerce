import state from './cartState'
import mutations from './cartMutations'
import getters from './cartGetters'
import actions from './cartActions'

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
