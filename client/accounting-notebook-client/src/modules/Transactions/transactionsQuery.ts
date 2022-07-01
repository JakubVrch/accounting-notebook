import { useQuery } from "react-query";
import { apiService } from "modules/APIClient";
import { ITransactionResponse, transactionRoute } from "common/APISpec";

export default function UseTransactions() {
  return useQuery(
    "transactions",
    apiService.createRequestFunction<ITransactionResponse[]>(transactionRoute)
  );
}
