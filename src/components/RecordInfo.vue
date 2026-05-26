<template>
  <v-dialog v-model="dialog" max-width="400">
    <v-card title="记录信息">
      <v-card-text>
        <div class="record_content">
          <div class="record_item_title">类型</div>
          <div class="record_item_content">
            <v-chip v-if="record[recordIndex].type==0" color="green">入账</v-chip>
            <v-chip v-else color="red">出账</v-chip>
          </div>
          <div class="record_item_title">金额</div>
          <div class="record_item_content">¥ {{ formatBalance(record[recordIndex].amount) }}</div>
          <div class="record_item_title">时间</div>
          <div class="record_item_content">{{ dayjs.unix(record[recordIndex].created_at).format("YYYY/MM/DD") }}</div>
          <div class="record_item_title">备注</div>
          <div class="record_item_content">{{ record[recordIndex].remark }}</div>
          <div class="record_item_title">操作</div>
          <div class="flex items-center gap-2">
            <v-btn variant="tonal" @click="recordEdit">编辑</v-btn>
            <v-btn variant="tonal" v-if="record[recordIndex].status==1" color="red" @click="removeAction">移除</v-btn>
          </div>
        </div>
      </v-card-text>
      <template v-slot:actions>
        <v-btn text='完成' @click="close" variant="flat" color='rgb(23, 105, 170)'></v-btn>
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
import type { RecordRow } from '../utils/types';
import { formatBalance } from '../utils/home';
import dayjs from 'dayjs';
import { removeHandler } from '../utils/components/recordinfo';

const dialog=ref(false);

const snackbar=ref(false);
const text=ref("");

const recordEdit=()=>{
  // TODO 编辑
}

const removeAction=async ()=>{
  const response=await removeHandler(props.record[props.recordIndex]);
  if(response.ok){
    emit("reloadRecords");
    snackbar.value=true;
    text.value="操作成功";
    close();
  }else{
    text.value=response.data;
    snackbar.value=true;
  }
};

const show=()=>{
  dialog.value=true;
};

const close=()=>{
  dialog.value=false;
};

const props=defineProps<{
  record: RecordRow[];
  recordIndex: number;
}>();

defineExpose({
  show,
})

const emit = defineEmits([ "reloadRecords" ]);
</script>

<style scoped>
.record_content{
  width: 100%;
  display: grid;
  grid-template-columns: 120px auto;
  gap: 10px;
  align-items: center;
  user-select: none;
  -webkit-user-select: none;
}
</style>