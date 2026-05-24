<template>
  <v-dialog v-model="dialog" max-width="400">
    <v-card title="记录信息">
      <v-card-text>
        {{ record[recordIndex] }}
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

const dialog=ref(false);

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