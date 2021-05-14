import { ErrorWrapper, ResponseWrapper } from './util'
import store from '@/store'
import { BaseService } from './base.service'

export class ProductService extends BaseService {
  static get entity () {
    return 'products'
  }

  static searchByValue (pattern, text) {
    let i
    let j
    if (pattern.length === 0) { return 0 } // Immediate match

    // Compute longest suffix-prefix table
    const lsp = [0] // Base case
    for (i = 1; i < pattern.length; i++) {
      j = lsp[i - 1] // Start by assuming we're extending the previous LSP
      while (j > 0 && pattern.charAt(i) !== pattern.charAt(j)) { j = lsp[j - 1] }
      if (pattern.charAt(i) === pattern.charAt(j)) { j++ }
      lsp.push(j)
    }

    // Walk through text string
    j = 0 // Number of chars matched in pattern
    for (i = 0; i < text.length; i++) {
      while (j > 0 && text.charAt(i) !== pattern.charAt(j)) { j = lsp[j - 1] } // Fall back in the pattern
      if (text.charAt(i) === pattern.charAt(j)) {
        j++ // Next char matched, increment position
        if (j === pattern.length) { return i - (j - 1) }
      }
    }
    return -1 // Not found
  }

  static resetFilteredProducts () {
    return []
  }

  static clearAllProducts () {
    return []
  }

  static async getAllProducts () {
    try {
      const response = await this.request({ auth: true }).get(`${this.entity}`)
      const data = {
        content: response,
        total: response.data.length
      }
      return new ResponseWrapper(response, data)
    } catch (error) {
      const message = error.response.data ? error.response.data.error : error.response.statusText
      throw new ErrorWrapper(error, message)
    }
  }

  static async getFilteredProducts (params) {
    try {
      const response = await this.request({ auth: true }).get(`${this.entity}`)
      const data = {
        content: response,
        total: response.data.length
      }
      return new ResponseWrapper(response, data)
    } catch (error) {
      const message = error.response.data ? error.response.data.error : error.response.statusText
      throw new ErrorWrapper(error, message)
    }
  }

  static async getAllProductTypes () {
    try {
      const response = await this.request({ auth: true }).get('productTypes')
      const data = {
        content: response,
        total: response.data.length
      }
      return new ResponseWrapper(response, data)
    } catch (error) {
      const message = error.response.data ? error.response.data.error : error.response.statusText
      throw new ErrorWrapper(error, message)
    }
  }

  static getFilteredProductsOld (args) {
    if (args) {
      const products = store.state.productModule.products
      let filteredProducts = []
      if (args.productName === '' && args.productType.toLowerCase() !== 'all') {
        // 1. Filter by only category where no product name is entered
        filteredProducts = products.filter((product) => {
          return product.type === args.productType.toLowerCase()
        })
      } else if (args.productName !== '' && args.productType.toLowerCase() !== 'all') {
        // 2. Filter by category then search for product match in that category
        filteredProducts = products.filter((product) => {
          if (ProductService.searchByValue(args.productName.toLowerCase(), product.name.toLowerCase()) !== -1 &&
            (product.type).toLowerCase() === args.productType.toLowerCase()) {
            return product
          }
        })
      } else {
        // 3. Filter by name search all products regardless of category
        filteredProducts = products.filter((product) => {
          if (ProductService.searchByValue(args.productName.toLowerCase(), product.name.toLowerCase()) !== -1) {
            return product
          }
        })
      }

      const response = {
        status: 200,
        data: filteredProducts
      }
      const data = {
        content: response.data,
        total: response.data.length
      }
      return new ResponseWrapper(response, data)
    }
  }
}
