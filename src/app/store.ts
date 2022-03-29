import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counterSlice";

import { cryptoApi } from "../services/cryptoApi";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [cryptoApi.reducerPath]: cryptoApi.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
