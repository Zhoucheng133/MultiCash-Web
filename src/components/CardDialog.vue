<template>
  <v-dialog v-model="dialog" max-width="500" scrollable>
    <v-card :title="card.name">
      <v-tabs v-model="tab" color="primary">
        <v-tab value="record">交易记录</v-tab>
        <v-tab value="info">卡片信息</v-tab>
      </v-tabs>
      <v-divider></v-divider>
      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="record">
          <CardRecord :card="card" :records="record" @reload-records="reloadRecords" />
        </v-tabs-window-item>
        <v-tabs-window-item value="info">
          <v-sheet class="pa-5">
            <CardInfo :card="card"/>
          </v-sheet>
        </v-tabs-window-item>
      </v-tabs-window>
      <template v-slot:actions>
        <v-btn text="添加交易记录" @click="addRecordRef.showAdd"></v-btn>
        <v-btn text="完成" @click="close" variant="flat" color='rgb(23, 105, 170)'></v-btn>
      </template>
    </v-card>
  </v-dialog>
  <v-snackbar v-model="snackbar">
    {{ text }}
    <template v-slot:actions>
      <v-btn color="pink" variant="text" @click="snackbar = false">关闭</v-btn>
    </template>
  </v-snackbar>
  <AddRecord :card="card" ref="addRecordRef" @reload-records="reloadRecords" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { BankCard, RecordRow } from '../utils/types';
import CardInfo from './CardInfo.vue';
import CardRecord from './CardRecord.vue';
import { getRecord } from '../utils/components/carddialog';
import AddRecord from './AddRecord.vue';
import { getCards } from '../utils/home';
import Store from '../utils/store.ts';

const store = Store();

const props = defineProps<{
  card: BankCard;
}>();

const record= ref<RecordRow[]>([]);

const addRecordRef=ref();

const snackbar = ref(false);
const text = ref('');

const dialog = ref(false);
const tab = ref('record');

const reloadRecords=async ()=>{
  const response=await getRecord(props.card.id);
  if(response.ok){
    record.value=response.data as RecordRow[];
  }else{
    snackbar.value=true;
    text.value=response.data;
  }
  await getCards();
}

const close=async () => {
  dialog.value = false;
  store.resetFilter();
};

const show=async () => {
  dialog.value = true;
  const response=await getRecord(props.card.id);
  if(response.ok){
    record.value=response.data as RecordRow[];
  }else{
    snackbar.value=true;
    text.value=response.data;
  }
};

defineExpose({
  show,
});

</script>

<style scoped>
</style>