import { RequestType, requestWithToken } from "../handler";
import type { RecordRow, RequestResponse } from "../types";

export async function removeHandler(record: RecordRow): Promise<RequestResponse> {
  return await requestWithToken(
    `/api/record/del?id=${record.id}`,
    RequestType.delete
  )
}