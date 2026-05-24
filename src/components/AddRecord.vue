<template>
  <v-dialog v-model="dialog" max-width="350">
    <v-card title="添加交易记录">
      <v-card-text>
        <div class="content">
          <v-select
            label="类型"
            hide-details
            density="compact"
            :items="recordTypes"
            variant="outlined"
            v-model="selectedRecordType"
            item-title="text"
            item-value="value"
          ></v-select>
          <v-select
            :label="selectedRecordType===0 ? '来自' : '转给'"
            hide-details
            density="compact"
            :items="selectCards"
            variant="outlined"
            item-title="name"
            item-value="id"
            v-model="selectedCard"
            :item-props="itemProps"
          ></v-select>
          <v-number-input
            label="金额"
            hide-details
            density="compact"
            variant="outlined"
            control-variant="hidden"
            :precision="2"
            v-model="amount"
          ></v-number-input>
          <v-text-field
            label="备注"
            hide-details
            density="compact"
            variant="outlined"
            v-model="remark"
          ></v-text-field>
        </div>
      </v-card-text>
      <template v-slot:actions>
        <v-btn text="取消" @click="close"></v-btn>
        <v-btn text="添加" @click="addRecordAction" variant="flat" color='rgb(23, 105, 170)'></v-btn>
      </template>
    </v-card>
  </v-dialog>
  <v-snackbar v-model="snackbar">
    {{ text }}
    <template v-slot:actions>
      <v-btn color="pink" variant="text" @click="snackbar = false">关闭</v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import type { BankCard } from '../utils/types';
import Store from '../utils/store';
import { storeToRefs } from 'pinia';
import { addRecordHandler } from '../utils/components/addrecord';
const store=Store();
const { cards } = storeToRefs(store);

const snackbar=ref(false);
const text=ref('');

const addRecordAction=async ()=>{
  await addRecordHandler(
    props.card.id,
    selectedCard.value,
    selectedRecordType.value,
    amount.value,
    remark.value
  )
  emit("reloadRecords");
  text.value="添加成功";
  snackbar.value=true;
  dialog.value=false;
  close();
}

const close=()=>{
  dialog.value=false;
  amount.value=0;
  selectedCard.value='0';
  selectedRecordType.value=0;
  remark.value='';
}

const selectedCard=ref('0');
const amount=ref(0);
const remark=ref('');

function itemProps (item: any) {
  return {
    title: item.name,
    subtitle: item.bin_suffix,
  }
}
const selectCards=computed(()=>{
  return [
    {
      id: '0',
      name: "其它",
      bin_suffix: ''
    },
    ...cards.value,
  ]
})

const dialog=ref(false);

const selectedRecordType=ref(0);

const recordTypes=ref([
  {
    text: '入账',
    value: 0
  },
  {
    text: '出账',
    value: 1
  }
])

const showAdd=()=>{
  dialog.value=true;
}
const props = defineProps<{
  card: BankCard;
}>()
defineExpose({
  showAdd
})

const emit = defineEmits([ "reloadRecords" ]);
</script>

<style scoped>
@import "../styles/components/addrecord.css";
</style>