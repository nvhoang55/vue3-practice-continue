<script setup>
import Footer from "./components/layout/Footer.vue";
import Header from "./components/layout/Header.vue";
</script>

<template>
  <q-layout view="hHh lpR fff">

    <Header/>

    <!-- section Main -->
    <q-page-container>
      <router-view/>
    </q-page-container>

    <Footer/>

  </q-layout>
</template>

<style>
@import url('https://fonts.googleapis.com/css?family=Raleway:400,700');
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,400;1,700&display=swap');
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

#app {
  background: linear-gradient(90deg, #C7C5F4, #776BCC);
  min-height: 100vh;
}

.header, .footer {
  background: linear-gradient(90deg, #C7C5F4, #776BCC);
}
</style>
