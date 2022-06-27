import type { NextPage } from "next";
import Head from "next/head";
import { TransactionTable, ITransaction } from "@modules/TransactionTable";
import { useQuery } from "react-query";

//TODO: MUI table + install https://mui.com/material-ui/react-table/#collapsible-table

const NotesTable: NextPage = () => {
  //TODO: Call transactions from API
  const getTransactions = async () => {
    const res = await fetch("https://my.backend/test");
    const transactions = await res.json();
    transactions.forEach((element: { date: string | number | Date }) => {
      element.date = new Date(element.date);
    });
    return transactions;
  };

  const transactionQuery = useQuery("transactions", getTransactions);

  return (
    <div>
      <Head>
        <title>Notes Table</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Notes Table</h1>
        <button onClick={() => transactionQuery.refetch()}>Load test</button>
        {transactionQuery.data ? (
          <TransactionTable transactions={transactionQuery.data} />
        ) : null}
      </main>
    </div>
  );
};

export default NotesTable;
