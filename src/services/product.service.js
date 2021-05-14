// import { assert } from '@/core'
// import { ErrorWrapper, ResponseWrapper } from './util'

import store from '@/store'
import { BaseService } from './base.service'
import { ResponseWrapper } from './util'

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

  static getAllProducts () {
    const response = {
      status: 200,
      data: [
        {
          id: 1,
          name: 'JavaScript Basics',
          type: 'books',
          price: 250.00,
          description: 'A small guide for JavaScript Beginners'
        },
        {
          id: 2,
          name: 'HTML & CSS Basics',
          type: 'books',
          price: 195.90,
          description: 'A small guide for Web Developers'
        },
        {
          id: 3,
          name: 'Vue.JS MasterClass',
          type: 'books',
          price: 469.90,
          description: 'A comprehensive guide for javaScript Developers'
        },
        {
          id: 4,
          name: 'Michael Jackson Discography',
          type: 'music',
          price: 1495.90,
          description: 'A classic collection of Michael jackson\'s greatest hits produced by Sony Studios'
        },
        {
          id: 5,
          name: 'Never Back Down Album by Elton John',
          type: 'music',
          price: 278.90,
          description: 'A classic 1980 premium album by Marvel Studios'
        },
        {
          id: 6,
          name: 'Kissed by a Rose Album by Seal',
          type: 'music',
          price: 600.90,
          description: 'A classic 1998 premium album by DC Studios'
        },
        {
          id: 7,
          name: 'FIFA 2021',
          type: 'games',
          price: 950.00,
          description: 'FIFA Football game for PS5, PC, XBOX All in one by EA Sports'
        },
        {
          id: 8,
          name: 'Pro Evolution Soccer PES 2021',
          type: 'games',
          price: 935.99,
          description: 'PES Football game for PS5, PC, XBOX All in one by Konami'
        },
        {
          id: 9,
          name: 'Street Fighter XII',
          type: 'games',
          price: 375.49,
          description: 'Street Fight combat game by Capcom for for PS5, PC, XBOX All '
        },
        {
          id: 10,
          name: 'Node.JS Fundamentals',
          type: 'books',
          price: 525.49,
          description: 'A comprehensive guide to backend development with NodeJs'
        },
        {
          id: 11,
          name: 'Love is the greatest Album by Celine Dion',
          type: 'music',
          price: 185.49,
          description: 'A premium collection of Celine Dion from 1998 - 2012'
        },
        {
          id: 12,
          name: 'NBA 2K21 by EA Sports',
          type: 'games',
          price: 1025.49,
          description: 'Best Basketball game with premium updates, transfers for PS5, PC and Xbox by EA Sports'
        }, {
          id: 13,
          name: 'Marvels Avengers',
          type: 'games',
          price: 659.99,
          description: 'Amazing adventures with multiple heroes and villains produced by marvel for PS5, PC and Xbox'
        }
      ]
    }
    const data = {
      content: response.data,
      total: response.data.length
    }
    return new ResponseWrapper(response, data)
  }

  static getFilteredProducts (args) {
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

  static getAllProductTypes () {
    const response = {
      status: 200,
      data: [

        { id: 1, label: 'All' },
        { id: 2, label: 'Books' },
        { id: 3, label: 'Music' },
        { id: 4, label: 'Games' }
      ]
    }
    const data = {
      content: response.data,
      total: response.data.length
    }
    return new ResponseWrapper(response, data)
  }

  static resetFilteredProducts () {
    return []
  }

  static clearAllProducts () {
    return []
  }

  // static async getAllProducts (params = {}) {
  //   try {
  //     const response = await this.request({ auth: false }).get(`${this.entity}?${this.querystring(params)}`)
  //     const data = {
  //       content: response.data.data,
  //       total: Number(response.headers['x-total-count'])
  //     }
  //     return new ResponseWrapper(response, data)
  //   } catch (error) {
  //     const message = error.response.data ? error.response.data.error : error.response.statusText
  //     throw new ErrorWrapper(error, message)
  //   }
  // }

  // static async getFilteredProducts (params = {}) {
  //   assert.object(params, { required: true })
  //   assert.object(params.filter, { required: true })
  //   assert.id(params.filter.userId, { required: true })
  //
  //   try {
  //     const response = await this.request({ auth: true }).get(`${this.entity}?${this.querystring(params)}`)
  //     const data = {
  //       content: response.data.data,
  //       total: Number(response.headers['x-total-count'])
  //     }
  //     return new ResponseWrapper(response, data)
  //   } catch (error) {
  //     const message = error.response.data ? error.response.data.error : error.response.statusText
  //     throw new ErrorWrapper(error, message)
  //   }
  // }
}
