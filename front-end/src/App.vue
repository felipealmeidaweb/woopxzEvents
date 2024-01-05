<template>
  <div class="flex flex-col min-h-screen">
    <Navbar />
    <div class="background flex-1 py-8 overflow-hidden">
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from "../src/components/Navbar.vue"
import Footer from "../src/components/Footer.vue"

export default {
  name: "App",
  components: {
    Navbar,
    Footer
  }
}
</script>

<style scoped>
.background {
  background-image: linear-gradient(to right, #3B3C40, #0A0B0D, #BFBFBF);
  animation: gradientAnimation 15s ease infinite;
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
