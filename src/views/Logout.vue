<script setup>
import {getAuth, signOut} from "firebase/auth";
import {useStore} from "vuex";
import {useRouter} from "vue-router";

const store = useStore();
const auth = getAuth();
const router = useRouter();

signOut(auth).then(() =>
{
  // Sign-out successful.
  store.commit("user/logout");
  router.replace({name: "Home"});
}).catch((error) =>
{
  // An error happened.
});
</script>

<template>

</template>
