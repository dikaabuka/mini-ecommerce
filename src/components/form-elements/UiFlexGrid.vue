<template>
  <div>
    <ul class="cards">
      <li
        class="cards__item"
        v-for="product in resultSet" :key="product.id"
      >
        <div class="card">
          <div class="card__image" :class="`background_${product.id}`">
          </div>
          <div class="card__content">
            <div class="card-title">{{ product.name }}</div>
            <div class="card-type">
              <div class="half">
                <i class="card-type-icon" :class="categoryIcon(product.type)"/>
                <span class="card-type-text"> {{ product.type }} </span>
              </div>
              <div class="half">
                <div class="card-price">
                  €{{ product.price }}
                </div>
              </div>

            </div>
            <p class="card-text">
              {{ product.description }}
            </p>
            <div class="card-quantity">
              <UiInputText
                v-model="products[`item_${product.id}`]"
                :type="'number'"
                placeholder="Enter Quantity"
                :error="quantityError"
                :max-length="'30'"
                :after-padding="true"
                onkeydown="javascript: return event.keyCode == 69 ? false : true"
              >
                <div slot="before">
                  <i aria-hidden="true" class="fas fa-euro-sign"></i>
                </div>
              </UiInputText>
            </div>

            <div class="card-btns">
              <button
                class="card__btn add-to-cart buttons"
                @click="getProduct(product,'A')"

              >
                Add to Cart
                <i class="fas fa-shopping-cart" aria-hidden="true"></i>

              </button>
              <button class="card__btn buy-now buttons"
                      @click="getProduct(product,'B')"

              >
                Buy Now
                <i class="fas fa-shopping-cart" aria-hidden="true"></i>

              </button>
            </div>

          </div>
        </div>
      </li>
    </ul>
    <div class="footer-padding"></div>
  </div>
</template>

<script>
import UiInputText from '@/components/form-elements/UiInputText.vue'

export default {
  name: 'UiFlexGrid',
  components: { UiInputText },
  props: {
    resultSet: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data () {
    return {
      quantityError: false,
      resultGrid: [],
      products: {}
    }
  },
  mounted () {
  },
  computed: {
    filteredOptions () {
      const filtered = []
      const regOption = new RegExp(this.searchFilter, 'ig')
      for (const option of this.options) {
        if (this.searchFilter.length < 1 || option.label.match(regOption)) {
          if (filtered.length < this.maxItem) filtered.push(option)
        }
      }
      return filtered
    }
  },
  methods: {
    randomId () {
      /* eslint-disable */
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (
        c
      ) {
        let r = (Math.random() * 16) | 0,
          v = c === 'x' ? r : (r & 0x3) | 0x8
        return v.toString(16)
        /* eslint-enable */
      })
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
          quantity: parseInt(this.products[`item_${product.id}`] ?? 1, 10)

        })
      }
    }
  },
  watch: {
    resultSet: {
      deep: true,
      handler (update) {
        if (update) {
          this.resultGrid = this.resultSet
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  background-color: #f0f0f0;
}

body {
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  padding: 1rem;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -moz-font-feature-settings: "liga" on;
}

img {
  height: auto;
  max-width: 100%;
  vertical-align: middle;
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
    width: 110px;
    height: 40px;
    margin: 2px auto;
    font-weight: 500;
    line-height: normal;
    font-family: Roboto, sans-serif;
    text-transform: capitalize;
    text-align: center !important;
    font-size: 0.9rem;
    padding: 0 5px;
    border-radius: 3px;
    color: #fff;
    background: #039be5;
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

.cards {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  cursor: pointer;
}

.cards__item {
  display: flex;
  padding: 1rem;
}

@media (min-width: 56rem) {
  .cards__item {
    width: 33.3333%;
  }
}

@media (min-width: 70rem) {
  .cards__item {
    width: 25%;
  }
}

.card {
  background-color: white;
  border-radius: 2px;
  border: 1px solid rgba(0, 0, 0, 0.18);
  box-shadow: 0 20px 40px -14px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  -webkit-transition: all 0.4s ease;
  -moz-transition: all 0.4s ease;
  transition: all 0.4s ease;
}

.card:hover {
  border: 2px solid #039be5;
  -webkit-transition: all 0.4s ease;
  -moz-transition: all 0.4s ease;
  transition: all 0.4s ease;

}

.card__content {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  padding: 15px;
}

.card__image {
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
  overflow: hidden;
  position: relative;
  border:6px solid #ffffff;

}

.card__image::before {
  content: "";
  display: block;
  padding-top: 56.25%;
}

@media (min-width: 40rem) {
  .card__image::before {
    padding-top: 66.6%;
  }
}

.card-title {
  color: #ffffff;
  font-size: 1.3rem;
  font-weight: 600;
  letter-spacing: 2px;
  height: 15px !important;
  text-transform: uppercase;
  margin-top: -120px;
  text-align: center;
  position: relative;
}

.card-type {
  text-transform: capitalize;
  margin-top: 100px;
  flex: 1 1 auto;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 12px;
}

.card-type-icon {
  font-size: 25px;
  position: absolute;
  color: #00a27f;
  margin-top: -2px;
}

.card-type-text {
  margin-left: 35px;
  display: inline-block;
  position: relative;
  font-weight: 600;

}

.card-text {
  flex: 1 1 auto;
  font-size: 0.875rem;
  line-height: 1.5;
  margin-bottom: 15px;
}

.card-price {
  display: inline-block;
  float: right;
  font-weight: 600;
  font-size: 1.1rem;
  margin-top: -4px;
}

.half {
  display: inline-block;
  width: 50%;
  float: left;
  margin: 0;
  padding: 0;
  position: relative;

}

.footer-padding {
  margin: 80px auto;
  display: flex;
  width: 100%;
  flex-basis: content;
}

.background_1 {
  background: #396afc; /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #2948ff, #396afc); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #2948ff, #396afc); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.background_2 {
  background: #e53935; /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #e35d5b, #e53935); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #e35d5b, #e53935); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.background_3 {
  background: #00bf8f; /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #347363, #00bf8f); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #347363, #00bf8f); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.background_4 {
  background: #D38312; /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #A83279, #D38312); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #A83279, #D38312); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.background_5 {
  background: #606c88; /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #3f4c6b, #606c88); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #3f4c6b, #606c88); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.background_6 {
  background: #4776E6; /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #8E54E9, #4776E6); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #8E54E9, #4776E6); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.background_7 {
  background: #ec008c; /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #fc6767, #ec008c); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #fc6767, #ec008c); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.background_8 {
  background: #ffe259; /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #ffa751, #ffe259); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #ffa751, #ffe259); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.background_9 {
  background: #B79891; /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #94716B, #B79891); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #94716B, #B79891); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.background_10 {
  background: #314755; /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #26a0da, #314755); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #26a0da, #314755); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.background_11 {
  background: #16A085; /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #F4D03F, #16A085); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #F4D03F, #16A085); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.background_12 {
  background: #FEAC5E; /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #4BC0C8, #C779D0, #FEAC5E); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #4BC0C8, #C779D0, #FEAC5E); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.background_13 {
  background: #DC2424; /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #4A569D, #DC2424); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #4A569D, #DC2424); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

</style>
