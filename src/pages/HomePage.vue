<template>
  <div>
    <CryptoList 
      :title="'Criptomonedas Populares'"
      :cryptos="popularCryptos" 
      @onViewDetails="showCryptoDetails" 
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import CryptoList from '../components/CryptoList.vue';

export default {
  components: {
    CryptoList,
  },
  computed: {
    ...mapState('crypto', ['popularCryptos']),
  },
  created() {
    this.$store.dispatch('crypto/fetchPopularCryptos');
  },
  methods: {
    showCryptoDetails(crypto) {
      this.$router.push(`/crypto/${crypto.apiId}`);
    },
  },
};
</script>
