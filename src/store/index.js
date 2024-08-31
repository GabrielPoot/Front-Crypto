import { createStore } from 'vuex';
import auth from './modules/auth';
import crypto from './modules/crypto'; 

const store = createStore({
  modules: {
    crypto, 
    auth
  },
});

export default store;
