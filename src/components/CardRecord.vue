<template>
  <div class="content">
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
  <RecordInfo :record="records" :recordIndex="recordIndex" ref="recordInfoRef" @reloadRecords="reloadRecords" />
</template>

<script lang="ts" setup>
import dayjs from 'dayjs';
import { formatBalance } from '../utils/home';
import type { BankCard, RecordRow } from '../utils/types';
import { ref } from 'vue';
import RecordInfo from './RecordInfo.vue';

const recordIndex=ref(0);
const recordInfoRef=ref();

const showInfo=(_: any, row: any)=>{
  recordIndex.value=row.index;
  recordInfoRef.value.show();
  
}

const reloadRecords=()=>{
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
@import "../styles/components/cardrecord.css";
</style>