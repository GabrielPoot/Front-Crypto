<template>
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300">
      <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 class="text-2xl font-bold text-center mb-4">Registrarse</h2>
        <form @submit.prevent="handleRegister">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Nombre de Usuario</label>
            <input
              v-model="username"
              id="username"
              type="text"
              class="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600"
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
              class="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Introduce tu contraseña"
              required
            />
          </div>
          <div class="flex items-center justify-center">
            <button
              type="submit"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              Registrarse
            </button>
          </div>
          <div v-if="error" class="text-red-500 mt-4">{{ error }}</div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import { mapActions } from 'vuex';
  
  export default {
    data() {
      return {
        username: '',
        password: '',
        error: null,
      };
    },
    methods: {
      ...mapActions('auth', ['register']),
      async handleRegister() {
        try {
          await this.register({ username: this.username, password: this.password });
        } catch (error) {
          this.error = 'Error durante el registro. Por favor, inténtelo de nuevo.';
          console.error('Error en el registro:', error);
        }
      },
    },
  };
  </script>
  