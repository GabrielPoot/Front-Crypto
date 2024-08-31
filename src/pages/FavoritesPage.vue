<template>
  <div>
    <FavoriteList 
      :favorites="favoriteCryptos"
      :loading="isLoading"
      @onViewDetails="showCryptoDetails"
      @onRemoveFavorite="removeFromFavorites"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import FavoriteList from '../components/FavoriteList.vue';

export default {
  components: {
    FavoriteList,
  },
  computed: {
    ...mapState('crypto', ['favoriteCryptos', 'loading']),
    isLoading() {
      return this.loading;
    }
  },
  created() {
    const userId = this.$store.getters['auth/getUserId'];
    if (userId) {
      this.$store.dispatch('crypto/fetchFavoriteCryptos', userId);
    }
  },
  methods: {
    ...mapActions('crypto', ['removeFavoriteCrypto']),
    showCryptoDetails(crypto) {
      this.$router.push(`/crypto/${crypto.apiId}`);
    },
    removeFromFavorites(favorite) {
      const userId = this.$store.getters['auth/getUserId'];
      if (!userId) {
        console.error('Usuario no autenticado.');
        return;
      }

      const cryptocurrencyId = favorite.cryptocurrency?.id; 

      if (!cryptocurrencyId) {
        console.error('ID de criptomoneda no encontrado.');
        return;
      }

      this.removeFavoriteCrypto({ userId, cryptocurrencyId });
    }
  },
};
</script>
