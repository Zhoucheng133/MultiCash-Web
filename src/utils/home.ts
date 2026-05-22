import { RequestType, requestWithToken } from "./handler";
import Store from "./store";
import type { BankCard, RequestResponse } from "./types";

export async function getCards(): Promise<RequestResponse> {
  const response = await requestWithToken('/api/card/list', RequestType.get);
  
  if (!response.ok) {
    return response;
  }

  let cards = response.data as BankCard[];

  const store=Store();
  const uniqueBanks = new Set(
    cards.map(card => card.bank_name).filter(Boolean)
  );
  store.banks=['全部', ...uniqueBanks];
  const uniqueTypes = new Set(
    cards.map(card => card.card_type).filter(Boolean)
  );
  store.cardTypes = ['全部', ...uniqueTypes];

  let { searchKeyword, selectedBank, selectedCardType } = store;

  cards = cards.filter((card: BankCard) => {
    const matchKeyword = searchKeyword.length!=0
      ? (card.bin?.includes(searchKeyword) || 
         card.bin_suffix?.includes(searchKeyword) || 
         card.name?.includes(searchKeyword))
      : true; 
    const matchBank = selectedBank!='全部'
      ? card.bank_name?.includes(selectedBank) 
      : true;
    const matchType = selectedCardType!='全部'
      ? card.card_type?.includes(selectedCardType) 
      : true;
    return matchKeyword && matchBank && matchType;
  });

  store.cards = cards;

  return {
    ok: true,
    data: cards
  };
}