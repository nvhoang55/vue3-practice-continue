<script setup>

const name = "Login";
</script>

<template>
  <div class="register-container mt-18">
    <div class="screen">
      <div class="screen__content">
        <form class="login">
          <div class="login__field">
            <i class="iconify login__icon" data-icon="fa-solid:user"/>
            <input type="text" class="login__input" placeholder="User name / Email">
          </div>
          <div class="login__field">
            <i class="iconify login__icon" data-icon="fa-solid:lock"/>
            <input type="password" class="login__input" placeholder="Password">
          </div>
          <button class="button login__submit">
            <span class="button__text">Log In Now</span>
            <!--<i class="button__icon fas fa-chevron-right"></i>-->
            <i class="iconify button__icon" data-icon="fa-solid:chevron-right"/>
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
</template>


<style scoped>

</style>
