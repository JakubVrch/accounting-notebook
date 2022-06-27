import { rest } from "msw";
import { fakerDB, generateFakerDB } from "./factory";

generateFakerDB(fakerDB);

export const fakerHandlers = [
  rest.get("https://my.backend/test", (req, res, ctx) => {
    return res(ctx.json(fakerDB.transaction.getAll()));
  }),
];
