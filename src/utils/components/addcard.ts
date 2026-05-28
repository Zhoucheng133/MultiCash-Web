import { RequestType, requestWithToken } from "../handler";
import type { BankCard, RequestResponse } from "../types";

export async function getCardInfo(bin: string): Promise<RequestResponse>{
  bin=bin.slice(0,6);
  return await requestWithToken(`/api/card/bincheck?bin=${bin}`, RequestType.get)
}

export async function addCardHandler(card: BankCard): Promise<RequestResponse>{ 
  return await requestWithToken("/api/card/add", RequestType.post, {
    bin: card.bin,
    name: card.name,
    bank_name: card.bank_name,
    bank_code: card.bank_code,
    card_type: card.card_type,
    balance: card.balance,
  })
}