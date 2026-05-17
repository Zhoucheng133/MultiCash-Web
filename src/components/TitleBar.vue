<template>
  <div class="header">
    <div class="head_img">
      <img src="/icon.svg" alt="" width="40px" draggable="false">
      <div class="head_label">MultiCash</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps(["isLogin"])
</script>

<style scoped>
@import "../styles/components/titlebar.css";
</style>