<template>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/water.css@2/out/water.css">
  <div id="app">
    <CurrencyConverter />
  </div>
</template>

<script>
import CurrencyConverter from './components/CurrencyConverter.vue';

export default {
  components: {
    CurrencyConverter,
  },
};
</script>

<style>
/* Ajoutez des styles CSS au besoin */
</style>
