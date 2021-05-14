import { ProductService } from '@/services/product.service'

export default {
  // Products
  GET_ALL_PRODUCTS ({ commit }) {
    // Mocked Data
    const response = ProductService.getAllProducts()
    commit('GET_ALL_PRODUCTS', response.data.content)

    // Async Data
    // return ProductService.getFilteredProducts()
    // .then(payload => commit('GET_ALL_PRODUCTS', payload))
    // .catch(error => commit('toastModule/NEW', { type: 'error', message: error.message }, { root: true }))
  },
  GET_ALL_PRODUCT_TYPES ({ commit }) {
    // Mocked Data
    const response = ProductService.getAllProductTypes()
    commit('GET_ALL_PRODUCT_TYPES', response.data.content)

    // Async Data
    // return ProductService.getFilteredProducts()
    // .then(payload => commit('GET_ALL_PRODUCTS', payload))
    // .catch(error => commit('toastModule/NEW', { type: 'error', message: error.message }, { root: true }))
  },
  GET_FILTERED_PRODUCTS ({ commit }, payload) {
    // Mocked Data
    const response = ProductService.getFilteredProducts(payload)
    commit('GET_FILTERED_PRODUCTS', response.data.content)

    // return ProductService.getFilteredProducts(payload)
    //   .then(response => commit('GET_FILTERED_PRODUCTS', response))
    //   .catch(error => commit('toastModule/NEW', { type: 'error', message: error.message }, { root: true }))
  },
  RESET_FILTERED_PRODUCTS ({ commit }) {
    commit('RESET_FILTERED_PRODUCTS', [])
  },
  CLEAR_ALL_PRODUCTS ({ commit }) {
    commit('CLEAR_ALL_PRODUCTS', [])
  }
}
