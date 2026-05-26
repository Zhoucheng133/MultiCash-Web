import { RequestType, requestWithToken } from "../handler";
import type { RequestResponse } from "../types";
import Store from "../store";

export async function copy(id: string): Promise<RequestResponse>{
  return await requestWithToken(`/api/card/info?id=${id}`, RequestType.get);
}

export async function getRecord(cardId: string): Promise<RequestResponse> {

  let requestQuery = `/api/record/list?card_id=${cardId}`;
  const store=Store();
  if(store.recordFilter.type!=undefined){
    requestQuery += `&type=${store.recordFilter.type}`;
  }

  return await requestWithToken(
    requestQuery, 
    RequestType.get
  );
}