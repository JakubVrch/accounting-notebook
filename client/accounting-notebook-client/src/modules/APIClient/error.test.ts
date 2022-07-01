import "@testing-library/jest-dom";
import axios from "axios";
import { ITransactionResponse, transactionRoute } from "common/APISpec";
import { setupTestErrorServer } from "mocks";
import { apiService } from ".";

const testServer = setupTestErrorServer();

beforeAll(() => testServer.listen());
afterEach(() => testServer.resetHandlers());
afterAll(() => testServer.close());

describe("Api client error", () => {
  it("handles error", (done) => {
    apiService
      .createRequestFunction<ITransactionResponse[]>(transactionRoute)()
      .catch((error) => {
        expect(axios.isAxiosError(error)).toBeTruthy();
        expect(error.response?.status).toBe(403);
        expect(error.response?.data).toEqual({
          errorMessage: "Forbidden",
        });
        done();
      });
  });
});
