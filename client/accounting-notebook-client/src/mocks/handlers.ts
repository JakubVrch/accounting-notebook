import { rest } from "msw";
import { db, generateDB } from "./factory";

generateDB(db);

export const handlers = [
  rest.get("https://my.backend/test", (req, res, ctx) => {
    return res(ctx.json(db.transaction.getAll()));
  }),
];
