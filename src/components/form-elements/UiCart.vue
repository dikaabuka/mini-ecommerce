<template>
  <div id="cart" class="animated fadeInDown">

    <main>

      <section class="modal-header">
        <div class="modal-title"><i class="fas fa-shopping-cart"></i> Your Cart</div>
        <div
          class="close-overlay"
          @click="closeOverlay"
        >
          <button type="button" class="btn">×</button>

        </div>

      </section>
      <section class="cart">
        <div class="cart-padding">
          <ul v-if="cart.length > 0">
            <li class="item"
                v-for="product in cart" :key="product.id"
            >
              <div class="name">
                <div class="card-product-name example-elements">
                  <div
                    :data-tooltip="`${product.name}`">
                    <h3 class="name">
                      <i class="card-type-icon" :class="categoryIcon(product.type)"/>
                      <span class="card-type-text">
                       {{ product.name }}
                      </span>
                    </h3>
                  </div>
                </div>

                <div class="card-product-price">
                  <p class="price"> €{{
                      $formatAmount(parseFloat(product.price * product.quantity).toFixed(2))
                    }}</p>
                </div>
                <div class="card-remove-product">
                  <div class="card-btns">
                    <button
                      class="buttons"
                      @click="removeProduct(product)"
                    >
                      <i class="fas fa-times-circle" aria-hidden="true"></i>

                    </button>
                  </div>

                </div>
                <div class="card-quantity">
                  <UiInputText
                    v-model="product.quantity"
                    :type="'number'"
                    :readOnly="readOnly"
                    placeholder="Quantity"
                    :error="quantityError"
                    :max-length="'30'"
                    :after-padding="true"
                    onkeydown="return event.keyCode!==69"
                  >
                  </UiInputText>
                </div>

              </div>

            </li>

          </ul>
        </div>

      </section>
      <section class="others">
        <section v-if="cart.length > 0" class="summary">
          <div class="items">
            <i class="fas fa-shopping-cart"/> {{ cartCount }}
            item{{ cartCount > 1 ? 's' : '' }}
          </div>
          <div class="total">€{{ $formatAmount(cartTotal) }}</div>
        </section>
        <section v-else class="no-products">

          <i class="fas fa-shopping-cart small-padding"/> &nbsp; Your Cart is empty.

        </section>
        <section @click="triggerCheckOut" class="actions">
          <button class="right-btn buttons">
            CheckOut &nbsp;&nbsp;<i class="fas fa-credit-card"></i>
          </button>
        </section>
        <section class="coupon">
          Need a coupon code ?
        </section>
      </section>

    </main>

  </div>

</template>

<script>
import { mapState, mapActions } from 'vuex'
import UiInputText from '@/components/form-elements/UiInputText.vue'

export default {
  name: 'UiCart',
  components: { UiInputText },
  data () {
    return {
      readOnly: false,
      cart: [],
      products: {},
      quantityError: false
    }
  },
  computed: {
    ...mapState({
      cartState: state => state.cartModule.products
    }),
    cartCount () {
      return this.cart.length
    },
    cartTotal () {
      if (this.cart.length > 0) {
        const total = this.cart.reduce((prev, next) => prev + (next.price * next.quantity), 0)
        return parseFloat(total).toFixed(2)
      } else {
        return 0
      }
    }
  },
  watch: {
    cartState: {
      immediate: true,
      handler (update) {
        if (update) {
          this.cart = JSON.parse(JSON.stringify(this.cartState))
        }
      }
    }
  },
  mounted () {
  },
  methods: {
    closeOverlay () {
      this.$emit('closeOverlayHandler', null)
    },
    triggerCheckOut () {
      if (this.cart.length === 0) {
        this.$toast.open({
          message:
            `<p class="toast-title"><i aria-hidden="true" class="fas fa-shield-virus"></i> Cart Validation Message</p>
        <p class="toast-msg"> Kindly add one or more products before checking out. Your cart is empty at the moment </p>`,
          type: 'error',
          duration: 5000,
          dismissible: true
        })

        return
      }

      const payload = {
        cart: this.cart,
        total: this.cartTotal
      }
      this.$emit('checkOutHandler', payload)
    },
    categoryIcon (productType) {
      let icon = ''
      switch (productType) {
        case 'music':
          icon = 'fas fa-music'
          break

        case 'books':
          icon = 'fas fa-book'
          break

        case 'games':
          icon = 'fas fa-gamepad'
          break

        default:
          icon = 'fas fa-tags'
          break
      }
      return icon
    },
    getProduct (product, mode) {
      if (product && mode) {
        this.$emit('processProduct', {
          ...product,
          mode,
          quantity: this.products[`item_${product.id}`] ?? 1

        })
      }
    },
    removeProduct (product) {
      if (product && product.id !== '') {
        console.log('R', product)
        this.removeFromCart(product)
      }
    },

    ...mapActions({
      removeFromCart: 'cartModule/REMOVE_FROM_CART'
    })
  }
}
</script>

