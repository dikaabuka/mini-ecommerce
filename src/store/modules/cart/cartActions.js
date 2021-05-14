
export default {
  // Cart Actions + Mock Purchase
  ADD_TO_CART ({ commit }, payload) {
    commit('ADD_TO_CART', payload)
  },

  REMOVE_FROM_CART ({ commit }, payload) {
    commit('REMOVE_FROM_CART', payload)
  },

  UPDATE_CART ({ commit }, payload) {
    commit('UPDATE_CART', payload)
  },

  EMPTY_CART ({ commit }, payload) {
    commit('EMPTY_CART', payload)
  },

  PROCESS_ORDERS ({ commit }, payload) {
    commit('PROCESS_ORDERS', payload)
  }

}
