<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
      <div class="flex justify-end">
        <button @click="closeModal" class="text-gray-500 hover:text-gray-700">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="text-center">
        <img :src="crypto.iconPath" alt="Icono" class="mx-auto mb-4 w-16 h-16"/>
        <h2 class="text-2xl font-bold mb-2">{{ crypto.name }} ({{ crypto.symbol.toUpperCase() }})</h2>
        <p class="text-gray-600 mb-4">Ranking de Mercado: {{ crypto.marketCapRank }}</p>
        <p class="text-gray-800 text-xl mb-2">Precio Actual: ${{ crypto.currentPrice.toFixed(2) }}</p>
        <p class="text-gray-600">Volumen 24h: {{ crypto.volume24h.toLocaleString() }}</p>
        <p :class="{'text-green-600': crypto.change24h >= 0, 'text-red-600': crypto.change24h < 0}" class="font-bold">
          Cambio 24h: {{ crypto.change24h.toFixed(2) }}%
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    crypto: {
      type: Object,
      required: true,
    },
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
  },
};
</script>
