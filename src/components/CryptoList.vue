<template>
  <div class="flex justify-center">
    <div class="w-full max-w-4xl">
      <h1 class="text-2xl font-bold mb-4 text-center">{{ title }}</h1>
      <div v-if="loading" class="text-center">
        <p>Cargando...</p>
      </div>
      <div v-else>
        <table class="min-w-full bg-white border border-gray-200 rounded-lg shadow-md text-sm">
          <thead class="bg-gray-100">
            <tr>
              <th class="py-2 px-4 border-b text-center">Ranking</th>
              <th class="py-2 px-4 border-b text-center">Icono</th>
              <th class="py-2 px-4 border-b text-left">Nombre</th>
              <th class="py-2 px-4 border-b text-right">Precio Actual</th>
              <th class="py-2 px-4 border-b text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="crypto in cryptos" :key="crypto.apiId" class="hover:bg-gray-50">
              <td class="py-3 px-4 border-b text-center">{{ crypto.marketCapRank }}</td>
              <td class="py-3 px-4 border-b text-center">
                <img :src="crypto.iconPath" alt="icono" class="w-8 h-8 inline-block rounded-full" />
              </td>
              <td class="py-3 px-4 border-b text-left">{{ crypto.name }}</td>
              <td class="py-3 px-4 border-b text-right">
                <span class="inline-block">${{ crypto.currentPrice.toFixed(2) }}</span>
              </td>
              <td class="py-3 px-4 border-b text-center">
                <button @click="showDetails(crypto)" class="text-blue-500 hover:text-blue-700 mx-2 transition transform hover:scale-110">
                  <i class="fa-solid fa-eye text-lg"></i>
                </button>
                <button 
                  @click="toggleFavorite(crypto)" 
                  :disabled="isFavorite(crypto)"
                  class="mx-2"
                >
                  <i 
                    :class="isFavorite(crypto) ? 'fa-solid fa-bookmark text-lime-500 cursor-not-allowed' : 'fa-regular fa-bookmark text-green-500 hover:text-green-700 cursor-pointer'" 
                    class="text-lg transition transform hover:scale-110"
                  ></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <CryptoDetails 
      v-if="isModalOpen" 
      :isOpen="isModalOpen" 
      :crypto="selectedCrypto" 
      @close="closeModal" 
    />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import CryptoDetails from '../components/CryptoDetails.vue';

export default {
  components: {
    CryptoDetails,
  },
  props: {
    title: String,
  },
  data() {
    return {
      isModalOpen: false,
      selectedCrypto: null,
    };
  },
  computed: {
    ...mapState('crypto', ['popularCryptos', 'favoriteCryptos', 'loading']),
    cryptos() {
      return this.popularCryptos;
    },
    isFavorite() {
      return (crypto) => {
        return Array.isArray(this.favoriteCryptos) && this.favoriteCryptos.some(fav => fav.cryptocurrency.apiId === crypto.apiId);
      };
    },
  },
  methods: {
    ...mapActions('crypto', ['fetchPopularCryptos', 'addFavoriteCrypto', 'removeFavoriteCrypto']),
    
    toggleFavorite(crypto) {
      const userId = this.$store.getters['auth/getUserId'];
      if (!userId) {
        console.error('Usuario no autenticado.');
        return;
      }

      if (!this.isFavorite(crypto)) {
        const favoriteDto = {
          userId: userId,
          cryptocurrency: {
            id: crypto.id || 0,
            apiId: crypto.apiId,
            symbol: crypto.symbol,
            name: crypto.name,
            currentPrice: crypto.currentPrice,
            marketCapRank: crypto.marketCapRank,
            volume24h: crypto.volume24h,
            change24h: crypto.change24h,
            iconPath: crypto.iconPath
          }
        };
        
        this.addFavoriteCrypto(favoriteDto);
      }
    },
    showDetails(crypto) {
      this.selectedCrypto = crypto;
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    }
  },
  created() {
    this.fetchPopularCryptos();
  },
};
</script>
