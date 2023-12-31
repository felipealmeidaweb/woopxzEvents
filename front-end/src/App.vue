<template>
  <div class="background">
    <Navbar/>
    <div class="container">
      <router-view />
    </div>
    <Footer/>
  </div>
</template>

<script>
import Navbar from "../src/components/Navbar.vue"
import Footer from "../src/components/Footer.vue"

export default{
  name: "App",
  components: {
    Navbar,
    Footer
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.background {
  min-height: 100vh;
  background: linear-gradient(to right, #3B3C40, #0A0B0D, #BFBFBF);
  background-size: 400% 400%;
  animation: gradientAnimation 15s ease infinite;
}

.container {
  height: 83vh;
}

@keyframes gradientAnimation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
