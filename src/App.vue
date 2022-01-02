<script setup></script>

<template>
  <q-layout view="hHh lpR fff">

    <!-- section Header-->
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
        <router-link :to="{name: 'Login'}">
          <q-btn flat icon="login" label="Login" rounded/>
        </router-link>
        <router-link :to="{name: 'Register'}">
          <q-btn flat icon="feed" label="Register" rounded/>
        </router-link>
      </q-toolbar>
    </q-header>

      <!-- section Main -->
      <q-page-container>
        <router-view/>
      </q-page-container>

    <!-- section Footer -->
    <q-footer class="footer text-dark text-center" elevated>
      <q-toolbar>
        <q-toolbar-title>
          <div class="text-base">Demo VueJS @Hoang</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

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
