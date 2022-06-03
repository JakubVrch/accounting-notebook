import { rest } from "msw";

export const handlers = [
  rest.get("https://my.backend/test", (req, res, ctx) => {
    return res(
      ctx.json({
        test: true,
      })
    );
  }),
];
