<template>
    <div class="favorite-list max-w-3xl mx-auto">
      <h1 class="text-2xl font-bold mb-4 text-center">Mis Criptomonedas Favoritas</h1>
      <div v-if="loading" class="text-center">Cargando...</div>
      <div v-else>
        <table class="min-w-full bg-white border border-gray-200 rounded-lg shadow-md text-sm">
          <thead class="bg-gray-100">
            <tr>
              <th class="py-2 px-4 border-b text-center">Icono</th>
              <th class="py-2 px-4 border-b text-left">Nombre</th>
              <th class="py-2 px-4 border-b text-right">Precio Actual</th>
              <th class="py-2 px-4 border-b text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="favorite in favorites" :key="favorite.cryptocurrency.apiId" class="hover:bg-gray-50">
              <td class="py-3 px-4 border-b text-center">
                <img :src="favorite.cryptocurrency.iconPath" alt="crypto-icon" class="w-8 h-8 inline-block rounded-full"> <!-- Imagen redonda -->
              </td>
              <td class="py-3 px-4 border-b text-left">{{ favorite.cryptocurrency.name }}</td>
              <td class="py-3 px-4 border-b text-right">
                {{ favorite.cryptocurrency.currentPrice ? `$${favorite.cryptocurrency.currentPrice.toFixed(2)}` : 'No disponible' }}
              </td>
              <td class="py-3 px-4 border-b text-center">
                <button @click="openModal(favorite.cryptocurrency)" class="text-blue-500 hover:text-blue-700 mx-2 transition transform hover:scale-110">
                  <i class="fa-solid fa-eye text-lg"></i>
                </button>
                <button @click="removeFromFavorites(favorite)" class="text-red-500 hover:text-red-700 mx-2 transition transform hover:scale-110">
                  <i class="fa-solid fa-trash-alt text-lg"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <CryptoDetails 
        v-if="selectedCrypto"
        :isOpen="isModalOpen"
        :crypto="selectedCrypto"
        @close="closeModal"
      />
    </div>
  </template>
  
  <script>
  import CryptoDetails from './CryptoDetails.vue';
  
  export default {
    components: {
      CryptoDetails
    },
    props: {
      favorites: Array,
      loading: Boolean,
    },
    data() {
      return {
        isModalOpen: false,
        selectedCrypto: null,
      };
    },
    methods: {
      openModal(crypto) {
        this.selectedCrypto = crypto;
        this.isModalOpen = true;
      },
      closeModal() {
        this.isModalOpen = false;
        this.selectedCrypto = null;
      },
      removeFromFavorites(favorite) {
        this.$emit('onRemoveFavorite', favorite);
      },
    },
  };
  </script>
  