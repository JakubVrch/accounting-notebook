import { rest } from "msw";
import { baseURL, transactionRoute } from "common/APISpec";
import { mockTransactions } from "common/APISpec";

export const testHandlers = [
  rest.get(baseURL + transactionRoute, (req, res, ctx) => {
    return res(ctx.json(mockTransactions));
  }),
];
