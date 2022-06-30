import { setupServer } from "msw/node";
import {
  testResolveHandlers,
  testErrorHandlers,
  testBreakdownHandlers,
} from "..";

export const setupTestResolveServer = () => setupServer(...testResolveHandlers);
export const setupTestErrorServer = () => setupServer(...testErrorHandlers);
export const setupTestBreakdownServer = () =>
  setupServer(...testBreakdownHandlers);
