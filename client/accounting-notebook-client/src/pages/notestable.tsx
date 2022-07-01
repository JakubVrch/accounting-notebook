import type { NextPage } from "next";
import Head from "next/head";
import { TransactionTable } from "modules/Transactions";
import UseTransactions from "modules/Transactions/transactionsQuery";

const NotesTable: NextPage = () => {
  //Refactor to custom hooks, decide if to use on pages or in components
  const transactionsQuery = UseTransactions();

  return (
    <div>
      <Head>
        <title>Notes Table</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Notes Table</h1>
        <button onClick={() => transactionsQuery.refetch()}>Load test</button>
        {transactionsQuery.data ? (
          <TransactionTable transactions={transactionsQuery.data.data} />
        ) : null}
      </main>
    </div>
  );
};

export default NotesTable;
