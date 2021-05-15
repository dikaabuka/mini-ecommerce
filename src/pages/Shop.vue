<template>
  <div id="search-wrapper" class="search">

    <!-- Search Form-->
    <div :class="filteredProducts.length === 0 ? 'mt-100' : ''"
         class="animated main"
    >
      <div class="header">
        <h1 class="search-title">Search Products</h1>

      </div>
      <div class="content">

        <div>
          <!--  Inline Loader-->
          <UiFormLoaderInline
            v-if="search.isSearching"
          />
          <!--  Inline Loader-->

          <div class="search-element">
            <UiInputText
              v-model="search.productName"
              placeholder="Search by name or description"
              :error="productNameError"
              :max-length="'30'"
              :after-padding="true"
              @blur="validateInput()"
            >
              <div slot="before">
                <i aria-hidden="true" class="fas fa-search"></i>
              </div>
              <div slot="after">

                <UiBaseSelect
                  style="position: relative"
                  :error="productTypeError"
                  :defaultSelection="defaultProductType"
                  :disabled="false"
                  :maxItem="1000"
                  :options="productTypes"
                  class="camelcase"
                  name="productType"
                  placeholder=""
                  v-on:selected="updateSearchType"
                >
                </UiBaseSelect>

              </div>

              <button class="buttons" @click="searchProduct">
                Search &nbsp;&nbsp;<i class="fas fa-arrow-right"></i>
              </button>

            </UiInputText>
          </div>
          <div class="search-btn">
            <button class="right-btn buttons" @click="resetSearch">
              Reset &nbsp;&nbsp;<i class="fas fa-sync"></i>
            </button>
            <button class="right-btn buttons last" @click="searchProduct">
              Search &nbsp;&nbsp;<i class="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>

      </div>
    </div>
    <!-- Search Form-->

    <!--       Result Grid-->
    <div class="break">
      <UiFlexGrid
        v-if="filteredProducts.length  > 0"
        :result-set="filteredProducts"
        @processProduct="handleProduct"
      />
    </div>

  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import UiInputText from '@/components/form-elements/UiInputText.vue'
import UiBaseSelect from '@/components/form-elements/UiBaseSelect'
import UiFormLoaderInline from '@/components/form-loaders/UiFormLoaderInline'
import UiFlexGrid from '@/components/form-elements/UiFlexGrid'

