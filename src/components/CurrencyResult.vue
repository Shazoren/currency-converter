<template>
  <div>
    <p v-if="!isObjectResult">1 {{ fromCurrency }} = {{ result }} {{ toCurrency }}</p>
    <ul v-else>
      <li v-for="(rate, currencyCode) in result" :key="currencyCode">
        1 {{ fromCurrency }} = {{ rate }} {{ currencyCode }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    amount: Number,
    fromCurrency: String,
    toCurrency: String,
    result: [Number, Object],
  },
  computed: {
    isObjectResult() {
      return typeof this.result === 'object';
    },
  },
};
</script>

<style scoped>
/* Ajoutez des styles CSS au besoin */
ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

li {
  margin-bottom: 5px;
  color: black;
}
</style>
