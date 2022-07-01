export interface IEntryResponse {
  account: string;
  note?: string;
  value: number; //TODO:Add proper Currency type
}

export interface ITransactionResponse {
  date: string;
  note: string;
  entries: IEntryResponse[];
}
