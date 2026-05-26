<template>
  <v-dialog v-model="dialog" max-width="400">
    <v-card title="编辑银行卡">
      <template v-slot:actions>
        <v-btn text="取消" @click="dialog=false"></v-btn>
        <v-btn text="完成" @click="editAction" variant="flat" color='rgb(23, 105, 170)'></v-btn>
      </template>
      <v-card-text>
        <v-text-field variant="outlined" label="别名" v-model="cardName" hide-details density="compact" class="mt-5" ></v-text-field>
        <v-text-field variant="outlined" label="银行名" v-model="cardBankName" hide-details density="compact" class="mt-5" ></v-text-field>
        <v-text-field variant="outlined" label="银行卡号" v-model="cardBin" hide-details density="compact" class="mt-5" ></v-text-field>
        <v-number-input variant="outlined" label="余额" hide-details density="compact" class="mt-5" v-model="balance" :precision="2" control-variant="hidden" />
      </v-card-text>
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
import { type BankCard } from '../utils/types';
import { copy } from '../utils/components/carddialog';
import { RequestType, requestWithToken } from '../utils/handler';
import { getCards } from '../utils/home';

const snackbar=ref(false);
const text=ref('');

const editAction=async ()=>{
  const response=await requestWithToken(`/api/card/edit?id=${props.card.id}`, RequestType.post, {
    bin: cardBin.value,
    name: cardName.value,
    bank_name: cardBankName.value,
    balance: balance.value,
  });
  if (response.ok) {
    await getCards();
    text.value='编辑成功';
    snackbar.value=true;
    dialog.value=false;
  } else {
    text.value='编辑失败';
    snackbar.value=true;
  }
}

const props=defineProps<{
  card: BankCard
}>();

const dialog=ref(false);

const show=async ()=>{
  const res = await copy(props.card.id);
  if (res.ok) {
    cardBin.value = res.data.bin;
  }
  dialog.value=true;
};

const cardBin=ref(props.card.bin);
const cardName=ref(props.card.name);
const cardBankName=ref(props.card.bank_name);
const balance=ref(props.card.balance);

defineExpose({
  show
});
</script>