<style lang="scss" scoped>

body, main {

  .modal-header, .cart, .others {
    display: inline-block;
    float: left;
  }
}

.modal-header {
  width: 100%;
  position: relative;
  z-index: 0;
}

.cart {
  width: 70%;
}

.cart .price {
  font-size: 17px;
  text-align: left;
  margin-top: 11px;
}

h3 .name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
}

.others {
  width: 30%;
  padding: 1rem 1rem 1rem 0;
}

.summary, .actions, .coupon, .no-products {
  width: 100%
}

.summary {
  display: flex;
  justify-content: space-between;
  height: 55px !important;
  font-size: 18px;
  margin-bottom: 1rem;
  overflow-y: auto;
  background: #039be5;
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0 2px 2px 1px rgba(0, 0, 0, 0.1);

  .total {
    text-align: right;
  }
}

.no-products {
  display: flex;
  height: 55px !important;
  font-size: 18px;
  margin-bottom: 1rem;
  overflow-y: auto;
  background: #039be5;
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0 2px 2px 1px rgba(0, 0, 0, 0.1);
  justify-content: center !important;
  align-content: center !important;
  align-items: center !important;
  align-self: center !important;
}

.small-padding {
  margin-right: 7px;
}

.cart {

  max-height: 598px;
  overflow-y: auto;

  .cart-padding {
    margin: 1em;
    background: white;
    padding: 0;
  }

  .item {
    display: flex;
    padding: 0.5rem;
    background-color: transparent;
    font-size: 18px;
    color: #061a2c;
    text-decoration: none;
    justify-content: space-between;

    &:not(:last-child) {
      border-top: 1px solid rgba(0, 0, 0, 0.1);
      border-left: 1px solid rgba(0, 0, 0, 0.1);
      border-right: 1px solid rgba(0, 0, 0, 0.1);
    }

    &:last-child {
      border: 1px solid rgba(0, 0, 0, 0.1);
    }
  }

  .name {
    font-size: 18px;
    font-weight: 400;
    margin: 0;
    width: 100%;
  }

  .price {
    margin: 0;
  }
}

