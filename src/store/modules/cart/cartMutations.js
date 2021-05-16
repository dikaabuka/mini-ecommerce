export default {

  // Cart Mutations
  ADD_TO_CART (state, payload) {
    state.products = [...state.products, payload]
    // 1. Using VM Instance Method
    this._vm.$toast.open({
      message:
        `<p class="toast-title">
          <i aria-hidden="true" class="fas fa-lightbulb"></i>
           Cart Notification
        </p>
        <p class="toast-msg">
          ${payload.name.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))}
            has been added to Cart successfully
        </p>`,
      type: 'success',
      duration: 5000,
      dismissible: true

    })

    // 2. Using Event Bus
    // const notification = {
    //   title: '<i aria-hidden="true" class="fas fa-lightbulb"></i> Cart Notification',
    //   message: `${transformedText} has been added to Cart successfully`,
    //   type: 'success',
    //   duration: 5000,
    //   dismissible: true
    // }
    // this._vm.$bus.$emit('notifyUser', notification)
  },

  REMOVE_FROM_CART (state, payload) {
    state.products = state.products.filter(({ id }) => id !== payload.id)
    this._vm.$toast.open({
      message:
        `<p class="toast-title">
          <i aria-hidden="true" class="fas fa-lightbulb"></i>
           Cart Notification
        </p>
        <p class="toast-msg">
          ${payload.name.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))}
          has been removed from your cart
        </p>`,
      type: 'success',
      duration: 5000,
      dismissible: true

    })
  },

  UPDATE_CART (state, payload) {
    if (payload.id) {
      state.products = state.products.map(product =>
        product.id === payload.id ? {
          ...product,
          quantity: payload.quantity
        } : product
      )

      this._vm.$toast.open({
        message:
          `<p class="toast-title">
          <i aria-hidden="true" class="fas fa-lightbulb"></i>
           Cart Notification
        </p>
        <p class="toast-msg">
          ${payload.name.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))}'s
            quantity in your Cart has been updated successfully
        </p>`,
        type: 'success',
        duration: 5000,
        dismissible: true

      })
    }
  },

  EMPTY_CART (state, payload) {
    state.products = payload
  },

  // Orders Mutations
  PROCESS_ORDERS (state, payload) {
    if ('cart' in payload) {
      state.orders = [...state.orders, ...payload.cart]
    } else {
      state.orders = [...state.orders, payload]
    }

    let successMessage = ''
    if ('cart' in payload) {
      successMessage = `Your items have been purchased successfully. A total of €${payload.total} has been deducted from your card`
    } else {
      successMessage = `${payload.name.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))}
          has been purchased successfully. A total of €${payload.total} has been deducted from your card`
    }

    // 1. Using VM Instance Method
    this._vm.$toast.open({
      message:
        `<p class="toast-title">
          <i aria-hidden="true" class="fab fa-shopify"></i>
          Payment Notification
        </p>
        <p class="toast-msg">
        ${successMessage}
       </p>`,
      type: 'success',
      duration: 10000,
      dismissible: true

    })
  }

}
