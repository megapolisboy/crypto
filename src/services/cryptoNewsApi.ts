import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface CryptoNewsApiProps {
  category: string;
  count: number;
}

const cryptoNewsHeaders = {
  "X-BingApis-SDK": "true",
  "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
  "X-RapidAPI-Key": "7cbb6f673emsh4af7bdb683ec27dp1c54fajsnaefaf19c9ac9",
};

const baseUrl = "https://bing-news-search1.p.rapidapi.com";

const createRequest = (url: string, count: number, category: string) => ({
  url,
  headers: cryptoNewsHeaders,
  params: {
    q: category,
    count: count as unknown as string,
  },
});

export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query<any, CryptoNewsApiProps>({
      query: ({ category, count }) =>
        createRequest("/news/search", count, category),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
