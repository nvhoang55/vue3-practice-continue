<script setup>

import {ref} from "vue";

const userInfo = ref({
  avatarURL: "",
  displayName: "",
  mail: "",
  phoneNumber: ""
});

</script>

<template lang="pug">
.container.mx-auto
  transition(appear='' enter-active-class='animated animate__fadeIn faster' leave-active-class='animated animate__fadeOut faster')
    q-card.w-full.max-w-xs.mx-auto
      q-card-section.bg-purple-5.text-white
        .text-h6
          q-icon.mr-3(name='fas fa-user')
          | Update user information
      q-separator
      q-card-section

        // Avatar
        q-input(bottom-slots=''
          v-model='userInfo.avatarURL'
          label='Avatar URL'
          :hint="userInfo.avatarURL ? 'Current avatar' : ''"
        )
          template(v-slot:append='')
            q-icon.cursor-pointer(name='close' @click="userInfo.avatarURL = ''")

        // Name
        q-input(bottom-slots=''
          v-model='userInfo.displayName'
          label='Name'
          :hint="userInfo.displayName ? 'Current name' : ''"
        )
          template(v-slot:append='')
            q-icon.cursor-pointer(name='close' @click="userInfo.displayName = ''")

        // Phone number
        q-input(bottom-slots=''
          v-model='userInfo.phoneNumber'
          label='Phone Number'
          :hint="userInfo.phoneNumber ? 'Current phone number' : ''"
        )
          template(v-slot:append='')
            q-icon.cursor-pointer(name='close' @click="userInfo.phoneNumber = ''")

        // Email
        q-input(bottom-slots=''
          readonly
          v-model='userInfo.mail'
          label='Email'
          :hint="userInfo.mail ? 'Current mail' : ''"
        )

</template>

<style scoped>

</style>