export default {
  name: 'Shop',
  components: {
    UiInputText,
    UiBaseSelect,
    UiFormLoaderInline,
    UiFlexGrid
  },

  data () {
    return {
      dataMode: 'S',
      search: {
        productName: '',
        productType: '',
        isSearching: false
      },
      productNameError: false,
      productTypeError: { 'form-error': false },
      products: [],
      filteredProducts: [],
      productTypes: [],
      productType: {
        id: '',
        label: ''
      },
      cart: {
        total: 0,
        items: []
      },
      orders: []
    }
  },

  computed: {
    ...mapState({
      ordersState: state => state.cartModule.orders,
      cartState: state => state.cartModule.products,
      productTypesState: state => state.productModule.productTypes,
      productsState: state => state.productModule.products,
      filteredProductsState: state => state.productModule.filteredProducts
    }),
    defaultProductType () {
      let defaultProductType = {
        id: '',
        label: ''
      }
      if (this.productTypes.length > 0) {
        defaultProductType = this.productTypes[0]
      }

      return defaultProductType
    },
    currentUser () {
      const current = localStorage.getItem('currentUser')
      if (current) {
        return JSON.parse(current)
      } else {
        return {
          token: null,
          id: null,
          email: null

        }
      }
    }

  },

  watch: {
    productTypesState: {
      deep: true,
      handler (update) {
        if (update) {
          this.productTypes = JSON.parse(JSON.stringify(this.productTypesState))
          this.productType = this.productTypes[0]
          this.updateSearchType(this.productType)
        }
      }
    },
    productsState: {
      deep: true,
      handler (update) {
        if (update) {
          this.products = JSON.parse(JSON.stringify(this.productsState))
        }
      }
    },
    filteredProductsState: {
      deep: true,
      handler (update) {
        if (update) {
          this.filteredProducts = JSON.parse(JSON.stringify(this.filteredProductsState))
          this.search.isSearching = false

          if (this.filteredProducts.length > 0) {
            this.$toast.open({
              message:
                `<p class="toast-title"><i aria-hidden="true" class="fas fa-search"></i>  Search Notification</p>
        <p class="toast-msg"> We found ${this.filteredProducts.length}
        result${this.filteredProducts.length > 1 ? 's' : ''}
          based on your search parameter
         </p>`,
              type: 'success',
              duration: 4000,
              dismissible: true

            })
          }
          if (this.filteredProducts.length === 0 && this.dataMode === 'S') {
            this.$toast.open({
              message:
                `<p class="toast-title">Search Notification</p>
        <p class="toast-msg"> Sorry!...We couldn't find any result
          based on your search parameter
         </p>`,
              type: 'default',
              duration: 4000,
              dismissible: true

            })
          }
        }
      }
    }
  },

  mounted () {
    this.getAllProducts()
    this.getAllProductTypes()
    this.triggerHelperNotification(4000, 0)
  },

  methods: {
    validateInput () {
      if (this.search.productName !== '') {
        const isValidInput = /^[a-zA-Z]+$/.test(this.search.productName.replace(/\s/g, ''))
        this.productNameError = !isValidInput

        if (!isValidInput) {
          this.$toast.open({
            message:
              `<p class="toast-title"><i aria-hidden="true" class="fas fa-shield-virus"></i> Form Validation Message</p>
        <p class="toast-msg"> Kindly enter a product name without numbers . Only alphabets are allowed </p>`,
            type: 'error',
            duration: 4000,
            dismissible: true

          })
        }

        return isValidInput
      }
    },

    searchProduct () {
      this.search.productType = this.productType.label.toLowerCase()

      // 1. Validation for empty input
      if (this.search.productName === '' && this.search.productType.toLowerCase() === 'all') {
        this.$toast.open({
          message:
            `<p class="toast-title"><i aria-hidden="true" class="fas fa-shield-virus"></i> Form Validation Message</p>
        <p class="toast-msg"> Kindly enter a product name or select a category to search for a product</p>`,
          type: 'error',
          duration: 4000,
          dismissible: true

        })
        return
      }

      // 2. validation for product name field ( only Alphabets a-z allowed)
      if (this.search.productName !== '' && !this.validateInput()) return

      this.search.isSearching = true
      this.dataMode = 'S'
      setTimeout(() => {
        this.getFilteredProducts(this.search)
      }, 1000)
    },

    resetSearch () {
      this.search = {
        productName: '',
        productType: '',
        isSearching: false
      }
      this.productTypes = JSON.parse(JSON.stringify(this.productTypesState))
      this.productType = this.productTypes[0]
      this.updateSearchType(this.productType)
      this.dataMode = 'R'
      this.resetFilteredProducts()
    },

    updateSearchType (selection) {
      if (selection) {
        this.productType = {
          id: selection.id,
          label: selection.label
        }
      }
    },

    handleProduct (arg) {
      if (arg.mode === 'A') {
        const match = this.cartState.filter((product) => product.id === arg.id)
        if (match.length > 0) {
          const payload = {
            ...match[0],
            quantity: match[0].quantity + arg.quantity
          }
          this.updateCart(payload)
        } else {
          this.addToCart(arg)
        }
      }
      if (arg.mode === 'B') {
        // Validation if product has already been purchased
        if (this.confirmExisting(this.ordersState, arg.id)) {
          this.$toast.open({
            message:
              `<p class="toast-title">
                <i aria-hidden="true" class="fab fa-shopify"></i>
                 Item Already Purchased
              </p>
               <p class="toast-msg">
                Hi User, you've already purchased this item, kindly buy a similar item
              </p>`,
            type: 'info',
            duration: 4000,
            dismissible: true

          })
          return
        }

        if (this.confirmExisting(this.cartState, arg.id)) {
          this.$toast.open({
            message:
              `<p class="toast-title">
                <i aria-hidden="true" class="fab fa-shopify"></i>
                 Item Already in Your Cart
              </p>
               <p class="toast-msg">
                Hi User, you've already added this item, kindly open your cart and complete your order
              </p>`,
            type: 'info',
            duration: 4000,
            dismissible: true

          })
          return
        }

        const total = parseFloat(arg.quantity * arg.price).toFixed(2)
        const payload = {
          ...arg,
          total
        }

        this.processOrder(payload)
      }
    },

    confirmExisting (array, id) {
      if (this.$typeChecker(array) === 'array' && array.length > 0 && this.$typeChecker(id) === 'number' && id !== 0) {
        return array.some(el => el.id === id)
      }
    },

    triggerHelperNotification (duration, timer) {
      if (this.currentUser.token === null) {
        return
      }

      setTimeout(() => {
        this.$toast.open({
          message:
            `<p class="toast-title"><i aria-hidden="true" class="fas fa-lightbulb"></i> Welcome Back ${this.currentUser.name}</p>
        <p class="toast-msg"> You can now search for products by name and type </p>`,
          type: 'info',
          duration,
          dismissible: true

        })
      }, timer)
    },

    ...mapActions({
      // Product Actions
      getAllProducts: 'productModule/GET_ALL_PRODUCTS',
      getAllProductTypes: 'productModule/GET_ALL_PRODUCT_TYPES',
      getFilteredProducts: 'productModule/GET_FILTERED_PRODUCTS',
      resetFilteredProducts: 'productModule/RESET_FILTERED_PRODUCTS',
      clearAllProducts: 'productModule/CLEAR_ALL_PRODUCTS',
      // Product Actions

      // Cart Actions
      addToCart: 'cartModule/ADD_TO_CART',
      removeFromCart: 'cartModule/REMOVE_FROM_CART',
      updateCart: 'cartModule/UPDATE_CART',
      emptyCart: 'cartModule/EMPTY_CART',
      processOrder: 'cartModule/PROCESS_ORDERS'
      // Cart Actions
    })
  }
}
</script>
<style lang="scss" scoped>
.search {
  width: 100%;
  height: auto;
  display: inline-block;
  margin: auto;
  position: relative;

  .mt-100 {
    -moz-transition: all 0.5s ease-in-out;
    transition: all 0.5s ease-in-out;
    margin-top: 17% !important;
  }

  .break {
    margin-top: 30px;
    flex-basis: 100%;
    height: 0;
  }

  .main {
    display: block;
    position: relative;
    border: 1px solid rgba(0, 0, 0, 0.25);
    padding: 0 15px;
    background: #fff;
    max-width: 800px;
    width: 100%;
    margin: auto;
    border-radius: 2px;
    box-shadow: 0 11px 15px -7px rgba(0, 0, 0, .2),
    0 24px 38px 3px rgba(0, 0, 0, .14),
    0 9px 46px 8px rgba(0, 0, 0, .12);

    &:hover{
      border: 2px solid #039be5;
      cursor:pointer;
    }

    .header {
      text-align: center;
    }

    .content {
      display: inline-block;
      position: relative;
      margin: 10px auto;
      width: 100%;

      .error-text {
        i {
          font-size: 12px;
          opacity: .5
        }
      }
    }

    .buttons {
      display: flex;
      justify-content: center;
      align-items: center;
      align-content: center;
      border: 1px solid rgba(0, 0, 0, 0.22);
      width: auto;
      height: 40px;
      margin: 2px auto;
      font-weight: 500;
      line-height: normal;
      font-family: Roboto, sans-serif;
      text-transform: capitalize;
      font-size: 1.1rem;
      padding: 0 10px;
      border-radius: 3px;
      color: #fff;
      background: #039be5;
      box-shadow: 0 7px 13px -6px rgba(0, 0, 0, .42), 0 2px 11px 0 rgba(0, 0, 0, .12), 0 4px 5px -3px rgba(0, 0, 0, .2);

      i {
        opacity: .5;
        font-size: 18px;
        display: inline-block;
        position: relative;
        padding-left: 6px;
        padding-top: 4px;
      }
    }

    .buttons:hover {
      background: #00a27f;
      cursor: pointer;
      opacity: .8;
      box-shadow: 0 2px 5px -2px rgba(0, 0, 0, .42), 0 2px 5px 0 rgba(0, 0, 0, .12), 0 2px 2px -3px rgba(0, 0, 0, .2);
    }

    .error {
      background-color: crimson;
      padding: 10px;
      font-size: 12px;
      opacity: 1;
      transition: all 0.5s;
    }

    .search-title {
      color: #061a2c;
      font-size: 1.2rem;
      text-align: center;
      font-weight: 500;
      margin-top: 10px;
      margin-bottom: 5px;
      width: 100%;
      display: inline-block;
    }

    .search-element {
      display: inline-block;
      width: 72%;
      float: left;
    }

    .search-btn {
      display: inline-block;
      width: 28%;
      float: left;
    }

    .right-btn {
      float: right;
      display: inline-block !important;
    }

    .last {
      margin-right: 10px;
    }

    @media only screen and (max-width: 767px) {

      .search-element {
        display: inline-block;
        width: 100%;
        float: left;
      }

      .search-btn {
        display: inline-block;
        width: 100%;
        float: left;
      }

    }

  }
}

</style>
