import { RequestType, requestWithToken } from "../handler";

export async function addRecordHandler(
  cardId: string,
  targetCardId: string,
  type: number,
  amount: number,
  remark: string,
){
  if(targetCardId != '0'){
    const response=await requestWithToken(
      '/api/record/add',
      RequestType.post,
      {
        card_id: targetCardId,
        type: type==0 ? 1 : 0,
        amount: amount,
        remark: remark,
      }
    );
    if(!response.ok){
      return response;
    }
  }
  return requestWithToken(
    '/api/record/add',
    RequestType.post,
    {
      card_id: cardId,
      type: type,
      amount: amount,
      remark: remark,
    }
  );
}