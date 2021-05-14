export default {
  // Product Mutations
  GET_ALL_PRODUCTS (state, payload) {
    state.products = payload
  },
  GET_ALL_PRODUCT_TYPES (state, payload) {
    state.productTypes = payload
  },
  GET_FILTERED_PRODUCTS (state, payload) {
    state.filteredProducts = payload
  },
  RESET_FILTERED_PRODUCTS (state, payload) {
    state.filteredProducts = payload
  },
  CLEAR_ALL_PRODUCTS (state, payload) {
    state.products = payload
  }

}
