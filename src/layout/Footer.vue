<template>
  <div class="footer">
    <div class="wrapper">
      <span class="bold-text">© RS2.com </span> 1988 - {{ currentYear }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {
      currentYear: new Date().getFullYear()
    }
  }
}
</script>

<style lang="scss" scoped>
.footer {
  position: fixed;
  bottom:0;
  left: 0;
  width: 100%;
  max-height: 54px !important;
  color: #061a2c;
  font-size:14px;
  text-align: center;
  background-color: white;
  border-top: 1px solid rgba(0,0,0,0.12);
  padding: 20px 0;
  margin-top: auto;
  flex: 1;
  z-index: 0;

  .wrapper{
    .bold-text{
      font-weight: 600;
    }
  }
}
</style>
