<template>
  <nav class="navbar">
    <router-link to="/">
      <img
        src="../../public/img/woopxz-party-high-resolution-logo-transparent.png"
        alt="logo"
        class="w-28 h-auto p-2"
      >
    </router-link>

    <h2 class="text-Trippant-5-hex text-lg font-bold tracking-wider uppercase">
      Woopxz Party
    </h2>

    <div class="flex items-center space-x-4 me-4">
      <router-link
        to="/"
        class="text-Trippant-5-hex hover:text-Trippant-4-hex transition duration-300"
      >
        Home
      </router-link>
      <router-link
        to="/about"
        class="text-Trippant-5-hex hover:text-Trippant-4-hex transition duration-300"
      >
        Entrar
      </router-link>
      <router-link
        to="/register"
        class="text-Trippant-5-hex hover:text-Trippant-4-hex transition duration-300"
      >
        Cadastrar
      </router-link>
    </div>
  </nav>
</template>

<style>
/* Cores da paleta */
.Trippant-1-hex { color: #3B3C40; }
.Trippant-2-hex { color: #0A0B0D; }
.Trippant-3-hex { color: #73221A; }
.Trippant-4-hex { color: #F23535; }
.Trippant-5-hex { color: #BFBFBF; }

/* Estilos da Navbar */
.navbar {
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #0A0B0D; /* Cor de fundo inicial */
  color: #BFBFBF; /* Cor de texto inicial */
  transition: background-color 0.5s ease, color 0.5s ease; /* Transição suave */
  animation: changeColors 5s ease infinite alternate; /* Animação */
}

/* Animação da Navbar */
@keyframes changeColors {
  0% {
    background-color: #0A0B0D;
    color: #BFBFBF;
  }
  100% {
    background-color: #3B3C40;
    color: #F23535;
  }
}
</style>
