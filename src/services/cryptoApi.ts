import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoApiHeaders = {
  "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
  "X-RapidAPI-Key": "7cbb6f673emsh4af7bdb683ec27dp1c54fajsnaefaf19c9ac9",
};

const baseUrl = "https://coinranking1.p.rapidapi.com";

const createRequest = (url: string, limit: string) => ({
  url,
  headers: cryptoApiHeaders,
  params: {
    limit: limit,
  },
});

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query<any, number>({
      query: (count) => createRequest("/coins", count as unknown as string),
    }),
  }),
});

export const { useGetCryptosQuery } = cryptoApi;
