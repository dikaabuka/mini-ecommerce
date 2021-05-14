export default {
  computed: {
    $currentUser () {
      return this.$store.state.userModule.currentUser
    }
  }
}
