<template>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/water.css@2/out/water.css">
  <nav>
    <router-link to="/">Accueil</router-link>
    <router-link to="/mentions-legales">Mentions Légales</router-link>
  </nav>
  <div id="app">
    <router-view></router-view>
  </div>
</template>



<style>
nav {
  padding: 10px;
  display: flex;
}

a.router-link-active.router-link-exact-active{
  margin-right: 10px;
  color: white;
  text-decoration: underline;
}

a{
  margin-right: 10px;
}

router-link:hover {
  text-decoration: underline;
}
</style>