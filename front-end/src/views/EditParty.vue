<template>
  <!-- Define a estrutura do componente -->
  <div class="editparty min-h-screen">
    <!-- Utiliza o componente PartyForm, passando props -->
    <PartyForm :party="party" :key="componentKey" page="editparty" btnText="Editar Festas" class="party-form" />
  </div>
</template>

<script>
import PartyForm from '@/components/PartyForm.vue';

export default {
  // Nome do componente
  name: "editparty",

  // Componentes utilizados no template
  components: {
    PartyForm
  },

  // Propriedades de dados do componente
  data() {
    return {
      // Objeto party inicializado com campos vazios
      party: {
        // Campos da festa
      },
      componentKey: 0 // Inicialização da chave do componente
    }
  },

  // Método executado ao criar o componente
  created() {
    // Chama a função para carregar os dados da festa
    this.getParties();
  },

  // Métodos utilizados no componente
  methods: {
    async getParties() {
      // Obtém o ID da festa a partir da URL e o token do armazenamento
      const id = this.$route.params.id;
      const token = this.$store.getters.token;

      // Requisição para obter os detalhes da festa
      await fetch(`http://localhost:3000/api/party/${id}`, {
        headers: {
          "Content-type": "application/json",
          "auth-token": token
        }
      })
        .then((response) => response.json())
        .then((data) => {
          // Atualiza o objeto party com os detalhes da festa obtidos
          this.party = data.party;

          // Ajusta o formato da data para exibição
          this.party.partyDate = this.party.partyDate.substring(0, 10);

          // Corrige o nome da propriedade das fotos e ajusta as URLs
          this.party.photos.forEach((photo, index) => {
            this.party.photos[index] = photo.replace("public", "http://localhost:3000");
          });

          // Incrementa a chave do componente para forçar a atualização do PartyForm
          this.componentKey += 1;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
/* Estilos específicos do componente */
.editparty {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
  width: 90vw;
}


</style>
