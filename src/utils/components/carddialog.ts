import { RequestType, requestWithToken } from "../handler";
import type { RequestResponse } from "../types";

export async function copy(id: string): Promise<RequestResponse>{
  return await requestWithToken(`/api/card/info?id=${id}`, RequestType.get);
}