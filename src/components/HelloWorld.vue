<script setup>
import { ref } from 'vue'

defineProps({
  msg: String
})

const count = ref(0)

const increase = () =>
{
  count.value++;
}
</script>

<template>
  <h1>{{ msg }}</h1>

</template>

<style scoped lang="scss">
a {
  color: #42b983;
}
</style>
