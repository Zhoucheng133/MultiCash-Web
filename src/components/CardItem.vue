<template>
  {{ card.bank_name }}
</template>

<script lang="ts" setup>
import { type BankCard } from '../utils/types'
const props = defineProps<{
  card: BankCard
}>()
</script>