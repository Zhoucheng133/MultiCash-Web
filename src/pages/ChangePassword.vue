<template>
  <TitleBar :is-login="true" />
  <div class="main">

  </div>
</template>

<script setup lang="ts">
import TitleBar from "../components/TitleBar.vue";

document.title = "MultiCash | 修改密码";
</script>

<style scoped>
@import "../styles/pages/password.css";
</style>