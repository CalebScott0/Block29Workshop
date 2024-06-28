import { configureStore } from "@reduxjs/toolkit";
import puppyBowlApi from "../api/puppyBowlApi";

const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [puppyBowlApi.reducerPath]: puppyBowlApi.reducer,
  },

    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(puppyBowlApi.middleware),
});

export default store;
