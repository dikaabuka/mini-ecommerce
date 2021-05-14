<template>
  <div class="ui-input-text component">
    <div class="slot-before" v-if="$slots.before" :style="inputHeight">
      <slot name="before"></slot>
    </div>

    <div class="input-wrapper">
      <label
        :class="{ 'is-label-error': error }"
        :for="labelId">{{ label }}
      </label>

      <input
        :id="labelId"
        :type="inputType"
        :style="inputHeight"
        :class="inputClasses"
        :value="value"
        :maxlength="maxLength"
        :placeholder="placeholder"
        v-on="listeners">

      <div class="slot-bottom" v-if="$slots.bottom">
        <slot name="bottom"/>
      </div>
    </div>

    <div :class="afterPadding ? 'no-padding' : ''" class="slot-after" v-if="$slots.after" :style="inputHeight">
      <slot name="after"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UiInputText',

  props: {
    label: { type: String },
    type: {
      type: String,
      default: 'text'
    },
    height: {
      type: String,
      default: '44px'
    },
    password: {
      type: Boolean,
      default: false
    },
    afterPadding: {
      type: Boolean,
      default: false
    },
    value: { required: true },
    placeholder: { type: String },
    maxLength: {
      type: String,
      default: '11'
    },
    error: {
      type: [String, Boolean],
      default: false
    }
  },

  methods: {
    getRandomInt () {
      const min = 1
      const max = 1000000000
      return Math.floor(Math.random() * (max - min + 1) + min)
    }
  },

  computed: {
    inputHeight () {
      return `height: ${this.height};`
    },
    inputClasses () {
      return {
        'is-input-error': this.error,
        'border-radius-start': !this.$slots.before,
        'border-radius-end': !this.$slots.after
      }
    },
    labelId () {
      return `inputId${this.getRandomInt()}`
    },
    inputType () {
      let type
      this.type === 'number' ? type = 'number'
        : this.password ? type = 'password' : type = 'text'
      return type
    },
    listeners () {
      return {
        ...this.$listeners,
        input: event => this.$emit('input', event.target.value)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$color-gray: rgba(0, 0, 0, 0.1);
$radius: 5px;
$padding: 0;
.no-padding {
  padding: 0 !important;
}

.ui-input-text.component {
  margin-bottom: 16px;
  display: flex;
  align-items: center;

  .input-wrapper {
    width: 100%;
  }

  .slot-bottom {
    padding-top: $padding;
    font-size: 13px;
    color: $color-gray;
    position: absolute;
  }

  .slot-after, .slot-before {
    color: $color-gray;
    padding: 0 15px;
    display: flex;
    align-items: center;
    z-index: 0;
  }

  .slot-before {
    border: 1px solid $color-gray;
    border-right: 0;
    border-top-left-radius: $radius;
    border-bottom-left-radius: $radius;
  }

  .slot-after {
    border: 1px solid $color-gray;
    border-left: 0;
    border-top-right-radius: $radius;
    border-bottom-right-radius: $radius;
  }

  label {
    cursor: pointer;
    display: block;
    color: $color-gray;
    font-size: 13px;
    padding-bottom: $padding;
  }

  input {
    width: 100%;
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.05);
    background-color: transparent;
    border: 1px solid $color-gray;
    font-size: 14px;
    padding: 15px 12px;
    outline: none;

    &:focus {
      border: 1px solid #1e2221;
    }

    &.border-radius-start {
      border-top-left-radius: $radius;
      border-bottom-left-radius: $radius;
    }

    &.border-radius-end {
      border-top-right-radius: $radius;
      border-bottom-right-radius: $radius;
    }
  }

  input:focus {
    -webkit-box-shadow: inset 0px 0px 4px 2px rgba(0, 0, 0, 0.02);
    -moz-box-shadow: inset 0px 0px 4px 2px rgba(0, 0, 0, 0.02);
    box-shadow: inset 0px 0px 4px 2px rgba(0, 0, 0, 0.02);
    border: 2px solid #1bb05d;
    -webkit-transition: all 0.4s ease;
    -moz-transition: all 0.4s ease;
    transition: all 0.4s ease;
  }

  .is-input-error {
    border: 2px solid crimson;
  }

  .is-label-error {
    color: crimson;
  }
}
</style>
