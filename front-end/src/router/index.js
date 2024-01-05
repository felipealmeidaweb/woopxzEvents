import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import store from '@/store';

// Definição das rotas da aplicação
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      requiresAuth: false // Indica se a rota requer autenticação
    }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue'),
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import(/* webpackChunkName: "profile" */ '../views/Profile.vue'),
    meta: {
      requiresAuth: true // Esta rota requer autenticação
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    meta: {
      requiresAuth: true // Esta rota requer autenticação
    },
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue')
  },
  {
    path: '/newparty',
    name: 'NewParty',
    meta: {
      requiresAuth: true // Esta rota requer autenticação
    },
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/NewParty.vue')
  },
  {
    path: '/editparty/:id',
    name: 'EditParty',
    meta: {
      requiresAuth: true // Esta rota requer autenticação
    },
    component: () => import(/* webpackChunkName: "editpary" */ '../views/EditParty.vue')
  },
  {
    path: '/party/:id',
    name: 'Party',
    meta: {
      requiresAuth: true // Esta rota requer autenticação
    },
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/Party.vue')
  }
];

// Criação do router
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL), // Configuração do histórico de navegação
  routes // Passa as rotas para o router
});

// Guarda de navegação para verificar a autenticação antes de acessar rotas protegidas
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Verifica se a rota requer autenticação
    if (store.getters.authenticated === false) {
      // Se não estiver autenticado, redireciona para a rota de login
      next({
        path: "/login",
        params: { nextUrl: to.fullPath }
      });
    } else {
      // Se estiver autenticado, permite o acesso à rota
      next();
    }
  } else {
    // Se a rota não requer autenticação, permite o acesso direto
    next();
  }
});

export default router; // Exporta o router configurado
