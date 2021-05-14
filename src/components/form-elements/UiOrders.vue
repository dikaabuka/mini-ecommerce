<template>
  <div id="cart" class="animated fadeInDown">

    <main>

      <section class="modal-header">
        <div class="modal-title"><i class="fab fa-shopify"></i> Your Orders</div>
        <div
          class="close-overlay"
          @click="closeOverlay"
        >
          <button type="button" class="btn">×</button>

        </div>

      </section>
      <section class="cart">
        <div class="cart-padding">
          <ul v-if="orders.length > 0">
            <li class="item"
                v-for="product in orders" :key="product.id"
            >
              <h3 class="name">
                <i class="card-type-icon" :class="categoryIcon(product.type)"/>
                <span class="card-type-text">
                  {{ product.name }} x {{ `${product.quantity} cop${product.quantity === 1 ? 'y' : 'ies'}` }}
                </span>
              </h3>
              <p class="price"> €{{ product.price }}</p>
            </li>
          </ul>
        </div>

      </section>
      <section class="others">
        <section v-if="orders.length > 0" class="summary">
          <div class="items">
            <i class="fab fa-shopify"/> {{ orderCount }}
            Order{{ orderCount > 1 ? 's' : '' }}
          </div>
          <div class="total">€{{ orderTotal }}</div>
        </section>
        <section v-else class="no-order">

            <i class="fab fa-shopify small-padding"/> &nbsp; No Orders placed yet

        </section>

        <section v-if="orders.length > 0" class="actions">
          <button class="right-btn buttons">
            Paid Via MasterCard &nbsp;&nbsp;<i class="fas fa-credit-card"></i>
          </button>
        </section>
      </section>

    </main>

  </div>

</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'UiOrders',
  data () {
    return {
      orders: []
    }
  },

  computed: {
    ...mapState({
      ordersState: state => state.cartModule.orders
    }),
    orderCount () {
      return this.orders.length
    },
    orderTotal () {
      if (this.orders.length > 0) {
        const total = this.orders.reduce((prev, next) => prev + (next.price * next.quantity), 0)
        return parseFloat(total).toFixed(2)
      } else {
        return 0
      }
    }
  },

  watch: {
    ordersState: {
      immediate: true,
      handler (update) {
        if (update) {
          this.orders = JSON.parse(JSON.stringify(this.ordersState))
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
    }
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
  width: 100%
}

.cart {
  width: 70%;
}

.others {
  width: 30%;
  padding: 1rem 1rem 1rem 0;
}

.summary, .actions, .coupon, .no-order {
  width: 100%
}

.no-order{
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

.small-padding{
  margin-right:7px;
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
    float: none;
    display: block !important;
    margin: -6px auto;
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

.card-type-icon {
  font-size: 17px;
  position: absolute;
  color: #00a27f;
  margin-top: 0;
}

.card-type-text {
  margin-left: 24px;
  display: inline-block;
  position: relative;
  font-weight: 500;

}

@media (max-width: 55rem) {
  .cart {
    width: 100% !important;
    max-height: 318px;
    overflow-y: auto;
  }
  .others {
    width: 100% !important;
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
  .cart .name,
  .cart .price {
    font-size: 17px;
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
    background: #b00729;
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
    background-image: none;
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

</style>
