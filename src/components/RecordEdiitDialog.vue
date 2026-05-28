<template>
  <v-dialog max-width="300" v-model="dialog">
    <v-card title="编辑交易记录">
      <template v-slot:actions>
        <v-btn text="取消" @click="dialog=false"></v-btn>
        <v-btn text="完成" @click="editAction" variant="flat" color='rgb(23, 105, 170)'></v-btn>
      </template>
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
import { type RecordRow, type RequestResponse } from '../utils/types';
import { RequestType, requestWithToken } from '../utils/handler';

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

const dialog=ref(false);

const snackbar=ref(false);
const text=ref('');

const selectedRecordType=ref(0);
const amount=ref(0);
const remark=ref("");
const id=ref('');

async function editHandler(): Promise<RequestResponse> {
  return await requestWithToken(`/api/record/edit?id=${id.value}`, RequestType.post, {
    type: selectedRecordType.value,
    amount: amount.value,
    remark: remark.value
  })
}

const editAction=async ()=>{
  const response=await editHandler();
  if (response.ok) {
    text.value='编辑成功';
    snackbar.value=true;
    dialog.value=false;
    emit('reload');
  } else {
    text.value=response.data;
    snackbar.value=true;
  }
}

const show=(record: RecordRow)=>{
  dialog.value=true;
  id.value=record.id;
  selectedRecordType.value=record.type;
  amount.value=record.amount;
  remark.value=record.remark;
}

defineExpose({
  show
})

const emit=defineEmits(['reload'])

</script>

<style scoped>
.content{
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 15px;
}
</style>