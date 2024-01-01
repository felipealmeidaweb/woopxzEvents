import { createStore } from 'vuex';
import VuexPersistence from 'vuex-persist';

// Cria uma instância do VuexPersistence para persistir o estado Vuex no localStorage
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
});

// Cria e exporta a store Vuex
export default createStore({
  state() {
    return {
      authenticated: false, // Estado de autenticação do usuário
      token: null, // Token de autenticação
      userId: null // ID do usuário autenticado
    };
  },
  mutations: {
    // Mutation para definir o estado de autenticação e os dados do usuário
    setAuthenticate(state, data) {
      state.authenticated = true;
      state.token = data.token;
      state.userId = data.userId;
    },
    // Mutation para deslogar o usuário
    logout(state) {
      state.authenticated = false;
      state.token = null;
      state.userId = null;
    }
  },
  getters: {
    // Getters para acessar o estado da autenticação, token e userId
    authenticated: state => state.authenticated,
    token: state => state.token,
    userId: state => state.userId
  },
  actions: {
    // Se houver operações assíncronas ou lógica de negócios relacionada à autenticação,
    // elas podem ser definidas aqui
  },
  plugins: [vuexLocal.plugin] // Usa o plugin VuexPersistence para persistir o estado no localStorage
});
