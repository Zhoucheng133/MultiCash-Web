<template>
  <TitleBar :is-login="true" />
  <div class="main"></div>
</template>

<script lang="ts" setup>
import TitleBar from '../components/TitleBar.vue';
</script>

<style scoped>
@import "../styles/pages/home.css";
</style>