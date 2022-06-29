import { rest } from "msw";
import { baseURL, transactionRoute } from "common/APISpec";
import { fakerDB, generateFakerDB } from "./factory";

generateFakerDB(fakerDB);

export const fakerHandlers = [
  rest.get(baseURL + transactionRoute, (req, res, ctx) => {
    return res(ctx.json(fakerDB.transaction.getAll()));
  }),
];
