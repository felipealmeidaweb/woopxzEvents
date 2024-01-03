<template>
    <div class="flex justify-center items-center mt-8">
        
      <form class="w-80 space-y-4 rounded-lg p-6 form-with-color-animation" id="user-form" @submit="handleSubmit">
        <Message :msg="msg" :msgClass="msgClass"/>
        <h2 class="text-white text-2xl font-semibold" :title="title">{{ title }}</h2>

        <input type="hidden" v-model="id" name="id" id="id">

        <div class="flex flex-col input-container">
          <label for="name" class="text-white mb-1">Nome</label>
          <input id="name" v-model="name" name="name" type="text" class="input" placeholder="Digite seu nome" required>
        </div>



        <div class="flex flex-col input-container">
          <label for="email" class="text-white mb-1">Email</label>
          <input id="email" v-model="email" name="email" type="email" class="input" placeholder="Digite seu email" required>
        </div>



        <div class="flex flex-col input-container">
          <label for="password" class="text-white mb-1">Senha</label>
          <input id="password" v-model="password" name="password" type="password" class="input" placeholder="Digite sua senha">
        </div>


        <div class="flex flex-col input-container">
          <label for="confirPassword" class="text-white mb-1">Confirmar Senha</label>
          <input id="confirmPassword" v-model="confirmPassword" name="confirmPassword" type="password" class="input" placeholder="Confirme sua senha">
        </div>
        <InputSubmit :text="btnText"/>
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

<script>
// Importação dos componentes Vue
import Message from './Message.vue';
import InputSubmit from './InputSubmit.vue';

export default {
  // Definição do componente RegisterForm
  name: "RegisterForm",
  data() {
    return {
      // Inicialização dos dados do formulário
      id: this.user._id || null,
      name: this.user.name || null,
      email: this.user.email || null,
      password: null,
      confirmPassword: null,
      msg: null,
      msgClass: null
    }
  },
  components: {
    InputSubmit,
    Message
  },
  props: [
    // Propriedades recebidas pelo componente
    "user",
    "page",
    "btnText",
    "title"
  ],
  methods: {
    // Função para lidar com o envio do formulário
    async handleSubmit(event) {
      event.preventDefault();

      if (this.page === 'register') {
        // Se a página for de registro, chama a função para registrar usuário
        this.registerUser();
      } else {
        // Caso contrário, atualiza o usuário
        this.updateUser();
      }
    },
    async registerUser() {
      // Lógica para registrar o usuário
      console.log('Registrando usuário...');
      const data = {
        name: this.name,
        email: this.email,
        password: this.password,
        confirmpassword: this.confirmPassword
      }

      const jsonData = JSON.stringify(data);

      // Faz uma requisição POST para o endpoint de registro
      await fetch("http://localhost:3000/api/auth/register", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: jsonData
        })
        .then((response) => response.json())
        .then((data) => {
          let auth = false;

          if (data.error) {
            // Se houver erro, exibe a mensagem de erro
            this.msg = data.error;
            this.msgClass = "error";
          } else {
            auth = true;
            // Se não houver erro, exibe a mensagem de sucesso
            this.msg = data.msg;
            this.msgClass = "success";

            // Emite a autenticação do usuário e armazena o token no store
            this.$store.commit("setAuthenticate", { token: data.token, userId: data.userId })
          }

          setTimeout(() => {
            if (!auth) {
              this.msg = null;
            } else {
              // Redireciona para o dashboard após o registro bem-sucedido
              this.$router.push("dashboard");
            }
          }, 4000);
        })
    },
    async updateUser() {
      // Lógica para atualizar o usuário
      console.log("Atualizando usuário...");

      const data = {
        id: this.id,
        name: this.name,
        email: this.email,
        password: this.password,
        confirmpassword: this.confirmPassword
      }

      const jsonData = JSON.stringify(data);

      // Obtém o token do estado global (store)
      const token = this.$store.getters.token;

      // Faz uma requisição PATCH para o endpoint de atualização do usuário
      await fetch("http://localhost:3000/api/user", {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
            "auth-token": token
          },
          body: jsonData
        })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            // Se houver erro, exibe a mensagem de erro
            this.msg = data.error;
            this.msgClass = "error";
          } else {
            // Se não houver erro, exibe a mensagem de sucesso
            this.msg = data.msg;
            this.msgClass = "success";
          }
        })
        .catch((err) => {
          console.log(err);
        });

      // Limpa a mensagem após 3 segundos
      setTimeout(() => {
        this.msg = null;
      }, 3000);
    }
  }
}
</script>