import { setupServer } from "msw/node";
import { fakerHandlers } from "..";

export const fakerServer = setupServer(...fakerHandlers);
