import type { NextPage } from "next";
import Head from "next/head";
import { TransactionTable, mockTransactions } from "@modules/TransactionTable";
import { useEffect, useState } from "react";

//TODO: MUI table + install https://mui.com/material-ui/react-table/#collapsible-table

const NotesTable: NextPage = () => {
  //TODO: Call transactions from API
  const [transactions, setTransactions] = useState<any>(null);
  useEffect(() => setTransactions(mockTransactions), []);

  return (
    <div>
      <Head>
        <title>Notes Table</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Notes Table</h1>
        {transactions ? <TransactionTable transactions={transactions} /> : null}
      </main>
    </div>
  );
};

export default NotesTable;
