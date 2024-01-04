<template>
  <div>
    <label for="searchCurrency">Rechercher une devise:</label>
    <input
      type="text"
      id="searchCurrency"
      v-model="searchTerm"
      @input="handleSearch"
    />
    <ul>
      <li v-for="currency in filteredCurrencies" :key="currency.code" @click="emitSelectedCurrency(currency)">
        {{ currency.code }} - {{ currency.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    currencies: Array,
    fromCurrency: String,
  },
  data() {
    return {
      searchTerm: '',
      filteredCurrencies: [],
    };
  },
  methods: {
    handleSearch() {
      const term = this.searchTerm.toLowerCase();
      if (term.length > 0 && this.fromCurrency) {
        if (Array.isArray(this.currencies)) {
          // Filtrer les devises en excluant la devise de base
          this.filteredCurrencies = this.currencies.filter(
            (currency) =>
              currency.code.toLowerCase().includes(term) ||
              currency.name.toLowerCase().includes(term)
          ).filter(
            currency => currency.code.toLowerCase() !== this.fromCurrency.toLowerCase()
          );
        }
      } else {
        // Ne rien faire si la barre de recherche est vide
        this.filteredCurrencies = [];
      }
    },
    emitSelectedCurrency(currency) {
      this.$emit('selectCurrency', currency);
    },
  },
};
</script>

<style scoped>
label {
  color: black;
}

input {
  width: 50%;
  box-sizing: border-box;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

li {
  cursor: pointer;
  padding: 5px;
  border: 1px solid #ccc;
  margin: 2px;
  color: black;
}
</style>
