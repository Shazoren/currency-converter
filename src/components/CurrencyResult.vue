<template>
  <div>
    <ul v-if="!isObjectResult"> <li>Erreur : Le résultat ne doit être ni nul ni négatif !</li></ul>
    <ul v-else>
      <li v-for="(rate, currencyCode) in result" :key="currencyCode">
        {{ amount }} {{ fromCurrency }} = {{ rate }} {{ currencyCode }}
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
      if (this.amount > 0){
        return typeof this.result === 'object';
      } else {return false;}
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

p,li {
  margin-bottom: 5px;
  color: black;
}
</style>
