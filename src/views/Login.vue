<script setup>
import {computed, ref} from "vue";
import {z} from "zod";
import {useStore} from "vuex";
import {email, password} from "../validate_schema/schema";


const store = useStore();

// section  Validate schema
const validateSchema = z.object({
  email,
  password
});

//section Data
const formData = ref({
  email: "",
  password: ""
});

// section Handle submit
const handleSubmit = async () =>
{
  // Reset errors
  store.commit("user/setErrors", {errors: {}});

  store.state.loading = true;
  const validate = await validateSchema.safeParse(formData.value);

  if (validate.success)
  {
    const {email, password} = validate.data;
    await store.dispatch("user/login", {email, password});
  }
  else
  {
    store.commit("user/setErrors", {errors: validate.error.flatten().fieldErrors});
  }
  store.state.loading = false;
};

const errors = computed(() => store.state.user.errors);

</script>

<!-- section Template -->
<template lang="pug">
.register-container.center
  transition(mode='out-in' appear='' enter-active-class='animated animate__fadeInDown faster' leave-active-class='animated animate__fadeOutUp faster')
    .screen

      // section Errors
      transition(appear='' enter-active-class='animated animate__shakeX faster' leave-active-class='animated animate__fadeOut faster')
        .errors.absolute(v-if="store.getters['user/hasError']")
          q-list.text-negative.bg-white(bordered='' separator='')
            q-item(v-for='(error, field) in errors' :key='field' v-ripple='' clickable='')
              q-item-section {{ error[0] }}

      .screen__content
        // Login form
        form.login(@submit.prevent='handleSubmit')
          .login__field
            i.iconify.login__icon(data-icon='fa-solid:user')

            // Username input
            input.login__input(v-model='formData.email' placeholder='Email' type='email')
          .login__field
            i.iconify.login__icon(data-icon='fa-solid:lock')

            // Password input>
            input.login__input(v-model='formData.password' placeholder='Password' type='password')

          // Submit button
          button.button.login__submit.relative-position(:disabled='store.state.loading' type='submit')
            span.button__text Login
            span.button__icon
              i.iconify(data-icon='fa-solid:chevron-right')
            q-inner-loading(v-if='store.state.loading' :showing='store.state.loading' style='border-radius: 26px;')

        .social-login
          h3 log in via
          .social-icons
            i.iconify.social-login__icon(data-icon='fa-brands:google')
            i.iconify.social-login__icon(data-icon='fa-brands:facebook')
            i.iconify.social-login__icon(data-icon='fa-brands:instagram')

      .screen__background
        span.screen__background__shape.screen__background__shape4
        span.screen__background__shape.screen__background__shape3
        span.screen__background__shape.screen__background__shape2
        span.screen__background__shape.screen__background__shape1
</template>

<!-- section Styles -->
<style lang="scss">
</style>
