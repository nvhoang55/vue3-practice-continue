<script setup>
const name = "Home";
</script>

<template lang="pug">
q-page(padding)
  .container.mx-auto
    transition(appear='' enter-active-class='animated animate__fadeIn faster' leave-active-class='animated animate__fadeOut faster')
      q-card.w-full.max-w-xs
        q-card-section
        | Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
        | et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
        | aliquip ex ea commodo consequat.


</template>

<style scoped>

</style>
