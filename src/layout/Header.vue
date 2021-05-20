<template>
  <div class="header wrapper">

    <!-- Navigation-->
    <div class="menu-wrapper">
      <ul class="menu">
        <li>
          <div>
            <router-link :to="{ name: 'Shop' }" exact>
              <i class="fas fa-store"></i> Store
            </router-link>
          </div>

        </li>
      </ul>
      <ul class="menu side">
        <li v-if="!currentUser.token">
          <div>
            <router-link :to="{ name: 'Login' }">
              <i class="fas fa-sign-in-alt"></i> login
            </router-link>
          </div>

        </li>

        <li v-if="currentUser.token">
          <div @click="openOverlay('C')">
            <span class="cart-count">{{ cartCount }}</span>
            <i class="fas fa-shopping-cart"></i> Cart
          </div>

        </li>

        <li v-if="currentUser.token">
          <div @click="openOverlay('O')">
            <span class="order-count">{{ orderCount }}</span>
            <i class="fab fa-shopify"></i> Orders
          </div>

        </li>

        <li v-if="currentUser.token">
          <div class="logout-button" @click="logout()">
            <i class="fas fa-sign-out-alt"></i> logout
          </div>
        </li>
      </ul>
    </div>
    <!-- Navigation-->

    <!-- Global Toast Notifications-->
    <div class="clearfix">
      <UiToastList/>
    </div>
    <!-- Global Toast Notifications-->

    <!-- Global Modal / Overlay  -->
    <UiOverlay
      :overlay-mode="toggleOverlay"
      @closeOverlayHandler="closeOverlay"
    >
      <!-- Cart -->
      <div v-if="toggleOverlayMode === 'C'">
        <UiCart
          @closeOverlayHandler="closeOverlay"
          @checkOutHandler="handleProduct"
        />
      </div>

      <!-- Orders -->
      <div v-if="toggleOverlayMode === 'O'">
        <UiOrders
          @closeOverlayHandler="closeOverlay"
        />
      </div>
    </UiOverlay>
    <!-- Global Modal / Overlay  -->

  </div>

</template>

<script>
import { AuthService } from '@/services/auth.service'
import { mapActions, mapState } from 'vuex'
import UiOverlay from '@/components/form-elements/UiOverlay'
import UiToastList from '@/components/form-elements/UiToastList'
import UiCart from '@/components/form-elements/UiCart'
import UiOrders from '@/components/form-elements/UiOrders'

export default {
  name: 'Header',
  components: {
    UiToastList,
    UiOverlay,
    UiCart,
    UiOrders
  },
  data () {
    return {
      toggleOverlayMode: 'C',
      toggleOverlay: false,
      orders: [],
      cart: []
    }
  },
  computed: {
    ...mapState({
      ordersState: state => state.cartModule.orders,
      cartState: state => state.cartModule.products
    }),
    cartCount () {
      return this.cartState.length
    },
    orderCount () {
      return this.ordersState.length
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
    ordersState: {
      deep: true,
      immediate: true,
      handler (update) {
        if (update) {
          this.orders = JSON.parse(JSON.stringify(this.ordersState))
        }
      }
    },
    cartState: {
      deep: true,
      immediate: true,
      handler (update) {
        if (update) {
          this.cart = JSON.parse(JSON.stringify(this.cartState))
        }
      }
    }

  },
  methods: {

    validateToken () {
      const session = JSON.parse(localStorage.getItem('currentUser'))
      if (!session || !session.expiryDate) return

      const currentDate = { date: new Date() }
      const loginTime = new Date(session.expiryDate)
      const currentTime = new Date(currentDate.date)
      const tempDiff = Math.abs(currentTime - loginTime)
      const diff = tempDiff / 36e5

      console.log(Math.round(diff), process.env.TOKEN_LIFESPAN)

      if (Math.round(diff) >= process.env.TOKEN_LIFESPAN) {
        console.log(diff)
        this.logout()
      }
    },

    openOverlay (mode) {
      this.toggleOverlayMode = mode
      this.toggleOverlay = true
    },

    closeOverlay () {
      const frBody = document.querySelector('body')
      frBody.classList.remove('webapp-loading')
      this.toggleOverlay = false
      this.toggleOverlayMode = 'C'
    },

    handleProduct (arg) {
      this.processOrder(arg)
      this.closeOverlay()
      this.emptyCart([])
    },

    confirmExisting (array, id) {
      if (this.$typeChecker(array) === 'array' && array.length > 0 && this.$typeChecker(id) === 'number' && id !== 0) {
        return array.some(el => el.id === id)
      }
    },

    async logout () {
      await AuthService.logOutUser()
    },

    ...mapActions({
      processOrder: 'cartModule/PROCESS_ORDERS',
      emptyCart: 'cartModule/EMPTY_CART'
      // Cart Actions
    })
  },
  created () {
    this.validateToken()
  }

}
</script>

<style lang="scss" scoped>
.header {
  z-index: 1;
  padding: 20px 0;
  position: relative;
  width: 100%;
  display: inline-block;

  .cart-count, .order-count {
    text-align: center;
    font-size: 11px;
    font-weight: 600;
    border-radius: 3px;
    min-width: 23px;
    width: auto;
    background: #00a27f;
    color: #fff;
    padding: 4px;
    position: absolute;
    top: 10px;
    display: block;
    opacity: 1;
    border: 1px solid rgba(0, 0, 0, 0.2);
  }

  .is-active {
    color: #00a27f;
    font-weight: 600;
  }

  a {
    color: #061a2c;
    text-decoration: none;
  }

  .menu-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .menu {
    font-size: 16px;
    text-transform: capitalize;
    display: flex;
    justify-content: center;
    align-items: center;

    li {
      div {
        padding: 15px;
        height: 49px;
        background: #ffffff;
        margin: 0 .5px;
        border-radius: 2px;
        border: 1px solid rgba(0, 0, 0, 0.1);
        box-shadow: 0 2px 4px -2px rgba(0, 0, 0, .42), 0 2px 4px 0 rgba(0, 0, 0, .12), 0 2px 2px -3px rgba(0, 0, 0, .2);
      }

    }

    &:hover div {
      cursor: pointer;
    }

    &.side {
      font-size: 16px;

      .logout-button {
        cursor: pointer;
      }
    }
  }
}

@media screen and (max-width: 767px) {
  .menu {
    text-transform: capitalize;
    display: flex;
    justify-content: center;
    align-items: center;

    li {
      width: 100%;
      font-size: 14px;
      padding: 0;
      display: inline;

      div {
        width: 24.7vw;
        padding: 16px 13px !important;
        text-align: center !important;
        height: 49px;
        background: #ffffff;
        margin: 0 .5px;
        border-radius: 2px;
        border: 1px solid rgba(0, 0, 0, 0.1);
        box-shadow: 0 2px 4px -2px rgba(0, 0, 0, .42), 0 2px 4px 0 rgba(0, 0, 0, .12), 0 2px 2px -3px rgba(0, 0, 0, .2);
      }

      &:hover div {
        cursor: pointer;
      }
    }
  }
}
</style>
