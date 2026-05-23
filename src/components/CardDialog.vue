<template>
  <v-dialog v-model="dialog" max-width="500">
    <v-card :title="card.name">
      <v-tabs v-model="tab" color="primary">
        <v-tab value="record">交易记录</v-tab>
        <v-tab value="info">卡片信息</v-tab>
      </v-tabs>
      <v-divider></v-divider>
      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="record">
          <v-sheet class="pa-5" color="purple">One</v-sheet>
        </v-tabs-window-item>
        <v-tabs-window-item value="info">
          <v-sheet class="pa-5">
            <CardInfo :card="card"/>
          </v-sheet>
        </v-tabs-window-item>
      </v-tabs-window>
      <template v-slot:actions>
        <v-btn text="完成" @click="dialog=false"></v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { BankCard } from '../utils/types';
import CardInfo from './CardInfo.vue';

const props = defineProps<{
  card: BankCard;
}>();

const dialog = ref(false);
const tab = ref('info');

const show=() => {
  dialog.value = true;
};

defineExpose({
  show,
});

</script>

<style scoped>
</style>