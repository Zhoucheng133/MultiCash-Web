<template>
  <v-dialog v-model="dialog" max-width="500">
    <v-card title="添加银行卡">
      <template v-slot:actions>
        <v-btn text="上一步" :disabled="step === 1" @click="prevStep"></v-btn>
        <v-spacer></v-spacer>
        <v-btn text="取消" @click="close"></v-btn>
        <v-btn :text="step === 2 ? '完成' : '下一步'" @click="nextStep" color='rgb(23, 105, 170)' variant="flat"></v-btn>
      </template>
      <v-stepper
        hide-actions
        v-model="step"
        flat
        :items="['银行卡号', '账户信息']"
      >
        <template v-slot:item.1>
          <v-card title="填写你的银行卡号" flat>
            <v-text-field variant="outlined" hide-details density="compact" class="mt-2" v-model="input.bin"/>
            <div class="tip mt-2">
              你的完整卡号信息只会保存在本地，但是务必确保使用HTTPS请求本页面
            </div>
          </v-card>
        </template>

        <template v-slot:item.2>
          <v-card title="填写你的账户信息" flat>
            <v-text-field variant="outlined" label="别名" hide-details density="compact" class="mt-2" v-model="input.name"/>
            <v-text-field variant="outlined" label="银行名" hide-details density="compact" class="mt-5" v-model="input.bank_name"/>
            <v-text-field variant="outlined" label="银行代码" hide-details density="compact" class="mt-5" v-model="input.bank_code" disabled/>
            <v-text-field variant="outlined" label="类型" hide-details density="compact" class="mt-5" v-model="input.card_type" disabled/>
            <v-number-input variant="outlined" label="余额" hide-details density="compact" class="mt-5" v-model="input.balance" :precision="2" control-variant="hidden" />
          </v-card>
        </template>
      </v-stepper>
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
import { type BankCard, type BankCardInfo } from '../utils/types';
import { addCardHandler, getCardInfo } from '../utils/components/addcard';


const step = ref(1)
const snackbar = ref(false);
const text = ref('');

const input = ref<BankCard>({
  id: '',
  bin: '',
  bin_suffix: '',
  name: '',
  bank_name: '',
  bank_code: '',
  card_type: '',
  status: 1,
  balance: 0,
  created_at: 0,
  updated_at: 0
});

const nextStep = async () => {
  if (step.value == 1) {
    input.value.bin = input.value.bin.replaceAll(" ", "");
    
    const cardRegex = /^\d{15,19}$/;

    if(!input.value.bin.match(cardRegex)){
      snackbar.value = true;
      text.value = '银行卡号不合法';
      return;
    }

    const cardInfo=await getCardInfo(input.value.bin);
    if(cardInfo.ok){
      const cardData=cardInfo.data as BankCardInfo;
      input.value.bin_suffix = input.value.bin.slice(-4);
      input.value.bank_name = cardData.issuer;
      input.value.bank_code = cardData.issuer.length==0 ? 'UNKOWN' : cardData.issuer;
      input.value.card_type = cardData.brand;
      step.value++;
    }else{
      snackbar.value = true;
      text.value = '检查银行卡信息错误';
    }
  } else {
    const response=await addCardHandler(input.value);
    if(response.ok){
      close();
      reload();
    }else{
      snackbar.value = true;
      text.value = response.data;
    }
  }
}

const prevStep = () => {
  if (step.value > 1) {
    step.value--
  }
}

const dialog = ref(false);
const open=()=>{
  dialog.value=true;
}
const close=()=>{
  step.value=1;
  dialog.value=false;
  input.value={
    id: '',
    bin: '',
    bin_suffix: '',
    name: '',
    bank_name: '',
    bank_code: '',
    card_type: '',
    status: 1,
    balance: 0,
    created_at: 0,
    updated_at: 0
  };
}

defineExpose({
  open,
  close
})

const emit = defineEmits([ "reload" ]);

function reload(){
  emit("reload");
}
</script>

<style scoped>
.tip{
  font-size: 13px;
  color: grey;
}
</style>