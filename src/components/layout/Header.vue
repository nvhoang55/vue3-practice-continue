<script setup>
import {useStore} from "vuex";
import {useRouter} from "vue-router";

const store = useStore();
const router = useRouter();
const logout = async () =>
{
  await store.dispatch("user/logout")
      .then(() =>
      {
        router.replace({name: "Home"});
      });
};
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

      <transition-group
          appear
          enter-active-class="animated animate__fadeIn faster"
      >
        <!--Logout-->
        <q-btn v-if="store.state.user.isLogin" flat icon="logout" label="Logout" rounded @click="logout"/>
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
      </transition-group>

    </q-toolbar>
  </q-header>
</template>


<style scoped>
</style>
