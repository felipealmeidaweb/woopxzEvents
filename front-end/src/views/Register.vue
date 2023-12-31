<template>
  <div class="flex justify-center items-center mt-8">
    <form class="w-80 space-y-4 rounded-lg p-6 form-with-color-animation">
      <h2 class="text-white text-2xl font-semibold">Cadastro</h2>
      <div class="flex flex-col">
        <label for="name" class="text-white mb-1">Nome</label>
        <input id="name" type="text" class="input" placeholder="Digite seu nome" required>
      </div>
      <div class="flex flex-col">
        <label for="email" class="text-white mb-1">Email</label>
        <input id="email" type="email" class="input" placeholder="Digite seu email" required>
      </div>
      <div class="flex flex-col">
        <label for="password" class="text-white mb-1">Senha</label>
        <input id="password" type="password" class="input" placeholder="Digite sua senha" required>
      </div>
      <div class="flex flex-col">
        <label for="confirm-password" class="text-white mb-1">Confirmar Senha</label>
        <input id="confirm-password" type="password" class="input" placeholder="Confirme sua senha" required>
      </div>
      <button class="bg-Trippant-1-hex text-white rounded-lg py-2 px-4 hover:bg-opacity-80 transition duration-300">
        Cadastrar
      </button>
    </form>
  </div>
</template>

<style scoped>
/* Cores da paleta */
.Trippant-1-hex { color: #3B3C40; }
.Trippant-2-hex { color: #0A0B0D; }
.Trippant-3-hex { color: #73221A; }
.Trippant-4-hex { color: #F23535; }
.Trippant-5-hex { color: #BFBFBF; }

/* Estilos dos inputs e rótulos */
.input {
  border: 1px solid #BFBFBF;
  padding: 0.5rem;
  width: 100%;
  border-radius: 0.25rem;
  transition: border-color 0.3s ease;
  color: #FFFFFF;
  background-color: #0A0B0D;
}

.input:focus {
  outline: none;
  border-color: #73221A;
}

/* Keyframes para animar a mudança de cores */
@keyframes changeColors {
  0% {
    background-color: #0A0B0D; /* Cor inicial */
  }
  50% {
    background-color: #3B3C40; /* Cor intermediária */
  }
  100% {
    background-color: #0A0B0D; /* Cor final, mesma que a inicial para um loop suave */
  }
}

/* Estilos do formulário com a animação de mudança de cores */
.form-with-color-animation {
  animation: changeColors 5s linear infinite;
 
}
</style>
