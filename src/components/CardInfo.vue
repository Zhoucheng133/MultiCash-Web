<template>
  <div class="info_item">
    <div>发行银行</div>
    <div>{{ card.bank_name }}</div>
    <div>发行银行代码</div>
    <div>{{ card.bank_code }}</div>
    <div>银行卡号</div>
    <div class="flex-col items-center gap-2">
      <div>•••• •••• {{ card.bin_suffix }}</div>
      <v-btn variant="tonal" @click="copyCardId">复制卡号</v-btn>
    </div>
    <div>卡组织</div>
    <div>{{ card.card_type }}</div>
    <div>余额</div>
    <div>¥ {{ formatBalance(card.balance) }}</div>
    <div>状态</div>
    <div>
      <v-chip v-if="card.status==1" color="green" class="select-none cursor-pointer">启用</v-chip>
      <v-chip v-else color="red" class="select-none cursor-pointer">停用</v-chip>
    </div>
    <div>创建于</div>
    <div>{{ dayjs.unix(card.created_at).format("YYYY/MM/DD") }}</div>
    <div>上次修改</div>
    <div>{{ dayjs.unix(card.updated_at).format("YYYY/MM/DD") }}</div>
  </div>
  <v-snackbar v-model="snackbar">
    {{ text }}
    <template v-slot:actions>
      <v-btn color="pink" variant="text" @click="snackbar = false">关闭</v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { BankCard } from '../utils/types';
import useClipboard from 'vue-clipboard3';
import { copy } from '../utils/components/carddialog';
import { formatBalance } from '../utils/home';
import dayjs from 'dayjs';
const { toClipboard } = useClipboard();

const snackbar = ref(false);
const text = ref('');

const copyCardId = async () => {
  const res = await copy(props.card.id);
  if (res.ok) {
    text.value = '复制成功';
    snackbar.value = true;
    toClipboard(res.data.bin);
  } else {
    text.value = res.data;
    snackbar.value = true;
  }
};

const props = defineProps<{
  card: BankCard;
}>();
</script>

<style scoped>
@import "../styles/components/cardinfo.css";
</style>