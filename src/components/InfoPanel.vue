<template>
  <div class="panel">
    <div class="title">{{ props.title }}</div>
    <div :class="['content', props.hide ? 'hide' : '']" @click="show=!show">
      <div v-if="!props.hide || show">{{ props.content }}</div>
      <div v-else-if="props.hide && !show">¥ ***</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const props = defineProps(["title", "content", "hide"]);

const show=ref(false);
</script>

<style scoped>
@import "../styles/components/infopanel.css";
</style>