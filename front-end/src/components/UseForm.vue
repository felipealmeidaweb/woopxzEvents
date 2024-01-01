<template>
    <div class="flex justify-center items-center mt-8">
        
      <form class="w-80 space-y-4 rounded-lg p-6 form-with-color-animation" id="user-form" @submit="handleSubmit">
        <Message :msg="msg" :msgClass="msgClass"/>
        <h2 class="text-white text-2xl font-semibold">Cadastro</h2>

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
          <input id="password" v-model="password" name="password" type="password" class="input" placeholder="Digite sua senha" required>
        </div>


        <div class="flex flex-col input-container">
          <label for="confirPassword" class="text-white mb-1">Confirmar Senha</label>
          <input id="confirmPassword" v-model="confirmPassword" name="confirmPassword" type="password" class="input" placeholder="Confirme sua senha" required>
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
  import Message from './Message.vue';
  import InputSubmit from './InputSubmit.vue';
  export default{
    name:"RegisterForm",
    data(){
        return{
            name:null,
            email:null,
            password:null,
            confirmPassword:null,
            msg:null,
            msgClass:null
        }
    },
    components:{
        InputSubmit,
        Message
    }
    ,
    props:[
        "user",
        "page",
        "btnText"
     
    ],


    methods: {
       async handleSubmit(event) {
      event.preventDefault();

      if (this.page === 'register') {
        this.registerUser();
      } else {
        this.updateUser();
      }
    },
    async registerUser() {
      // Lógica para registro do usuário
      console.log('Registrando usuário...');
      const data = {
        name:this.name,
        email:this.email,
        password:this.password,
        confirmpassword:this.confirmPassword
      }

      const jsonData = JSON.stringify(data);
      
      await fetch("http://localhost:3000/api/auth/register",{
        method:"POST",
        headers:{"Content-type":"application/json"},
        body:jsonData

      })
      .then((response)=>response.json())
      .then((data)=>{
        let auth = false

        if(data.error){
          this.msg = data.error
          this.msgClass = "error"
        } else{
          auth = true;
          this.msg = data.msg;
          this.msgClass = "success"


          //emit emmit for auth user 
        }

        setTimeout(()=>{
          if(!auth){
            this.msg = null
          } else{
            //redirect

            this.$router.push("dashboard")
          }
        }, 4000)
      })


    },


   async updateUser() {
      // Lógica para atualizar usuário
      console.log('Atualizando usuário...');
    }
  }
  }
</script>
  