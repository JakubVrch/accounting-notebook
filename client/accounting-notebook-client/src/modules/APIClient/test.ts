//TOOD: solve dependencies of mock transaction data
import "@testing-library/jest-dom";
import { mockTransactions } from "common/APISpec";
import { setupTestServer } from "mocks";
import { apiService } from ".";

const testServer = setupTestServer();

beforeAll(() => testServer.listen());
afterEach(() => testServer.resetHandlers());
afterAll(() => testServer.close());

describe("Api client", () => {
  it("fetches transaction data", (done) => {
    apiService.getTransactions().then((response) => {
      expect(response.data).toEqual(mockTransactions);
      done();
    });
  });
});
