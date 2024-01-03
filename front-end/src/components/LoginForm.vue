<template>
    <div class="flex justify-center items-center min-h-screen">
      <form class="w-80 space-y-4 rounded-lg p-6 form-with-color-animation h-auto" id="user-form" @submit="login($event)">
        <Message :msg="msg" :msgClass="msgClass"/>
        <h2 class="text-white text-2xl font-semibold">Login</h2>
  
        <div class="flex flex-col input-container">
          <label for="email" class="text-white mb-1">Email</label>
          <input id="email" v-model="email" name="email" type="email" class="input" placeholder="Digite seu email" required>
        </div>
  
        <div class="flex flex-col input-container">
          <label for="password" class="text-white mb-1">Senha</label>
          <input id="password" v-model="password" name="password" type="password" class="input" placeholder="Digite sua senha" required>
        </div>
  
        <InputSubmit text="Entrar"/>
      </form>
    </div>
  </template>
  
  <style>
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

<script>
// Importações de componentes
import Message from './Message.vue'; // Componente de mensagem de feedback
import InputSubmit from './InputSubmit.vue'; // Componente de botão de envio

export default {
  name: "LoginForm",
  data() {
    // Estado do componente
    return {
      email: null, // Valor do campo de email
      password: null, // Valor do campo de senha
      msg: null, // Mensagem de feedback exibida ao usuário
      msgClass: null // Classe para estilizar a mensagem de feedback
    }
  },
  components: {
    InputSubmit,
    Message
  },
  methods: {
    async login(e) {
      e.preventDefault(); // Evita o comportamento padrão do formulário

      // Dados do formulário para envio
      const data = {
        email: this.email,
        password: this.password
      }

      const jsonData = JSON.stringify(data); // Converte os dados para JSON

      // Requisição POST para o endpoint de login
      await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json" // Tipo de conteúdo JSON
        },
        body: jsonData // Corpo da requisição contendo os dados do formulário
      })
      .then((resp) => resp.json()) // Converte a resposta para JSON
      .then((data) => {
        let auth = false; // Variável para verificar se a autenticação foi bem-sucedida

        // Verifica se houve erro na resposta do servidor
        if (data.error) {
          this.msg = data.error; // Define a mensagem de erro
          this.msgClass = "error"; // Define a classe para estilizar a mensagem de erro
        } else {
          auth = true; // Define a autenticação como bem-sucedida
          this.msg = data.msg; // Define a mensagem de sucesso
          this.msgClass = "success"; // Define a classe para estilizar a mensagem de sucesso

          // Armazena o token e o ID do usuário autenticado (pode variar conforme a lógica do Vuex ou armazenamento local)
          this.$store.commit("setAuthenticate", {token: data.token, userId: data.userId});
        }

        // Define um tempo de espera para limpar a mensagem ou redirecionar após o login
        setTimeout(() => {
          if (!auth) {
            this.msg = null; // Limpa a mensagem de feedback
          } else {
            this.$router.push("dashboard"); // Redireciona para a página de dashboard após o login
          }
        }, 2000); // Tempo em milissegundos
      })
      .catch((err) => {
        console.log(err); // Trata erros de requisição
      });
    }
  }
}
</script>
  