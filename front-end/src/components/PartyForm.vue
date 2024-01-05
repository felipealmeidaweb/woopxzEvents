<template>
  <div class="h-screen mt-1">
    <form
      id="register-form"
      enctype="multipart/form-data"
      @submit="page === 'newparty' ? createParty($event) : update($event)"
      class="max-w-sm mx-auto bg-gray-100 p-6 rounded-lg shadow-md "
    >
    <Message :msg="msg" :msgClass="msgClass" />
      <input
        type="hidden"
        id="id"
        name="id"
        v-model="id"
      />
      <input
        type="hidden"
        id="user_id"
        name="user_id"
        v-model="user_id"
      />
      <div class="mb-4">
        <label for="title" class="block mb-2 text-gray-700">Título do Evento:</label>
        <input
          type="text"
          id="title"
          name="title"
          v-model="title"
          placeholder="Digite o título"
          class="p-4 border border-gray-300 rounded-lg w-full"
        />
      </div>
      <div class="mb-4">
        <label for="description" class="block mb-2 text-gray-700">Descrição:</label>
        <textarea
          id="description"
          name="description"
          v-model="description"
          placeholder="O que vai acontecer ou o que já aconteceu?"
          class="p-4 border border-gray-300 rounded-lg w-full"
        ></textarea>
      </div>
      <div class="mb-4">
        <label for="party_date" class="block mb-2 text-gray-700">Data da Festa:</label>
        <input
          type="date"
          id="party_date"
          name="party_date"
          v-model="party_date"
          class="p-4 border border-gray-300 rounded-lg w-full"
        />
      </div>
      <div class="mb-4">
        <label for="photos" class="block mb-2 text-gray-700">Imagens:</label>
        <input
          type="file"
          multiple="multiple"
          id="photos"
          name="photos"
          ref="file"
          @change="onChange"
          class="p-4 border border-gray-300 rounded-lg w-full"
        />
      </div>
      <div v-if="page === 'editparty' && showMiniImages" class="mb-4">
        <p class="font-bold mb-2 text-left">Imagens atuais:</p>
        <img
          v-for="(photo, index) in photos"
          :src="`${photo}`"
          :key="index"
          class="h-12 mr-4 mb-4"
        />
      </div>
      <div class="mb-4 flex items-center">
        <label for="privacy" class="text-gray-700">Evento privado</label>
        <input
          type="checkbox"
          multiple
          id="privacy"
          name="privacy"
          v-model="privacy"
          class="ml-2"
        />
      </div>
      <InputSubmit :text="btnText" />
    </form>
  </div>
</template>

<script>
import InputSubmit from './InputSubmit.vue'
import Message from './Message'

export default {
  name: "FormParty", // Nome do componente Vue

  components: {
    InputSubmit,
    Message
  },

  data() {
    return {
      // Inicialização das propriedades de dados do componente
      // com valores padrão vindo da propriedade 'party' ou valores vazios caso a propriedade 'party' não tenha valor
      id: this.party._id || "", // ID do evento
      title: this.party.title || "", // Título do evento
      description: this.party.description || "", // Descrição do evento
      party_date: this.party.partyDate || "", // Data do evento
      photos: this.party.photos || [], // Fotos do evento
      privacy: this.party.privacy || false, // Configuração de privacidade do evento
      user_id: this.party.userId || "", // ID do usuário associado ao evento
      msg: null, // Mensagem de feedback do servidor
      msgClass: null, // Classe para estilização da mensagem
      showMiniImages: true, // Controle para exibição de miniaturas de imagens
    }
  },

  props: ["party", "page", "btnText"], // Propriedades recebidas pelo componente

  methods: {
    // Método para criar um novo evento
    async createParty(e) {
      // Prevenir o comportamento padrão do formulário
      e.preventDefault();

      // Criação do objeto FormData para enviar os dados do evento
      const formData = new FormData();

      // Adiciona os campos do formulário ao FormData
      formData.append('title', this.title);
      formData.append('description', this.description);
      formData.append('party_date', this.party_date);
      formData.append('privacy', this.privacy);

      // Adiciona as fotos ao FormData se houverem
      if(this.photos.length > 0) {
        for (const i of Object.keys(this.photos)) {
          formData.append('photos', this.photos[i])
        }
      }

      // Obtenção do token de autenticação do estado da aplicação
      const token = this.$store.getters.token;

      // Requisição POST para criar um novo evento
      await fetch("http://localhost:3000/api/party", {
        method: "POST",
        headers: {
          "auth-token": token
        },
        body: formData
      })
      .then((resp) => resp.json())
      .then((data) => {
        // Manipulação dos dados recebidos da resposta da API

        // Se houver um erro, define a mensagem de erro e sua classe correspondente
        if(data.error) {
          this.msg = data.error;
          this.msgClass = "error";
        } else {
          // Se não houver erro, define a mensagem de sucesso e sua classe correspondente
          this.msg = data.msg;
          this.msgClass = "success";

          // Após um período de tempo, limpa a mensagem
          setTimeout(() => {
            this.msg = null;   

            // Redireciona para a página de dashboard se não houver erro
            if(!data.error) {                    
              this.$router.push('dashboard');
            }
          }, 2000);
        }
      })
      .catch((err) => {
        console.log(err);
      })
    },

    // Método chamado quando há alteração nos arquivos selecionados
    onChange(e) {
      // Atualiza a lista de fotos com os arquivos selecionados
      this.photos = e.target.files;
      this.showMiniImages = false; // Define showMiniImages como falso
    },



    // Método para atualizar um evento existente
    async update(e) {
      // Prevenir o comportamento padrão do formulário
      e.preventDefault();

      // Criação do objeto FormData para enviar os dados atualizados do evento
      const formData = new FormData();

      // Adiciona os campos do formulário ao FormData
      formData.append('id', this.id);
      formData.append('title', this.title);
      formData.append('description', this.description);
      formData.append('party_date', this.party_date); // Corrigir possível erro de nomenclatura
      formData.append('privacy', this.privacy);
      formData.append('user_id', this.user_id);

      // Adiciona as fotos ao FormData se houverem
      if(this.photos.length > 0) {
        for (const i of Object.keys(this.photos)) {
          formData.append('photos', this.photos[i])
        }
      }

      // Obtenção do token de autenticação do estado da aplicação
      const token = this.$store.getters.token;

      // Requisição PUT para atualizar um evento existente
      await fetch("http://localhost:3000/api/party", {
        method: "PATCH",
        headers: {
          "auth-token": token 
        },
        body: formData
      })
      .then((resp) => resp.json())
      .then((data) => {
        // Manipulação dos dados recebidos da resposta da API

        // Se houver um erro, define a mensagem de erro e sua classe correspondente
        if(data.error) {
          this.msg = data.error;
          this.msgClass = "error";
        } else {
          // Se não houver erro, define a mensagem de sucesso e sua classe correspondente
          
          this.msg = data.msg;
          this.msgClass = "success";
          
          
        }
      })
      .catch((err) => {
        console.log(err);
      })

      // Limpa a mensagem após um determinado período de tempo
      setTimeout(() => {
        this.msg = null; 
        this.$router.push("/dashboard");    
      }, 2000);
    }
  }
}
</script>