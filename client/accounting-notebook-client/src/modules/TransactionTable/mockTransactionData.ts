import { ITransaction } from "./types";

export const mockTransactions: ITransaction[] = [
  {
    date: new Date("2019-01-16"),
    note: "Text 1",
    entries: [
      {
        account: "Liabilities",
        note: "Text 1;",
        value: 1024,
      },
      {
        account: "Costs",
        note: "Text 1;",
        value: -1024,
      },
    ],
  },
  {
    date: new Date("2019-01-17"),
    note: "Text 2",
    entries: [
      {
        account: "Liabilities",
        value: -512,
      },
      {
        account: "Costs",
        value: 512,
      },
    ],
  },
];
