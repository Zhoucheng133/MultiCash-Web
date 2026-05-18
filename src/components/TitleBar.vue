<template>
  <div class="header">
    <div class="head_img">
      <img src="/icon.svg" alt="" width="40px" draggable="false">
      <div class="head_label">MultiCash</div>
    </div>
    <div class="actions">
      <v-btn variant="text" size="40">
        <v-icon :icon="dark ? 'far fa-moon' : 'far fa-sun'" size="15"></v-icon>
      </v-btn>
      <v-btn variant="text" size="40">
        <v-icon icon="far fa-user" size="15"></v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import Store from '../utils/store';
const store=Store();
const dark=storeToRefs(store).dark;

const props = defineProps(["isLogin"]);
</script>

<style scoped>
@import "../styles/components/titlebar.css";
</style>