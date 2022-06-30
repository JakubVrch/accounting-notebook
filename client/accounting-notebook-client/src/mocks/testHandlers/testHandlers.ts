import { rest } from "msw";
import { baseURL, transactionRoute } from "common/APISpec";
import { mockTransactions } from "common/APISpec";

export const testResolveHandlers = [
  rest.get(baseURL + transactionRoute, (req, res, ctx) => {
    return res(ctx.json(mockTransactions));
  }),
];

export const testErrorHandlers = [
  rest.get(baseURL + transactionRoute, (req, res, ctx) => {
    return res(
      ctx.status(403),
      ctx.json({
        errorMessage: "Forbidden",
      })
    );
  }),
];

export const testBreakdownHandlers = [
  rest.get(baseURL + transactionRoute, (req, res) => {
    return res.networkError("Failed to connect");
  }),
];
