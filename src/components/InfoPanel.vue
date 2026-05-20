<template>
  <div class="panel shadow-xl">
    <div class="title">{{ props.title }}</div>
    <div class="content">{{ props.content }}</div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps(["title", "content"]);
</script>

<style scoped>
@import "../styles/components/infopanel.css";
</style>