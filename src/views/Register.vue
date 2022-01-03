<script setup>
import {computed, ref} from "vue";
import {z} from "zod";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {email, password} from "../validate_schema/schema";
import {useQuasar} from "Quasar";

const store = useStore();
const router = useRouter();
const quasar = useQuasar();

// section  Validate schema
const validateSchema = z.object({
  email,
  password,
  confirmPassword: z.string().nonempty("Confirm password is required")
}).refine((data) => data.password === data.confirmPassword, {
  message: "Confirm password does not match password",
  path: ["confirmPassword"]
});

//section Data
const formData = ref({
  email: "",
  password: "",
  confirmPassword: ""
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

    await store.dispatch("user/register", {email, password})
        .then(() =>
        {
          router.replace({name: "Home"});
          quasar.notify({
            message: `Welcome new user, ${store.state.user.user.email}`,
            position: "top",
            class: "text-lg"
          });
        });
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
  transition(appear='' enter-active-class='animated animate__fadeInDown faster' leave-active-class='animated animate__fadeOutUp faster')
    .screen
      transition(appear='' enter-active-class='animated animate__shakeX faster' leave-active-class='animated animate__fadeOut faster')
        .errors.absolute(v-if="store.getters['user/hasError']")
          q-list.text-negative.bg-white(bordered='' separator='')
            q-item(v-for='(error, field) in errors' :key='field' v-ripple='' clickable='')
              q-item-section {{ error[0] }}

      .screen__content
        form.login(@submit.prevent='handleSubmit')

          // Emal
          .login__field
            i.iconify.login__icon(data-icon='fa-solid:user')
            input.login__input(v-model='formData.email' placeholder='Email' type='email')

          // Password
          .login__field
            i.iconify.login__icon(data-icon='fa-solid:lock')
            input.login__input(v-model='formData.password' placeholder='Password' type='password')

          // Confirm Password
          .login__field
            i.iconify.login__icon(data-icon='fa-solid:lock')
            input.login__input(v-model='formData.confirmPassword' placeholder='Confirm password' type='password')

          // Submit button
          button.button.login__submit.relative(:disabled='store.state.loading' type='submit')
            span.button__text Register
            q-inner-loading(v-if='store.state.loading' :showing='store.state.loading' style='border-radius: 26px;')
              span.button__icon
                i.iconify(data-icon='fa-solid:chevron-right')

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
