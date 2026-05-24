<template>
  <div class="content">
    <v-data-table :items="records" :headers="headers">
      <template v-slot:item.type="{ item }">
        <v-chip v-if="item.type==0" color="green">入账</v-chip>
        <v-chip v-else color="red">出账</v-chip>
      </template>
      <template v-slot:item.amount="{ item }">
        ¥ {{ formatBalance(item.amount) }}
      </template>
      <template v-slot:item.created_at="{ item }">
        {{ dayjs.unix(item.created_at).format("YYYY/MM/DD") }}
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs';
import { formatBalance } from '../utils/home';
import type { BankCard, RecordRow } from '../utils/types';

const headers=[
  { title: '类型', value: 'type' },
  { title: '金额', value: 'amount' },
  { title: '时间', value: 'created_at' } 
]

const props = defineProps<{
  card: BankCard;
  records: RecordRow[];
}>();
</script>

<style scoped>
@import "../styles/components/cardrecord.css";
</style>