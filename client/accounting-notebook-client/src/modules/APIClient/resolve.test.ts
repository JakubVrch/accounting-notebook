//TOOD: solve dependencies of mock transaction data
import "@testing-library/jest-dom";
import { mockTransactions } from "common/APISpec";
import { setupTestResolveServer } from "mocks";
import { apiService } from ".";

const testServer = setupTestResolveServer();

beforeAll(() => testServer.listen());
afterEach(() => testServer.resetHandlers());
afterAll(() => testServer.close());

describe("Api client resolve", () => {
  it("fetches transaction data", (done) => {
    apiService.getTransactions().then((response) => {
      expect(response?.data).toEqual(mockTransactions);
      done();
    });
  });
});
