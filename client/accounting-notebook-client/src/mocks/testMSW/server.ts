import { setupServer } from "msw/node";
import { testHandlers } from "..";

export const setupTestServer = () => setupServer(...testHandlers);
