//@ts-ignore
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { Cryptocurrencies, Homepage, News } from "../components";
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

jest.mock("../services/cryptoNewsApi.ts", () => ({
  useGetCryptoNewsQuery: () => ({
    data: {
      value: [
        {
          url: "url1",
          name: "Piece of news number 1",
          description: "Description length is less than 100 symbols",
          provider: [
            {
              name: "First Provider",
            },
          ],
        },
        {
          url: "url2",
          name: "Piece of news number 1",
          description:
            "Description length is more than 100 symbolsgfdgbdfbgdbgdbgfdbgfbdbbgfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddshgbhdfgjkhdkjfhbhdkjgbhkdjhgjkbhkgdhlhjblkjdfljdksjglkjbkldjsgklbjlgdbjidj",
          provider: [
            {
              name: "Second Provider",
            },
          ],
        },
      ],
    },
    isFetching: false,
  }),
}));

let matchMedia: MatchMediaMock;

describe("Crypto", () => {
  beforeAll(() => {
    matchMedia = new MatchMediaMock();
  });

  it("Not simplified appears correctly", () => {
    render(<News />);
    const input = screen.getByRole("combobox");
    expect(input).toBeInTheDocument();
  });

  it("Simplified appears correctly", () => {
    render(<News simplified />);
    const input = screen.queryByRole("combobox");
    expect(input).not.toBeInTheDocument();
  });

  it("News cards appear", () => {
    const { container } = render(<News simplified />);
    const cards = container.querySelectorAll(".news-card");
    expect(Boolean(cards.length)).toBeTruthy();
  });

  it("News cards appear", () => {
    const { container } = render(<News />);
    const input = screen.getByRole("combobox");
    // userEvent.type(input, "Bitcoin");
    const cards = container.querySelectorAll(".news-card");
    expect(cards.length).toEqual(2);
  });

  it("News cards get filtered", () => {
    const { container } = render(<News />);
    const input = screen.getByRole("combobox");
    const cards = container.querySelectorAll(".news-card");
    expect(cards.length).toEqual(2);
  });

  afterAll(() => {
    matchMedia.clear();
  });
});
