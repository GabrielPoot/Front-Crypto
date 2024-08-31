import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../pages/HomePage.vue';
import FavoritesPage from '../pages/FavoritesPage.vue';
import RegisterPage from '../pages/RegisterPage.vue';
import LoginPage from '../pages/LoginPage.vue';
import CryptoList from '../components/CryptoList.vue';
import CryptoDetails from '../components/CryptoDetails.vue';
import store from '../store'; 

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/cryptos', component: CryptoList },
  { path: '/favorites', component: FavoritesPage },
  { path: '/crypto/:id', component: CryptoDetails, props: true },
  { path: '/register', component: RegisterPage },
  { path: '/login', component: LoginPage },
  { path: '/home', component: HomePage },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters['auth/isAuthenticated'];
  console.log(`Navegando a: ${to.path} Estado autenticado: ${isAuthenticated}`);

  if (to.path !== '/login' && to.path !== '/register' && !isAuthenticated) {
    console.log('redirigiendo al login.');
    next('/login'); 
  } else {
    next(); 
  }
});

export default router;