.actions {
  height: 61px !important;
  font-size: 18px;
  margin-bottom: 1rem;
  background: #527a70;
  text-align: right;

  .buttons {
    position: relative;
    z-index: 99999999999999999;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    border: 1px solid rgba(0, 0, 0, 0.22);
    width: auto;
    height: 40px;
    margin: -6.5px -5px;
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

  .right-btn {
    float: right;
    display: inline-block !important;
  }
}

.modal-header {
  color: #061a2c;
  text-decoration: none;
  background: #ffffff;
  font-weight: 600;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0 2px 2px 1px rgba(0, 0, 0, 0.1);
}

.modal-title {
  font-size: 20px;
  text-align: center;
  margin: 0;
  line-height: 1.42857143;
}

.coupon {
  height: 61px !important;
  font-size: 18px;
  text-align: center;
  color: #ffffff;
  background: #061a2c;
}

section {
  background: #f7f7f7;
  border-radius: 2px;
  padding: 1rem;
  min-height: 3rem;
}

main {
  background: #f7f7f7;
  border: 1px solid rgba(0, 0, 0, 0.2);
  color: white;
  font-family: "Heebo", sans-serif;
  font-weight: 300;
  position: relative;
  height: auto;
  display: inline-table;
  margin: 0 !important;
  padding: 0 !important;
  max-width: 1000px;
  width: 100%;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.btn {
  display: inline-block;
  background-color: white;
  border: 1px solid #cccccc;
  color: #696969;
  padding: 0.5rem;
  text-transform: lowercase;
}

.card-btns {
  .buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    border: 1px solid rgba(0, 0, 0, 0.22);
    width: auto;
    height: 40px;
    margin: 2px 0 0 5px;
    font-weight: 500;
    line-height: normal;
    font-family: Roboto, sans-serif;
    text-transform: capitalize;
    text-align: center !important;
    font-size: 0.9rem;
    padding: 0 15px;
    border-radius: 3px;
    color: #fff;
    background: crimson;
    box-shadow: 0 7px 13px -6px rgba(0, 0, 0, .42), 0 2px 11px 0 rgba(0, 0, 0, .12), 0 4px 5px -3px rgba(0, 0, 0, .2);

    i {
      opacity: .5;
      font-size: 13px;
      display: inline-block;
      position: relative;
    }
  }

  .buttons:hover {
    background: #00a27f;
    cursor: pointer;
    opacity: .8;
    box-shadow: 0 2px 5px -2px rgba(0, 0, 0, .42), 0 2px 5px 0 rgba(0, 0, 0, .12), 0 2px 2px -3px rgba(0, 0, 0, .2);
  }

  .buy-now {
    display: inline-block;
    float: right;
  }

  .add-to-cart {
    display: inline-block;
    float: left;

  }
}

.card-type-icon {
  font-size: 17px;
  position: absolute;
  color: #00a27f;
  margin-top: 11px;
}

.card-product-name, .card-quantity, .card-remove-product, .card-product-price {
  display: inline-block;
  position: relative;
  font-weight: 500;
  float: left;

}

.card-quantity, .card-remove-product {
  float: right !important;
}

.card-type-text {
  display: inline-block;
  position: relative;
  font-weight: 500;
  margin: 11px 5px 0 24px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 320px;
}

.card-product-name {
  max-width: 349px;
  width: auto;
  text-align: left;
}

.card-quantity {
  height: 15px !important;
  width: 100px !important;
}

.card-product-price {
  margin-top: 11px;
  float: right !important;
  font-weight: 600;
  width: 130px;

  .price {
    text-align: right;
    padding-left: 0.2em;
  }
}

@media (max-width: 50rem) {

  main {
    background: #f7f7f7;
    border: 1px solid rgba(0, 0, 0, 0.2);
    color: white;
    font-family: "Heebo", sans-serif;
    font-weight: 300;
    position: relative;
    height: auto;
    display: inline-table;
    margin: 4px !important;
    padding: 0 !important;
    max-width: 97%;
    width: 100%;
  }
  .cart {
    width: 100% !important;
    max-height: 318px;
    overflow-y: auto;
    padding: .5em !important;

    .name {
      font-size: 14px;
    }

    .cart-padding {
      margin: 0;
      background: white;
      padding: 0;
    }
  }
  .others {
    width: 100% !important;
    padding: 0 .5em !important;
  }
  .summary, .actions, .coupon, .no-products {
    width: 100%;
    margin: 0 0 .5em 0;
  }
  .card-product-name {
    width: 100%;
    padding-bottom: 0.5em;
    margin-top: -10px;
  }
  .card-product-price {
    padding-left: 0.5em;
    width: 57% !important;

    .price {
      text-align: right;
    }
  }
  .card-quantity {
    float: left !important;
    width: 25% !important;

  }
  .card-remove-product {
    width: 18% !important;
  }

}

@media (min-width: 50rem) {
  main {
    margin: auto;
  }
  .modal-header {
    min-height: 0;
    text-align: center;
  }
  .cart {
    padding: 0;
  }
  .cart .name {
    font-size: 17px;
    padding-left: 0.2em;
  }
  .cart .price {
    font-size: 17px;
    padding-right: 0.2em;
  }
}

.close-overlay {
  z-index: 9999999999;
  position: absolute;
  top: 13px;
  right: 13px;
  float: right;
  cursor: pointer !important;
  -webkit-transition: all 0.4s ease;
  -moz-transition: all 0.4s ease;
  transition: all 0.4s ease;

  .btn {
    color: #fff;
    display: inline-block;
    padding: 6px 12px;
    margin-bottom: 0;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.42857143;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background: #b00729 none;
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 2px;
    -webkit-transition: all 0.4s ease;
    -moz-transition: all 0.4s ease;
    transition: all 0.4s ease;

    &:hover {
      cursor: pointer;
      background: crimson;

    }
  }
}

.close-overlay:hover {
  color: crimson;
  -webkit-transition: all 0.4s ease;
  -moz-transition: all 0.4s ease;
  transition: all 0.4s ease;
}

.concat {
  color: crimson;
  font-weight: 600;
}

</style>
