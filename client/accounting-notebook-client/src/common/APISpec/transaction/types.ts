export interface IEntryResponse {
  account: string;
  note?: string;
  value: string; //TODO:Add proper Currency type
}

export interface ITransactionResponse {
  date: string; //ISO Date
  note: string;
  entries: IEntryResponse[];
}
