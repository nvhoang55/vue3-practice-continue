<script setup>
import {useStore} from "vuex";
import {useRouter} from "vue-router";

const store = useStore();
const router = useRouter();
const logout = async () =>
{
  await store.dispatch("user/logout");
};
</script>

<template lang="pug">
q-header.text-white.header(elevated='')
  q-toolbar

    // Home
    q-toolbar-title
      router-link(:to="{name: 'Home'}")
        q-avatar
          img(src='https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg')
        |         Back to Home

    div(v-if='store.state.user.isAuthReady')
      transition(mode='out-in' appear='' enter-active-class='animated animate__fadeIn faster' leave-active-class='animated animate__fadeOut faster')
        div(v-if='store.state.user.isLogin')
          // Update profile
          router-link(:to="{name: 'UpdateProfile'}")
            q-btn(flat='' icon='edit' label='Edit profile' rounded='')
          // Logout
          q-btn(flat='' icon='logout' label='Logout' rounded='' @click='logout')
        div(v-else='')
          // Login
          router-link(:to="{name: 'Login'}")
            q-btn(flat='' icon='login' label='Login' rounded='')
          // Register
          router-link(:to="{name: 'Register'}")
            q-btn(flat='' icon='feed' label='Register' rounded='')

</template>


<style scoped>
</style>
