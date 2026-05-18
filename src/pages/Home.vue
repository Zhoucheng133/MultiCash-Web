<template>
  <TitleBar :is-login="true" />
  <div class="main"></div>
</template>

<script lang="ts" setup>
import TitleBar from '../components/TitleBar.vue';

document.title = "MultiCash | 主页";
</script>

<style scoped>
@import "../styles/pages/home.css";
</style>