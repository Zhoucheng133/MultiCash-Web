<template>
  <v-dialog v-model="props.showAddCardDialog" max-width="500">
    <v-card title="添加银行卡">
      <template v-slot:actions>
        <v-btn class="ms-auto" text="完成" @click="close"></v-btn>
      </template>
      <v-card-text>
        测试
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>

const props=defineProps(["showAddCardDialog"]);
const emit = defineEmits([ "close" ]);
const close=()=>{
  emit("close");
}
</script>