<script setup>

</script>

<template>
  <va-navbar class="fixed top-0 navbar">
    <template #left>
      <va-navbar-item>
        <router-link :to="{name: 'Home'}">
          <va-icon
              name="home"
              size="50px"
              color="#5F57A3"
          />
        </router-link>
      </va-navbar-item>
    </template>
    <template #center>
      <va-navbar-item>
      </va-navbar-item>

    </template>
    <template #right>

      <!--Register-->
      <va-navbar-item>
        <va-button icon="article" color="background" flat>
          <router-link :to="{name: 'Register'}">Register</router-link>
        </va-button>
      </va-navbar-item>

      <!--Login-->
      <va-navbar-item>
        <va-button icon="login" flat color="background">
          <router-link :to="{name: 'Login'}">Login</router-link>
        </va-button>
      </va-navbar-item>

    </template>
  </va-navbar>
</template>


<style scoped>
.navbar {
  background: linear-gradient(90deg, #C7C5F4, #776BCC);
}
</style>
