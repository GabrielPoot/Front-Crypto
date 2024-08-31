import apiClient from '../../utils/api';

const state = {
  popularCryptos: [],     // Lista de criptomonedas populares
  favoriteCryptos: [],    // Lista de criptomonedas favoritas del usuario
  loading: false,         // Estado de carga para mostrar spinners o similar
  error: null,            // Estado para errores
  lastFetched: null,      // Marca de tiempo para la última vez que se obtuvieron los datos
};

const getters = {
  getPopularCryptos: (state) => state.popularCryptos,
  getFavoriteCryptos: (state) => state.favoriteCryptos,
  isLoading: (state) => state.loading,
  getError: (state) => state.error,
};

const actions = {
  async fetchPopularCryptos({ commit, state }) {
    const now = new Date();
    if (state.lastFetched && (now - state.lastFetched) < 60000) {
      console.log("Usando datos en caché para las criptomonedas populares.");
      return;
    }

    commit('setLoading', true);
    try {
      const response = await apiClient.get('/Cryptocurrencies/popular');
      commit('setPopularCryptos', response.data);
      commit('setLastFetched', now);
    } catch (error) {
      commit('setError', 'Error al obtener las criptomonedas populares.');
      console.error('Error fetching popular cryptocurrencies:', error);
    } finally {
      commit('setLoading', false);
    }
  },

  async fetchFavoriteCryptos({ commit }, userId) {
    commit('setLoading', true);
    try {
      const response = await apiClient.get(`/Favorites/${userId}`);
      commit('setFavoriteCryptos', response.data);
    } catch (error) {
      commit('setError', 'Error al obtener las criptomonedas favoritas.');
      console.error('Error fetching favorite cryptocurrencies:', error);
    } finally {
      commit('setLoading', false);
    }
  },

  async addFavoriteCrypto({ commit }, favoriteDto) {
    commit('setLoading', true);
    try {
      const response = await apiClient.post('/Favorites', favoriteDto);
      commit('addFavoriteCrypto', response.data);
    } catch (error) {
      commit('setError', 'Error al agregar la criptomoneda a favoritos.');
      console.error('Error adding favorite cryptocurrency:', error);
    } finally {
      commit('setLoading', false);
    }
  },

  async removeFavoriteCrypto({ commit, state }, { userId, cryptocurrencyId }) {
    commit('setLoading', true);
    try {
      await apiClient.delete(`/Favorites/${userId}/${cryptocurrencyId}`);
      commit('removeFavoriteCrypto', cryptocurrencyId);
  
      const updatedCryptos = state.popularCryptos.map(crypto => {
        if (crypto.apiId === cryptocurrencyId) {
          return { ...crypto, isFavorite: false };
        }
        return crypto;
      });
      commit('setPopularCryptos', updatedCryptos);
    } catch (error) {
      commit('setError', 'Error al eliminar la criptomoneda de favoritos.');
      console.error('Error removing favorite cryptocurrency:', error);
    } finally {
      commit('setLoading', false);
    }
  },        
};

const mutations = {
  setPopularCryptos(state, cryptos) {
    state.popularCryptos = cryptos;
  },
  setFavoriteCryptos(state, cryptos) {
    state.favoriteCryptos = cryptos;
  },
  addFavoriteCrypto(state, crypto) {
    state.favoriteCryptos.push(crypto);
  },
  removeFavoriteCrypto(state, cryptocurrencyId) {
    state.favoriteCryptos = state.favoriteCryptos.filter(
      (crypto) => crypto.cryptocurrencyId !== cryptocurrencyId
    );
  },
  setLoading(state, isLoading) {
    state.loading = isLoading;
  },
  setError(state, errorMessage) {
    state.error = errorMessage;
  },
  setLastFetched(state, timestamp) {
    state.lastFetched = timestamp;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
