import { RequestType, requestWithToken } from "../handler";
import type { RequestResponse } from "../types";

export async function updateStatus(id: string, status: number): Promise<RequestResponse>{
  return await requestWithToken(
    `/api/card/edit?id=${id}`, 
    RequestType.post, 
    {
      status: status==1 ? 0 : 1
    }
  )
}