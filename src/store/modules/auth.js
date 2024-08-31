import apiClient from '../../utils/api';
import router from '../../router';

const state = {
  userId: localStorage.getItem('userId') || null,
  username: localStorage.getItem('username') || null, 
  isAuthenticated: !!localStorage.getItem('userId'),
};

const getters = {
  getUserId: (state) => state.userId,
  getUsername: (state) => state.username, 
  isAuthenticated: (state) => state.isAuthenticated,
};

const actions = {
  async register({ commit }, { username, password }) {
    try {
      const response = await apiClient.post('/Users/register', { username, password });
      if (response.data.message === 'Usuario registrado con éxito.') {
        console.log('Registro exitoso:', response.data);
        router.push('/login');
      } else {
        console.warn('Respuesta inesperada del backend:', response.data);
      }
    } catch (error) {
      console.error('Error en el registro:', error.response?.data || error.message);
    }
  },

  async login({ commit }, { username, password }) {
    try {
      const response = await apiClient.post('/Users/login', { username, password });
      if (response.data.message === 'Inicio de sesión exitoso.') {
        const userId = response.data.userId;
        if (userId) {
          console.log('Inicio de sesión exitoso:', response.data);
          commit('setUser', { userId, username }); 
          router.push('/home');
        } else {
          console.error('No se recibió el userId del backend.');
        }
      } else {
        console.warn('Respuesta inesperada del backend:', response.data);
      }
    } catch (error) {
      console.error('Error en el login:', error);
    }
  },

  logout({ commit }) {
    commit('clearUser');
    console.log('Usuario desconectado.');
    router.push('/login');
  },
};

const mutations = {
  setUser(state, { userId, username }) {
    state.userId = userId;
    state.username = username; 
    state.isAuthenticated = true;
    localStorage.setItem('userId', userId);
    localStorage.setItem('username', username); 
    console.log('Mutación: Usuario establecido con userId:', userId);
  },
  clearUser(state) {
    state.userId = null;
    state.username = null; 
    state.isAuthenticated = false;
    localStorage.removeItem('userId');
    localStorage.removeItem('username'); 
    console.log('Mutación: Usuario borrado');
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
