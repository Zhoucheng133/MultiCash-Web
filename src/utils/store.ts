import { defineStore } from "pinia";
import { ref } from "vue";
import type { BankCard } from "./types";

export default defineStore('store', ()=>{
  const searchKeyword=ref("");

  const banks=ref<string[]>(['全部']);
  const selectedBank=ref<string>('全部');

  const cardTypes=ref<string[]>(['全部']);
  const selectedCardType=ref<string>('全部');

  const cards=ref<BankCard[]>([]);

  return {
    searchKeyword,
    banks,
    selectedBank,
    cardTypes,
    selectedCardType,
    cards
  }
})