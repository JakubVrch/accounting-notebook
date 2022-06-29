export interface IEntryResponse {
  account: string;
  note?: string;
  value: number; //TODO:Add proper Currency type
}

export interface ITransactionResponse {
  date: Date;
  note: string;
  entries: IEntryResponse[];
}
