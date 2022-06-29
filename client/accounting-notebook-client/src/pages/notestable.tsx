import type { NextPage } from "next";
import Head from "next/head";
import { TransactionTable } from "modules/TransactionTable";
import { useQuery } from "react-query";
import { apiService } from "modules/APIClient";

const NotesTable: NextPage = () => {
  const transactionQuery = useQuery("transactions", apiService.getTransactions);

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
          <TransactionTable transactions={transactionQuery.data.data} />
        ) : null}
      </main>
    </div>
  );
};

export default NotesTable;
