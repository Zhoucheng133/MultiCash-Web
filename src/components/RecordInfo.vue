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
            <v-btn variant="tonal" :color="record[recordIndex].status==0 ? '' : 'red'" @click="statusHandler">
              {{ record[recordIndex].status==0 ? '启用' : '移除' }}
            </v-btn>
          </div>
        </div>
      </v-card-text>
      <template v-slot:actions>
        <v-btn text='完成' @click="close" variant="flat" color='rgb(23, 105, 170)'></v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { RecordRow } from '../utils/types';
import { formatBalance } from '../utils/home';
import dayjs from 'dayjs';

const dialog=ref(false);

const recordEdit=()=>{
  // TODO 编辑
}

const statusHandler=()=>{
  // TODO 停用
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
@import "../styles/components/recordinfo.css";
</style>