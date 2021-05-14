/**
 * Confirm Type in JavaScript to help handle side effects
 */
export default {
  methods: {
    $typeChecker (arg) {
      if (arg) {
        return Object.prototype.toString.call(arg).slice(8, -1).toLowerCase()
      } else {
        throw new Error('Argument not supplied.')
      }
    }
  }
}
