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
  status: number;
  balance: number;
  created_at: number;
  updated_at: number;
}

export interface BankCardInfo{
  bank_name: string;
  bin: string;
  card_brand: string; // 这是指MasterCard/VISA/UnionPay
  card_level: string;
  card_type: string;  // 这里指的是储蓄卡和信用卡，不使用该参数
  country_code: string;
  country_iso3: string;
  country_name: string;
  currency: string;
}