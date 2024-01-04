import { createRouter, createWebHistory } from 'vue-router';
import CurrencyConverter from './components/CurrencyConverter.vue';
import MentionsLegales from './components/MentionsLegales.vue';

const routes = [
  { path: '/', component: CurrencyConverter },
  { path: '/mentions-legales', component: MentionsLegales },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export { router, routes };