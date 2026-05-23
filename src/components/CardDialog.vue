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
                <v-chip v-if="card.status==1" color="green">启用</v-chip>
                <v-chip v-else color="red">停用</v-chip>
              </div>
              <div>创建于</div>
              <div>{{ dayjs.unix(card.created_at).format("YYYY/MM/DD") }}</div>
              <div>上次修改</div>
              <div>{{ dayjs.unix(card.updated_at).format("YYYY/MM/DD") }}</div>
            </div>
          </v-sheet>
        </v-tabs-window-item>
      </v-tabs-window>
      <template v-slot:actions>
        <v-btn text="完成" @click="dialog=false"></v-btn>
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

<script setup lang="ts">
import { ref } from 'vue';
import type { BankCard } from '../utils/types';
import { formatBalance } from '../utils/home';
import dayjs from 'dayjs';
import { copy } from '../utils/components/carddialog';
import useClipboard from 'vue-clipboard3';
const { toClipboard } = useClipboard();

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

const dialog = ref(false);
const tab = ref('info');
const snackbar = ref(false);
const text = ref('');

const show=() => {
  dialog.value = true;
};

defineExpose({
  show,
});

</script>

<style scoped>
@import "../styles/components/cardinfo.css";
</style>