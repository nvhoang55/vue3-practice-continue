<template>
  <span class="lds-dual-ring"></span>
</template>

<script>
export default {
  name: "Loading"
};
</script>

<style scoped>
.lds-dual-ring {
  display: inline-block;
  width: 32px;
  height: 32px;
}

.lds-dual-ring:after {
  content: " ";
  display: inline-block;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 4px solid #fff;
  border-color: #fff transparent #fff transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}

@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

</style>
