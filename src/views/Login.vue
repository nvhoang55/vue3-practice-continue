<script setup>
import {computed, ref} from "vue";
import {z} from "zod";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {email, password} from "../validate_schema/schema";

const store = useStore();
const router = useRouter();

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
  store.state.loading = true;
  const validate = await validateSchema.safeParse(formData.value);

  if (validate.success)
  {
    const {email, password} = validate.data;
    await store.dispatch("user/login", {email, password})
        .then(() =>
        {
          router.replace({name: "Home"});
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
<template>
  <transition
      appear
      enter-active-class="animated animate__fadeInLeft faster"
      leave-active-class="animated animate__fadeOutLeft faster"
  >
    <div class="register-container mt-18">
      <div class="screen">

        <!-- section Errors -->
        <transition
            appear
            enter-active-class="animated animate__shakeX faster"
            leave-active-class="animated animate__fadeOut faster"
        >
          <div v-if="Object.keys(errors).length !== 0" class="errors absolute">
            <q-list bordered class="text-negative bg-white" separator>
              <q-item v-for="(error, field) in errors" :key="field" v-ripple clickable>
                <q-item-section>{{ error[0] }}</q-item-section>
              </q-item>
            </q-list>
          </div>
        </transition>

        <div class="screen__content">

          <!--Login form-->
          <form class="login" @submit.prevent="handleSubmit">
            <div class="login__field">
              <i class="iconify login__icon" data-icon="fa-solid:user"/>

              <!--Username input-->
              <input v-model="formData.email" class="login__input" placeholder="Email" type="email">

            </div>
            <div class="login__field">
              <i class="iconify login__icon" data-icon="fa-solid:lock"/>

              <!--Password input>-->
              <input v-model="formData.password" class="login__input" placeholder="Password" type="password">

            </div>

            <!--Submit button-->
            <button :disabled="store.state.loading" class="button login__submit relative" type="submit">
              <span class="button__text">Login</span>
              <q-inner-loading
                  v-if="store.state.loading"
                  :showing="store.state.loading"
                  style="border-radius: 26px;"
              />
              <span class="button__icon">
                <i class="iconify" data-icon="fa-solid:chevron-right"/>
              </span>
            </button>

          </form>

          <div class="social-login">
            <h3>log in via</h3>
            <div class="social-icons">
              <i class="iconify social-login__icon" data-icon="fa-brands:google"/>
              <i class="iconify social-login__icon" data-icon="fa-brands:facebook"/>
              <i class="iconify social-login__icon" data-icon="fa-brands:instagram"/>
            </div>
          </div>
        </div>
        <div class="screen__background">
          <span class="screen__background__shape screen__background__shape4"></span>
          <span class="screen__background__shape screen__background__shape3"></span>
          <span class="screen__background__shape screen__background__shape2"></span>
          <span class="screen__background__shape screen__background__shape1"></span>
        </div>
      </div>
    </div>
  </transition>
</template>

<!-- section Styles -->
<style lang="scss">
</style>
