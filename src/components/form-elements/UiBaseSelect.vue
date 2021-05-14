<template>
  <form autocomplete="off">
    <div class="dropdown" v-if="options">
      <form autocomplete="off">
        <!-- Dropdown Input -->
        <input
          :autocomplete="randomId()"
          :defaultSelection="defaultSelection"
          :disabled="disabled"
          :class="error"
          :placeholder="placeholder"
          :name="name"
          @blur="exit()"
          @focus="showOptions()"
          @keyup="keyMonitor"
          class="dropdown-input"
          v-model="searchFilter"
        />
      </form>

      <!-- Dropdown Menu -->
      <div class="dropdown-content" v-show="optionsShown">
        <div
          :key="index"
          @mousedown="selectOption(option)"
          class="dropdown-item"
          v-for="(option, index) in filteredOptions"
        >
          {{ option.label || option.id || '-' }}
        </div>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: 'UiBaseSelect',
  template: 'UiBaseSelect',
  props: {
    name: {
      type: String,
      required: false,
      default: 'dropdown',
      note: 'Input name'
    },
    options: {
      type: Array,
      required: true,
      default: () => [],
      note: 'Options of dropdown. An array of options with id and name'
    },
    defaultSelection: {
      type: Object,
      required: true,
      default: () => {},
      note: 'Default Selection'
    },
    placeholder: {
      type: String,
      required: false,
      default: 'select an option',
      note: 'Placeholder of dropdown'
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
      note: 'Disable the dropdown'
    },
    maxItem: {
      type: Number,
      required: false,
      default: 6,
      note: 'Max items showing'
    },
    error: {
      type: Object,
      required: true,
      default: () => {},
      note: 'Default Selection'
    }
  },
  data () {
    return {
      selected: {},
      optionsShown: false,
      searchFilter: ''
    }
  },
  mounted () {
    if (this.defaultSelection.id && this.defaultSelection.label) {
      this.selected = this.defaultSelection
      this.optionsShown = false
      this.searchFilter = this.selected.label
    } else {
      this.selected = { id: '', label: '' }
    }
    this.$emit('filter', this.searchFilter)
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
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(
        c
      ) {
        let r = (Math.random() * 16) | 0,
          v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
        /* eslint-enable */
      })
    },
    selectOption (option) {
      this.selected = option
      this.optionsShown = false
      this.searchFilter = this.selected.label
      this.$emit('selected', this.selected)
    },
    showOptions () {
      if (!this.disabled) {
        const target = document.querySelector('.slot-after')
        if (target) { target.style.zIndex = '1' }
        this.searchFilter = ''
        this.optionsShown = true
      }
    },
    exit () {
      const target = document.querySelector('.slot-after')
      if (target) { target.style.zIndex = '0' }
      if (!this.selected.id) {
        this.selected = { id: '', label: '' }
        this.searchFilter = ''
      } else {
        this.searchFilter = this.selected.label
      }
      this.$emit('selected', this.selected)
      this.optionsShown = false
    },
    // Selecting when pressing Enter
    keyMonitor: function (event) {
      if (event.key === 'Enter' && this.filteredOptions[0]) {
        this.selectOption(this.filteredOptions[0])
      }
    }
  },
  watch: {
    searchFilter () {
      if (this.filteredOptions.length === 0) {
        this.selected = {
          id: '',
          label: ''
        }
      } else {
        this.selected = this.filteredOptions[0]
      }
      this.$emit('filter', this.searchFilter)
    },
    defaultSelection: {
      deep: true,
      handler (update) {
        if (update) {
          this.selected = update
          if (this.defaultSelection.id && this.defaultSelection.label) {
            this.selected = this.defaultSelection
            this.optionsShown = false
            this.searchFilter = this.selected.label
          } else {
            this.selected = { id: '', label: '' }
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dropdown {
  position: relative;
  display: block;
  margin: auto;
  z-index: 70;

  .dropdown-input {
    border-radius: 4px;
    padding: 0 20px 0 15px ;
    height: 42px;
    border:none;
    box-shadow: 0 6px 8px rgba(0,0,0,0.05);
    &:hover{
      background: transparent !important;
      border:none;
    }
    &:focus{
      -webkit-box-shadow: inset 0px 0px 4px 2px rgba(0, 0, 0, 0.02);
      -moz-box-shadow: inset 0px 0px 4px 2px rgba(0, 0, 0, 0.02);
      box-shadow: inset 0px 0px 4px 2px rgba(0, 0, 0, 0.02);
      border: 2px solid #1bb05d;
      -webkit-transition: all 0.4s ease;
      -moz-transition: all 0.4s ease;
      transition: all 0.4s ease;
      outline-width: 0;
      outline-style: none;
    }
  }

  .dropdown-content {
    position: absolute;
    background-color: #fff !important;
    font-size: 16px !important;
    margin-top: 0;
    margin-left: 0;
    width: 99% !important;
    max-height: 250px;
    max-width: 100% !important;
    text-align: left !important;
    border: none !important;
    box-shadow: 0px -8px 34px 0px rgba(0, 0, 0, 0.05);
    overflow-y: auto;
    z-index: 71;

    .dropdown-item {
      color: black;
      font-size: 0.8em;
      text-align: left !important;
      line-height: 1em;
      padding: 8px 15px;
      text-decoration: none;
      display: block;
      cursor: pointer;

      &:hover {
        background-color: #e7ecf5;
        cursor: pointer;
      }
    }
  }

  .dropdown:hover .dropdowncontent {
    display: block;
    z-index: 72;
  }
}

.dropdown::after {
  content: '';
  width: 0;
  height: 0;
  border: 6px solid transparent;
  border-color: #00a27f transparent transparent transparent;
  position: absolute;
  top: 19px;
  right: 10px;
  visibility: visible;
}

.dropdown:hover {
  cursor: pointer;
}

.dropdown:active,
.dropdown.active {
  background-color: #fff;
}
.dropdown:focus:after,
.dropdown.focus:after,
.dropdown:active:after,
.dropdown.active:after, {
  top: 9px;
  border-color: transparent transparent #00a27f transparent;
}

.dropdown:active:after,
.dropdown.active:after {
  top: 9px;
  border-color: transparent transparent #00a27f transparent;
}
</style>
