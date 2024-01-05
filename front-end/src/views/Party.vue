<template>
    <div class="max-w-md mx-auto">
      <h1 class="text-3xl font-bold mb-4 text-white">{{ party.title }}</h1>
      <p class="mb-4 text-white">{{ party.description }}</p>
      <p class="mb-4 text-white">Data da festa: {{ party.partyDate }}</p>
  
      <swiper
        v-if="party.photos && party.photos.length > 0"
        :grabCursor="true"
        :effect="'creative'"
        :creativeEffect="{
          prev: {
            shadow: true,
            translate: [0, 0, -400],
          },
          next: {
            translate: ['100%', 0, 0],
          },
        }"
        :modules="modules"
        class="mySwiper"
        style="height: 300px;"
      >
        <swiper-slide v-for="(photo, index) in party.photos" :key="index">
          <img :src="photo" alt="Party Image" class="w-full h-full object-cover rounded-md" />
        </swiper-slide>
      </swiper>
      <!-- Tratamento para quando não houver fotos ou enquanto estiver carregando -->
      <div v-else>
        <p v-if="loading">Carregando...</p>
        <p v-else>Não há fotos disponíveis para esta festa.</p>
      </div>
    </div>
  </template>
  
  <script>
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import 'swiper/css';
  import 'swiper/css/effect-creative';
  import { EffectCreative } from 'swiper/modules';
  
  export default {
    components: {
      Swiper,
      SwiperSlide,
    },
    data() {
      return {
        party: {
          title: '',
          description: '',
          photos: [],
        },
        loading: false,
      };
    },
    setup() {
      return {
        modules: [EffectCreative],
      };
    },
    created() {
      this.getParty();
    },
    methods: {
      async getParty() {
        try {
          this.loading = true;
  
          // Simulando a obtenção dos dados da festa
          // Substitua esta parte com a lógica da sua API
          // Exemplo:
          const id = this.$route.params.id;
          const token = this.$store.getters.token;
  
          const response = await fetch(`http://localhost:3000/api/party/${id}`, {
            method: 'GET',
            headers: {
              'Content-type': 'application/json',
              'auth-token': token,
            },
          });
          const data = await response.json();
  
          this.party = data.party;
          this.party.partyDate = new Date(this.party.partyDate).toLocaleDateString()
          this.party.photos = this.party.photos.map(photo =>
            photo.replace('public', 'http://localhost:3000').replaceAll('\\', '/')
          );
  
          this.loading = false;
        } catch (error) {
          console.error(error);
          this.loading = false;
        }
      },
    },
  };
  </script>
  
  <style>
  /* Adicione estilos personalizados conforme necessário */
  .swiper-slide img {
    max-height: 250px;
  }
  </style>
    