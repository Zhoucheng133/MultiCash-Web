<template>
  <div :class="['card', card.status==0 ? 'card_disabled' : '']" @click="showDialog">
    <div class="bank-info">
      <div class="bank-logo-placeholder">
        <div class="logo-icon">✦</div>
      </div>
      <div class="bank-name">
        <div class="card-name-text">{{ card.name }}</div>
        <div>
          <v-chip v-if="card.status==0" color="red" variant="flat" density="compact">停用</v-chip>
        </div>
      </div>
      <div class="card-category">DEBIT</div>
    </div>

    <div class="card-number">
      <span class="number-group">••••</span>
      <span class="number-group">••••</span>
      <span class="number-group">{{ card.bin_suffix }}</span>
    </div>

    <div class="card-footer">
      <div class="meta-item">
        <span class="meta-label">BANK</span>
        <span class="meta-value">{{ card.bank_name }}</span>
      </div>

      <div class="meta-item">
        <span class="meta-label">BALANCE</span>
        <span class="meta-value" @click.stop="showBalance=!showBalance">
          <div v-if="showBalance">¥ {{ formatBalance(card.balance) }}</div>
          <div v-else>¥ ***</div>
        </span>
      </div>
      <div class="logo">
        <img :src="logoHandler()" alt="" srcset="" width="50">
      </div>
    </div>
  </div>
  <CardDialog :card="card" ref="cardDialogRef" />
</template>


<script lang="ts" setup>
import { ref } from 'vue';
import { formatBalance } from '../utils/home';
import { type BankCard } from '../utils/types'
import CardDialog from './CardDialog.vue';

const cardDialogRef=ref();

const showBalance=ref(false);

const showDialog=()=>{
  cardDialogRef.value.show();
}

const props = defineProps<{
  card: BankCard
}>()

const logoHandler=()=>{
  switch (props.card.card_type) {
    case "万事达":
      return "/mc-logo.svg";
    case "银联":
      return "/unionpay-logo.svg";
    case "VISA":
      return "/visa-logo.png";
    case "美国运通":
      return "/am-logo.svg";
    case "JCB":
      return "/jcb-logo.svg";
    default:
      break;
  }
}

</script>

<style scoped>
@import "../styles/components/carditem.css";
</style>