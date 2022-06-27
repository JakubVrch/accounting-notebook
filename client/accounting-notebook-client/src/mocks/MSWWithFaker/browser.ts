import { setupWorker } from "msw";
import { fakerHandlers } from "..";

export const fakerWorker = setupWorker(...fakerHandlers);
