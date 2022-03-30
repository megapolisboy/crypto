//@ts-ignore
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { Homepage } from "../components";
import "@testing-library/jest-dom/extend-expect";
import MatchMediaMock from "jest-matchmedia-mock";
import { BrowserRouter } from "react-router-dom";

jest.mock("../services/cryptoApi", () => ({
  useGetCryptosQuery: (num: number) => ({
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

jest.mock("../components/Cryptocurrencies", () => () => (
  <div>Cryptocurrencies Element</div>
));
jest.mock("../components/News", () => () => <div>News Element</div>);

let matchMedia: MatchMediaMock;

describe("Homepage", () => {
  beforeAll(() => {
    matchMedia = new MatchMediaMock();
  });

  beforeEach(() => {
    render(
      <BrowserRouter>
        <Homepage />
      </BrowserRouter>
    );
  });

  it("Homepage is present", () => {
    const gcs = screen.getByText(/global crypto stats/i);
    expect(gcs).toBeInTheDocument();
  });

  it("Total exchanges is present", () => {
    const element = screen.getByText(/total 24h volume/i);
    expect(element).toBeInTheDocument();
  });

  it("2 showmore buttons", () => {
    const elements = screen.getAllByText(/show more/i);
    expect(elements.length).toBe(2);
  });

  it("crypto element is present", () => {
    const element = screen.getByText(/cryptocurrencies element/i);
    expect(element).toBeDefined();
  });

  it("news element is present", () => {
    const element = screen.getByText(/news element/i);
    expect(element).toBeDefined();
  });

  afterAll(() => {
    matchMedia.clear();
  });
});
