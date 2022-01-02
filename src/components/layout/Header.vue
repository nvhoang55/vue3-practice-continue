<script setup>
import {useStore} from "vuex";

const store = useStore();
</script>

<template>
  <q-header class="text-white header" elevated>
    <q-toolbar>
      <q-toolbar-title>
        <router-link :to="{name: 'Home'}">

          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          Back to Home
        </router-link>
      </q-toolbar-title>

      <!--Logout-->
      <router-link v-if="store.state.user.isLogin" :to="{name: 'Logout'}">
        <q-btn flat icon="logout" label="Logout" rounded/>
      </router-link>
      <div v-else>
        <!--Login-->
        <router-link :to="{name: 'Login'}">
          <q-btn flat icon="login" label="Login" rounded/>
        </router-link>

        <!--Register-->
        <router-link :to="{name: 'Register'}">
          <q-btn flat icon="feed" label="Register" rounded/>
        </router-link>
      </div>

    </q-toolbar>
  </q-header>
</template>


<style scoped>
</style>
