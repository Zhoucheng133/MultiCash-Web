import { RequestType, requestWithToken } from "../handler";

export function addRecordHandler(
  cardId: string,
  targetCardId: string,
  type: number,
  amount: number,
  remark: string,
){
  // TODO...
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