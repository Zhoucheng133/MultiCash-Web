export interface RequestResponse{
  ok: boolean;
  data: any;
}

export interface BankCard{
  id: string;
  bin: string;
  bin_suffix: string;
  name: string;
  bank_name: string;
  bank_code: string;
  card_type: string;  // 这是指的是MaterCard/VISA/UnionPay
  status: number; // 0表示禁用，1表示正常
  balance: number;
  created_at: number;
  updated_at: number;
}

export interface BankCardInfo{
  bin: string;
  brand: string; // 这是指MasterCard/VISA/UnionPay
  category: string;
  type: string;  // 这里指的是储蓄卡和信用卡，不使用该参数
  issuer: string;
  country: string;
}

export interface RecordRow{
  id: string;
  card_id: string;
  type: number; // type: 0表示入账，1表示出账
  amount: number;
  remark: string;
  status: number;
  created_at: number;
}