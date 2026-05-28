<template>
  <div class="content">
    <div class="record_filter">
      <v-select
        label="类型"
        hide-details
        :items="typeSelectItems"
        v-model="selectedRecordType"
        item-title="text"
        item-value="value"
        @update:modelValue="filterChanged"
      >
      </v-select>
    </div>
    <v-data-table :items="records" :headers="headers" @click:row="showInfo">
      <template v-slot:item.type="{ item }">
        <v-chip v-if="item.type==0" color="green" :style="item.status==0 ? {'text-decoration': 'line-through'} : {}">入账</v-chip>
        <v-chip v-else color="red" :style="item.status==0 ? {'text-decoration': 'line-through'} : {}">出账</v-chip>
      </template>
      <template v-slot:item.amount="{ item }">
        <div :style="item.status==0 ? {'text-decoration': 'line-through'} : {}">
          ¥ {{ formatBalance(item.amount) }}
        </div>
      </template>
      <template v-slot:item.created_at="{ item }">
        <div :style="item.status==0 ? {'text-decoration': 'line-through'} : {}">
          {{ dayjs.unix(item.created_at).format("YYYY/MM/DD") }}
        </div>
      </template>
    </v-data-table>
  </div>
  <RecordInfoDialog :record="records" :recordIndex="recordIndex" ref="recordInfoRef" @reloadRecords="reloadRecords" />
</template>

<script lang="ts" setup>
import dayjs from 'dayjs';
import { formatBalance } from '../utils/home';
import type { BankCard, RecordRow } from '../utils/types';
import { ref } from 'vue';
import RecordInfoDialog from './RecordInfoDialog.vue';
import Store from '../utils/store.ts';
import { storeToRefs } from 'pinia';
const store=Store();

const { recordFilter }=storeToRefs(store)

const recordIndex=ref(0);
const recordInfoRef=ref();

const typeSelectItems=[{ text: "全部", value: -1 }, { text: "入账", value: 0 }, { text: "出账", value: 1 }]
const selectedRecordType=ref<number>(-1);

const showInfo=(_: any, row: any)=>{
  recordIndex.value=row.index;
  recordInfoRef.value.show();
  
}

const reloadRecords=()=>{
  emit("reloadRecords");
}

const filterChanged=()=>{
  recordFilter.value.type=selectedRecordType.value==-1 ? undefined : selectedRecordType.value;
  emit("reloadRecords");
}

const headers=[
  { title: '类型', value: 'type' },
  { title: '金额', value: 'amount' },
  { title: '时间', value: 'created_at' } 
]

const props = defineProps<{
  card: BankCard;
  records: RecordRow[];
}>();

const emit = defineEmits([ "reloadRecords" ]);
</script>

<style scoped>
.content{
  overflow-y: auto;
  max-height: 400px;
  user-select: none;
  -webkit-user-select: none;
}

.record_filter{
  position: sticky;
  top: 0;
  background-color: white;
  width: 100%;
  z-index: 20;
  display: flex;
}
</style>