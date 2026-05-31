import { defineStore } from "pinia";
import { ref } from "vue";
import type { BankCard } from "./types";

interface RecordFilter{
  type?: number;
  remark?: string;
  amount?: number;
  amount_compare?: string;  // gt, lt, eq
  created_at?: string;
  created_at_compare?: string;   // gt, lt, eq
  status?: number;  // 0表示禁用，1表示正常
}

export default defineStore('store', ()=>{
  const searchKeyword=ref("");

  const banks=ref<string[]>(['全部']);
  const selectedBank=ref<string>('全部');

  const cardTypes=ref<string[]>(['全部']);
  const selectedCardType=ref<string>('全部');

  const hideDisabled=ref(true);

  const cards=ref<BankCard[]>([]);

  const recordFilter=ref<RecordFilter>({
    type: undefined,
    remark: undefined,
    amount: undefined,
    amount_compare: undefined,
    created_at: undefined,
    created_at_compare: undefined,
    status: undefined
  });

  const resetFilter=()=>{
    recordFilter.value={
      type: undefined,
      remark: undefined,
      amount: undefined,
      amount_compare: undefined,
      created_at: undefined,
      created_at_compare: undefined,
      status: undefined
    };
  }

  return {
    searchKeyword,
    banks,
    selectedBank,
    cardTypes,
    selectedCardType,
    cards,
    recordFilter,
    resetFilter,
    hideDisabled
  }
})