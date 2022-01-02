<script setup>
import {ref} from "vue";
import {z} from "zod";
import {createUserWithEmailAndPassword, getAuth} from "firebase/auth";

// section  Validate schema
const validateSchema = z.object({
  email: z.string().nonempty("Email is required").max(32).email(),
  password: z.string().nonempty("Password is required").min(8, "Password need to be at least 8 characters and 16 characters max"),
  confirmPassword: z.string()
      .nonempty("Confirm password is required")
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
const loading = ref(false);
const errors = ref({});

// section Handle submit
const handleSubmit = async () =>
{
  // Reset errors
  errors.value = {};

  loading.value = true;
  const validate = await validateSchema.safeParse(formData.value);

  if (validate.success)
  {
    const auth = getAuth();
    await createUserWithEmailAndPassword(auth, validate.data.email, validate.data.password)
        .then((userCredential) =>
        {
          // Signed in
          const user = userCredential.user;
          console.log("user", user);
        })
        .catch((error) =>
        {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("errorCode", errorCode);
        });
  } else
  {
    errors.value = validate.error.flatten().fieldErrors;
    console.log("errors.value", errors.value);
  }
  loading.value = false;
};

</script>

<!-- section Template -->
<template>
  <transition
      appear
      enter-active-class="animated animate__fadeInRight faster"
      leave-active-class="animated animate__fadeInRight faster"
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

            <div class="login__field">
              <i class="iconify login__icon" data-icon="fa-solid:lock"/>

              <!--Confirm password input>-->
              <input v-model="formData.confirmPassword" class="login__input" placeholder="Confirm password"
                     type="password">

            </div>

            <!--Submit button-->
            <button :disabled="loading" class="button login__submit relative" type="submit">
              <span class="button__text">Register</span>
              <q-inner-loading
                  v-if="loading"
                  :showing="loading"
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
.register-container {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Raleway, sans-serif;
}

.screen {
  background: linear-gradient(90deg, #5D54A4, #7C78B8);
  position: relative;
  height: 600px;
  width: 360px;
  box-shadow: 0px 0px 24px #5C5696;

  .errors {
    left: -100%;
    max-width: 300px;
    min-width: 300px;
  }
}

.screen__content {
  z-index: 1;
  position: relative;
  height: 100%;
}

.screen__background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  -webkit-clip-path: inset(0 0 0 0);
  clip-path: inset(0 0 0 0);
}

.screen__background__shape {
  transform: rotate(45deg);
  position: absolute;
}

.screen__background__shape1 {
  height: 520px;
  width: 520px;
  background: #FFF;
  top: -50px;
  right: 120px;
  border-radius: 0 72px 0 0;
}

.screen__background__shape2 {
  height: 220px;
  width: 220px;
  background: #6C63AC;
  top: -172px;
  right: 0;
  border-radius: 32px;
}

.screen__background__shape3 {
  height: 540px;
  width: 190px;
  background: linear-gradient(270deg, #5D54A4, #6A679E);
  top: -24px;
  right: 0;
  border-radius: 32px;
}

.screen__background__shape4 {
  height: 400px;
  width: 200px;
  background: #7E7BB9;
  top: 420px;
  right: 50px;
  border-radius: 60px;
}

.login {
  width: 320px;
  padding: 100px 30px 30px;
}

.login__field {
  padding: 20px 0px;
  position: relative;
}

.login__icon {
  position: absolute;
  top: 30px;
  color: #7875B5;
}

.login__input {
  border: none;
  border-bottom: 2px solid #D1D1D4;
  background: none;
  padding: 10px;
  padding-left: 24px;
  font-weight: 700;
  width: 75%;
  transition: .2s;

  &:active {
    outline: none;
    border-bottom-color: #6A679E;
  }

  &:focus {
    outline: none;
    border-bottom-color: #6A679E;
  }

  &:hover {
    outline: none;
    border-bottom-color: #6A679E;
  }
}

.login__submit {
  background: #fff;
  font-size: 14px;
  margin-top: 30px;
  padding: 16px 20px;
  border-radius: 26px;
  border: 1px solid #D4D3E8;
  text-transform: uppercase;
  font-weight: 700;
  display: flex;
  align-items: center;
  width: 100%;
  color: #4C489D;
  box-shadow: 0px 2px 2px #5C5696;
  cursor: pointer;
  transition: .2s;

  &:disabled {
    background: #dbdbdb;

    &:hover {
      outline: none;
      border: 1px solid #D4D3E8;
    }
  }

  &:active {
    border-color: #6A679E;
    outline: none;
  }

  &:focus {
    border-color: #6A679E;
    outline: none;
  }

  &:hover {
    border-color: #6A679E;
    outline: none;
  }
}

.button__icon {
  font-size: 24px;
  margin-left: auto;
  color: #7875B5;
}

.social-login {
  position: absolute;
  height: 140px;
  width: 160px;
  text-align: center;
  bottom: 0px;
  right: 0px;
  color: #fff;

  h3 {
    font-size: 1.5rem;
  }
}

.social-icons {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.social-login__icon {
  margin: 8px 10px;
  color: #fff;
  text-decoration: none;
  text-shadow: 0px 0px 8px #7875B5;

  &:hover {
    transform: scale(1.5);
  }
}

</style>
