<template>
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-700 via-gray-900 to-black">
      <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 class="text-2xl font-bold text-center mb-4">Iniciar Sesión</h2>
        <form @submit.prevent="handleLogin">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Nombre de Usuario</label>
            <input
              v-model="username"
              id="username"
              type="text"
              class="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Introduce tu nombre de usuario"
              required
            />
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Contraseña</label>
            <input
              v-model="password"
              id="password"
              type="password"
              class="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Introduce tu contraseña"
              required
            />
          </div>
          <div class="flex flex-col items-center justify-between">
            <button
              type="submit"
              class="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-purple-600 mb-4"
            >
              Iniciar Sesión
            </button>
            <router-link to="/register" class="text-sm font-bold text-purple-500 hover:text-purple-700">
              ¿No tienes cuenta? Regístrate
            </router-link>
          </div>
          <div v-if="error" class="text-red-500 mt-4">{{ error }}</div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import { mapActions, mapGetters } from 'vuex';
  
  export default {
    name: 'LoginPage',
    data() {
      return {
        username: '',
        password: '',
        error: null,
      };
    },
    computed: {
      ...mapGetters('auth', ['isAuthenticated']),
    },
    methods: {
      ...mapActions('auth', ['login']),
      async handleLogin() {
        try {
          await this.login({ username: this.username, password: this.password });
          if (this.isAuthenticated) {
            console.log('Inicio de sesión completado, redirigiendo...');
            this.$router.push('/home');
          } else {
            this.error = 'No se pudo autenticar. Verifique sus credenciales.';
            console.error('Error: No se pudo autenticar.');
          }
        } catch (error) {
          this.error = 'Error durante el inicio de sesión. Por favor, inténtelo de nuevo.';
          console.error('Error en el inicio de sesión:', error);
        }
      },
    },
    watch: {
      isAuthenticated(newValue) {
        if (newValue) {
          this.$router.push('/home');
        }
      },
    },
  };
  </script>
  