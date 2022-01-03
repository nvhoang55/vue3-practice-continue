<script setup>
import Footer from "./components/layout/Footer.vue";
import Header from "./components/layout/Header.vue";
import {useStore} from "vuex";

// Authenticate user on page reload
const store = useStore();
store.dispatch("user/checkAuthState");

</script>

<template lang="pug">
q-layout(view='hHh lpR fff')
  Header

  q-page-container
    q-page(padding)
      router-view

  Footer
</template>

<style lang="scss">
@import "assets/styles/styles";
</style>
