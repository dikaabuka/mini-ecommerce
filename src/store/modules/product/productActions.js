import { ProductService } from '@/services/product.service'

export default {
  // Products
  GET_ALL_PRODUCTS ({ commit }) {
    const response = ProductService.getAllProducts()

    Promise.resolve(response).then(
      (result) => {
        const update = JSON.parse(JSON.stringify(result))
        commit('GET_ALL_PRODUCTS', update.data.content.data)
      }
    )
  },
  GET_ALL_PRODUCT_TYPES ({ commit }) {
    const response = ProductService.getAllProductTypes()
    Promise.resolve(response).then(
      (result) => {
        const update = JSON.parse(JSON.stringify(result))
        commit('GET_ALL_PRODUCT_TYPES', update.data.content.data)
      }
    )
  },
  GET_FILTERED_PRODUCTS ({ commit }, payload) {
    const response = ProductService.getFilteredProducts(payload)
    let filteredProducts = []

    Promise.resolve(response).then(
      (result) => {
        const update = JSON.parse(JSON.stringify(result))
        const products = update.data.content.data

        // 1. Filter by only category where no product name is entered
        if (payload.productName === '' && payload.productType.toLowerCase() !== 'all') {
          filteredProducts = products.filter((product) => {
            return product.type === payload.productType.toLowerCase()
          })
        }

        // 2. Filter by category then search for product match in that category
        if (payload.productName !== '' && payload.productType.toLowerCase() !== 'all') {
          filteredProducts = products.filter((product) => {
            if (ProductService.searchByValue(payload.productName.toLowerCase(), product.name.toLowerCase()) !== -1 &&
              (product.type).toLowerCase() === payload.productType.toLowerCase()) {
              return product
            }
          })
        }

        // 3. Filter by name search all products regardless of category
        if (payload.productName !== '' && payload.productType.toLowerCase() === 'all') {
          filteredProducts = products.filter((product) => {
            if (ProductService.searchByValue(payload.productName.toLowerCase(), product.name.toLowerCase()) !== -1) {
              return product
            }
          })
        }

        commit('GET_FILTERED_PRODUCTS', filteredProducts)
      }
    )
  },
  RESET_FILTERED_PRODUCTS ({ commit }) {
    commit('RESET_FILTERED_PRODUCTS', [])
  },
  CLEAR_ALL_PRODUCTS ({ commit }) {
    commit('CLEAR_ALL_PRODUCTS', [])
  }
}
