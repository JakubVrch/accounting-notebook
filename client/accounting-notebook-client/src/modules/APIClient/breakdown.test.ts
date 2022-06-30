//TOOD: solve dependencies of mock transaction data
import "@testing-library/jest-dom";
import axios from "axios";
import { setupTestBreakdownServer } from "mocks";
import { apiService } from ".";

const testServer = setupTestBreakdownServer();

beforeAll(() => testServer.listen());
afterEach(() => testServer.resetHandlers());
afterAll(() => testServer.close());

describe("Api client breakdown", () => {
  it("handles breakdown", (done) => {
    apiService.getTransactions().catch((error) => {
      expect(axios.isAxiosError(error)).toBeTruthy();
      expect(error.message).toBe("Network Error");
      done();
    });
  });
});
