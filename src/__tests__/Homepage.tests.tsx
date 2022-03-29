import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { Homepage } from "../components";
import "@testing-library/jest-dom/extend-expect";
import { useGetCryptosQuery } from "../services/cryptoApi";
import MatchMediaMock from "jest-matchmedia-mock";

jest.mock("../services/cryptoApi", () => ({
  useGetCryptosQuery: () => ({
    data: {
      data: {
        stats: {
          total: 1,
          totalExchanges: 2,
          totalMarketCap: 3,
          total24hVolume: 4,
          totalMarkets: 5,
        },
      },
    },
    isFetching: false,
  }),
}));

let matchMedia: MatchMediaMock;

describe("Homepage", () => {
  beforeAll(() => {
    matchMedia = new MatchMediaMock();
  });

  it("Homepage is present", () => {
    render(<Homepage />);
    const gcs = screen.getByText(/global crypto stats/i);
    expect(gcs).toBeInTheDocument();
  });

  it("Total exchanges is present", () => {
    render(<Homepage />);
    const element = screen.getByText(/total 24h volume/i);
    expect(element).toBeInTheDocument();
  });

  afterAll(() => {
    matchMedia.clear();
  });
});
