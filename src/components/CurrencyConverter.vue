<template>
  <div class="container">

    
    <h1>Convertisseur de Monnaie</h1>
    <form @submit.prevent="convertCurrency" class="row g-3">

      <!-- Montant -->
      <div class="col-md-4">
        <label for="amount" class="form-label">Montant:</label>
        <input type="number" v-model="amount" class="form-control" required />
      </div>
      <!------------>

      <!-- Première liste déroulante -->
      <div class="col-md-4">
        <label for="fromCurrency" class="form-label">De:</label>
        <select v-model="fromCurrency" class="form-select">
          <option v-for="currency in currenciesList" :key="currency.code" :value="currency.code">{{ currency.name }}</option>
        </select>
      </div>
      <!------------------------------>

      <!-- SearchBar -->
      <div class="col-md-4">
        <currency-search
          :currencies="currenciesList"
          :fromCurrency="fromCurrency"
          @selectCurrency="selectCurrency"
        />
      </div>
      <!--------------->

      <!-- Deuxième liste déroulante -->
      <div class="col-md-4">
        <label for="toCurrency" class="form-label">À:</label>
        <select v-model="toCurrency" class="form-select">
          <option v-for="currency in currenciesList" :key="currency.code" :value="currency.code">
            {{ currency.code }} - {{ currency.name }}
          </option>
          <option value="all">Toutes les devises</option>
        </select>
      </div>
      <!------------------------------>

      <div class="col-md-12">
        <button type="submit" class="btn btn-primary">Convertir</button>
      </div>
    </form>

    <!-- CurrencyResult -->
    <currency-result
      :amount="amount"
      :fromCurrency="fromCurrency"
      :toCurrency="toCurrency"
      :result="result"
    />
    <!-------------------->
  </div>
</template>

<script>
import CurrencySearch from './CurrencySearch.vue';
import CurrencyResult from './CurrencyResult.vue';
import axios from 'axios';

const host = 'api.frankfurter.app';

export default {
  data() {
    return {
      amount: 1,
      fromCurrency: 'EUR',
      toCurrency: 'USD',
      currenciesList: [],
      result: null,
    };
  },
  mounted() {
    this.fetchCurrencies();
  },
  watch: {
    amount: 'convertCurrency',
    fromCurrency: 'convertCurrency',
    toCurrency: 'convertCurrency',
  },
  methods: {
    fetchCurrencies() {
      axios.get(`https://${host}/currencies`)
        .then((response) => {
          this.currenciesList = Object.keys(response.data).map(code => ({
            code,
            name: response.data[code],
          }));
        })
        .catch((error) => {
          console.error('Error fetching currencies:', error);
        });
    },
    
    selectCurrency(currency) {
      this.toCurrency = currency.code;
    },
    convertCurrency() {
      this.result = null; // Réinitialisation de result avant chaque conversion

      // Vérifier si fromCurrency est différent de toCurrency
      if (this.fromCurrency !== this.toCurrency) {
        if (this.toCurrency === 'all') {
          // Convertir dans toutes les devises
          const promises = this.currenciesList.map(currency => {
            // Vérifier si fromCurrency et currency.code sont différents avant de faire la requête
            if (this.fromCurrency !== currency.code) {
              return axios.get(`https://${host}/latest`, {
                params: {
                  amount: this.amount,
                  from: this.fromCurrency,
                  to: currency.code,
                },
              })
              .then(response => ({
                code: currency.code,
                rate: response.data.rates[currency.code],
              }))
              .catch(error => {
                console.error('Error converting currency:', error);
                return null;
              });
            } else {
              // Si les devises de départ et d'arrivée sont les mêmes, renvoyer une valeur nulle
              return null;
            }
          });

          Promise.all(promises)
            .then(results => {
              // Filtrer les résultats nuls (en cas d'erreur)
              results = results.filter(result => result !== null);
              const resultObject = Object.fromEntries(results.map(result => [result.code, result.rate]));
              this.result = resultObject;
            });
        } else {
          // Convertir dans une seule devise
          axios.get(`https://${host}/latest`, {
            params: {
              amount: this.amount,
              from: this.fromCurrency,
              to: this.toCurrency,
            },
          })
          .then(response => {
            // Si toCurrency n'est pas 'all', mettre à jour result avec un objet
            this.result = {
              [this.toCurrency]: response.data.rates[this.toCurrency]
            };
          })
          .catch(error => {
            console.error('Error converting currency:', error);
          });
        }
      } else {
        // Afficher un message d'erreur si fromCurrency est égal à toCurrency
        console.error('Cannot convert the same currency.');
        this.result = { error: 'Cannot convert the same currency.' };
      }
    },
  },
  components: {
    CurrencySearch,
    CurrencyResult,
  },
};
</script>
  
<style scoped>
.container {
  max-width: 600px;
  margin: auto;
  margin-top: 2%;
  padding: 20px;
  border-radius: 50px;
  background: #e0e0e0;
  box-shadow: inset 5px 5px 5px #5a5a5a,
              inset -5px -5px 5px #ffffff;
}

form {
  padding: 20px;
  
}

p,
h1,
label{
    color: black;
    text-align: center;
}


input,
select{
    width: 50%;
    background-color: #a1c6f7;
    box-sizing: border-box;

}
button {
  margin-top: 20px;
  background-color: darkblue;
  width: 100%;
}
button:hover{
    background-color: #a1c6f7 !important;
}

</style>