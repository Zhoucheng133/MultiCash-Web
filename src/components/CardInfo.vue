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
    <div>操作</div>
    <div class="flex items-center gap-2">
      <v-btn variant="tonal" @click="cardEdit">编辑</v-btn>
      <v-btn variant="tonal" :color="card.status==0 ? '' : 'red'" @click="statusHandler">
        {{ card.status==0 ? '启用' : '停用' }}
      </v-btn>
    </div>
  </div>
  <v-dialog v-model="confirm" max-width="300">
    <v-card :title="confirmTitle">
      <template v-slot:actions>
        <v-btn text="取消" @click="confirm=false"></v-btn>
        <v-btn text="确定" @click="statusAction"></v-btn>
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
import { ref } from 'vue';
import type { BankCard } from '../utils/types';
import useClipboard from 'vue-clipboard3';
import { copy } from '../utils/components/carddialog';
import { formatBalance, getCards } from '../utils/home';
import dayjs from 'dayjs';
import { updateStatus } from '../utils/components/cardinfo';
const { toClipboard } = useClipboard();

const snackbar = ref(false);
const text = ref('');

const confirmTitle = ref('');
const confirm = ref(false);

const cardEdit=()=>{
  // TODO 编辑
}

const statusAction=async ()=>{
  const response=await updateStatus(props.card.id, props.card.status);
  if(response.ok){
    text.value = '操作成功';
    snackbar.value = true;
    await getCards();
  }else{
    text.value = response.data;
    snackbar.value = true;
  }
  confirm.value = false;
}

const statusHandler=()=>{
  if(props.card.status==0){
    confirmTitle.value = '确定要启用此银行卡吗？';
  }else{
    confirmTitle.value = '确定要停用此银行卡吗？';
  }
  confirm.value = true;
}

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