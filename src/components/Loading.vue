<template>

  <loading :active="isLoading"
           :can-cancel="false"
           :is-full-page="true"
           :height="255"
           :width="255"
           color="#ffc72c"
           :loader="spinner"
           background-color="#000000">
  </loading>

</template>

<script>

    import Loading from "vue-loading-overlay";
    import 'vue-loading-overlay/dist/css/index.css';

    export default {
      name: "LoadingComponent",
      components: {
        Loading
      },
      props: {
        isLoading: Boolean
      },

      setup() {

      },

}

</script>


<style scoped>

</style>

