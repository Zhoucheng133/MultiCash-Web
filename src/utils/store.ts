import { defineStore } from "pinia";
import { ref } from "vue";

export default defineStore('store', ()=>{
  const searchKeyword=ref("");

  const banks=ref<string[]>(['全部']);
  const selectedBank=ref<string>('全部');

  const cardTypes=ref<string[]>(['全部']);
  const selectedCardType=ref<string>('全部');

  return {
    searchKeyword,
    banks,
    selectedBank,
    cardTypes,
    selectedCardType
  }
})