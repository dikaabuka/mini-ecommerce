<template>
  <div class="animated">
    <div
      class="dark-bg dropdownLoader"
    >
      <div class="loading-circle-small"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UiFormLoaderInline'
}
</script>

<style lang="scss" scoped>

.dark-bg {
  background: rgba(0, 0, 0, 0.3);
}

.dropdownLoader {
  display: block;
  border: 1px solid rgba(0, 0, 0, 0.2);
  position: absolute;
  border-radius: 0 !important;
  top: 0;
  left: 0;
  height: 74%;
  width: 100%;
  z-index: 100000 !important;
  padding-top: 7px;
  //-webkit-backdrop-filter: blur(3px);
  //backdrop-filter: blur(3px);
}

.loader-radius {
  border-radius: 20px !important;
}

.loading-circle-small {
  height: 0;
  width: 0;
  padding: 10px;
  border: 4px solid #fff;
  border-right-color: #1bb05d;
  border-radius: 22px;
  -webkit-animation: rotate 1s infinite linear;
  display: block;
  margin: auto;
}

@-webkit-keyframes rotate {
  /* 100% keyframe for  clockwise.
       use 0% instead for anticlockwise */
  100% {
    -webkit-transform: rotate(360deg);
  }
}

.hide-overflow {
  overflow: hidden !important;
}

</style>
