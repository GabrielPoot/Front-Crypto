<template>
    <nav class="bg-gray-800 p-6 w-full">
      <div class="flex items-center justify-between w-full">
        <div class="flex items-center space-x-4">
          <i class="fa-brands fa-bitcoin text-4xl text-yellow-500"></i> 
          <span class="text-white text-xl">Bienvenido al mundo de Criptomonedas, {{ username }}</span> 
        </div>
        <div class="flex items-center space-x-4"> 
          <router-link
            v-if="isAuthenticated"
            to="/home"
            class="text-cyan-400 hover:text-green-500"
            :class="{ 'text-green-500': $route.path === '/home' }"
          >
            Criptomonedas Populares
          </router-link>
          <router-link
            v-if="isAuthenticated"
            to="/favorites"
            class="text-cyan-400 hover:text-green-500"
            :class="{ 'text-green-500': $route.path === '/favorites' }"
          >
            Criptomonedas Favoritas
          </router-link>
          <button v-if="isAuthenticated" @click="logout" class="ml-4">
            <i class="fa-solid fa-right-from-bracket text-3xl text-red-500 hover:text-red-700"></i> 
          </button>
        </div>
      </div>
    </nav>
  </template>
  
  <script>
  import { mapActions, mapGetters } from 'vuex';
  
  export default {
    name: 'Navbar',
  
    computed: {
      ...mapGetters('auth', ['isAuthenticated', 'getUsername']),
      username() {
        return this.getUsername; 
      },
    },
  
    methods: {
      ...mapActions('auth', ['logout']),
    },
  };
  </script>
  