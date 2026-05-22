<template>
  <div class="card">
    <div class="card-shimmer"></div>
    <div class="bank-info">
      <div class="bank-logo-placeholder">
        <div class="logo-icon">✦</div>
      </div>
      <span class="bank-name">{{ card.name }}</span>
      <div class="card-category">DEBIT</div>
    </div>

    <div class="card-number">
      <span class="number-group">{{ card.bin }}</span>
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
        <span class="meta-value">¥ {{ formatBalance(card.balance) }}</span>
      </div>
      <div class="logo">121</div>
    </div>
  </div>
</template>


<script lang="ts" setup>
import { formatBalance } from '../utils/home';
import { type BankCard } from '../utils/types'

const props = defineProps<{
  card: BankCard
}>()

</script>

<style scoped>
@import "../styles/components/carditem.css";
</style>