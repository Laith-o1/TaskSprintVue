<script setup>
import { RouterLink, RouterView } from 'vue-router'
import TheNavBar from './components/TheNavBar.vue'
</script>

<template>
  <TheNavBar v-if="$route.fullPath != '/'"></TheNavBar>
  <RouterView />
</template>
<style>

</style>
