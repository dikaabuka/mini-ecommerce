/**
 * Format Amount for numbers and float
 */
export default {
  methods: {
    $formatAmount (arg) {
      if (arg) {
        const val = parseFloat(arg).toFixed(2)
        return val.replace(/\d(?=(\d{3})+\.)/g, '$&,')
      } else {
        return 0.00
      }
    }
  }
}
