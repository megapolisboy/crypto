//@ts-ignore
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { Cryptocurrencies, Homepage } from "../components";
import "@testing-library/jest-dom/extend-expect";
import MatchMediaMock from "jest-matchmedia-mock";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

jest.mock("../services/cryptoApi", () => ({
  useGetCryptosQuery: () => ({
    data: {
      data: {
        coins: [
          {
            id: "123",
            rank: 1,
            name: "Bitcoin",
            iconUrl: "",
            price: 10,
            marketCap: 20,
            change: 30,
          },
          {
            id: "abc",
            rank: 2,
            name: "Etherium",
            iconUrl: "",
            price: 30,
            marketCap: 15,
            change: 5,
          },
        ],
      },
    },
    isFetching: false,
  }),
}));

let matchMedia: MatchMediaMock;

describe("Crypto", () => {
  beforeAll(() => {
    matchMedia = new MatchMediaMock();
  });

  it("Input is not present in simplified", () => {
    render(
      <BrowserRouter>
        <Cryptocurrencies simplified />
      </BrowserRouter>
    );

    const element = screen.queryByPlaceholderText(/search cryptocurrency/i);
    expect(element).not.toBeInTheDocument();
  });

  it("Input is present in not simplified", () => {
    render(
      <BrowserRouter>
        <Cryptocurrencies />
      </BrowserRouter>
    );

    const element = screen.getByPlaceholderText(/search cryptocurrency/i);
    expect(element).toBeInTheDocument();
  });

  it("All cards are present", () => {
    render(
      <BrowserRouter>
        <Cryptocurrencies />
      </BrowserRouter>
    );

    const bitcoin = screen.getByText(/bitcoin/i);
    const etherium = screen.getByText(/etherium/i);
    expect(bitcoin).toBeInTheDocument();
    expect(etherium).toBeInTheDocument();
  });

  it("Cards are filtered", () => {
    render(
      <BrowserRouter>
        <Cryptocurrencies />
      </BrowserRouter>
    );

    const input = screen.getByPlaceholderText(/search cryptocurrency/i);
    userEvent.type(input, "it");
    const bitcoin = screen.getByText(/bitcoin/i);
    const etherium = screen.queryByText(/etherium/i);
    expect(bitcoin).toBeInTheDocument();
    expect(etherium).not.toBeInTheDocument();
  });

  afterAll(() => {
    matchMedia.clear();
  });
});
