<template>
  <!-- Componente de container de dados -->
  <div class="data-container">
    <!-- Componente de mensagem com propriedades -->
    <Message :msg="msg" :msgClass="msgClass" />
    <!-- Cabeçalho da tabela -->
    <div class="border-b border-gray-300 mb-4">
      <div class="grid grid-cols-3 gap-0 h-12">
        <div class="flex items-center justify-center font-semibold text-white">Nº:</div>
        <div class="flex items-center justify-center font-semibold text-white">Nome da Festa:</div>
        <div class="flex items-center justify-center font-semibold text-white">Ações:</div>
      </div>
    </div>
    <!-- Corpo da tabela -->
    <div>
      <!-- Loop pelos dados das festas -->
      <div v-for="(party, index) in parties" :key="party._id" class="border-b border-gray-300 mb-4">
        <div class="grid grid-cols-3 gap-0 h-16">
          <div class="flex items-center justify-center text-white">{{ index + 1 }}</div>
          <div class="flex items-center text-white">
            <router-link :to="`/party/${party._id}`">{{ party.title }}</router-link>
          </div>
          <div class="flex items-center justify-center space-x-2">
            <!-- Botão de remoção com evento de clique -->

            <router-link :to="`/editparty/${party._id}`" class="edit-btn">Editar</router-link>

            <button @click="remove(party._id)" class="inline-block px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-300">Remover</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Message from './Message';

export default {
  name: "DataTable",
  props: ["parties"], // Propriedade recebida pelo componente
  components: {
    Message
  },
  data() {
    return {
      msg: null, // Mensagem exibida
      msgClass: null, // Classe da mensagem (erro ou sucesso)
    }
  },
  methods: {
    async remove(id) {
      console.log("ID do item a ser removido:", id);

      // Obter id e token do estado da store
      const userId = this.$store.getters.userId;
      const token = this.$store.getters.token;

      const data = {
        id: id,
        userId: userId
      }

      const jsonData = JSON.stringify(data);

      // Requisição para remover a festa
      await fetch(`http://localhost:3000/api/party/delete`, {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            "auth-token": token
          },
          body: jsonData
        })
        .then((resp) => resp.json())
        .then((data) => {

          // Exibição da mensagem de erro ou sucesso
          if (data.error) {
            this.msg = data.error;
            this.msgClass = "error";
          } else {
            this.msg = data.msg;
            this.msgClass = "success";
          }

          // Limpar a mensagem após 2 segundos e atualizar as festas
          setTimeout(() => {
            this.msg = null;
            // Obter novamente todas as festas
            this.$parent.getParties();
          }, 2000);

        })
        .catch((err) => {
          console.log(err);
        })

    }
  }
}
</script>

<style scoped>
/* Estilos CSS específicos para este componente */
.data-table-heading,
.data-row {
  display: flex;
  align-items: center;
  height: 50px;
  border-bottom: 1px solid #CCC;
}

.data-table-heading div,
.data-row div {
  flex: 1 1 0;
}

.data-id-heading,
.data-id-container {
  max-width: 50px
}

.edit-btn,
.remove-btn {
  padding: 10px 16px;
  background-color: #000;
  color: #FFF;
  margin: 5px;
  text-decoration: none;
  border: none;
  font-size: 14px;
  cursor: pointer;
  transition: .5s;
}

.edit-btn {
  background-color: #007bff;
}

.edit-btn:hover {
  background-color: #0069d9;
}

.remove-btn {
  background-color: #dc3545;
}

.remove-btn:hover {
  background-color: #c82333;
}
</style>
