import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { AuthSlice } from "./Auth/AuthSlice";
import { EducationSlice } from "./Education/EducationSlice";

export const store = configureStore({
  reducer: {
    [AuthSlice.reducerPath]: AuthSlice.reducer,
    [EducationSlice.reducerPath]: EducationSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      AuthSlice.middleware,
      EducationSlice.middleware
    ),
});

setupListeners(store.dispatch);
