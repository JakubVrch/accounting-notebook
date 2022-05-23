export interface IEntry {
  account: string;
  note?: string;
  value: number;
  //TODO: Add proper fixed-decimal/currency type
}

export interface ITransaction {
  date: Date;
  note: string;
  entries: IEntry[];
}
