// Import createApi (function to create an API service) and fetchBaseQuery (a basic fetch wrapper)
// from Redux Toolkit Query's React-specific entry point
/* React-specific entry point that automatically generates
   hooks corresponding to the defined endpoints */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const baseUrl =
  "https://fsa-puppy-bowl.herokuapp.com/api/2403-ftb-et-web-PT/players";

// Define a service using a base URL and expected endpoints
const puppyBowlApi = createApi({
  reducerPath: "puppyBowlApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  endpoints: (builder) => ({
    fetchPlayers: builder.query({
      query: () => "/",
      //allows RTK query to cache our results and call the API as needed
      providesTags: ["players"],
    }),
    getPlayerById: builder.query({
      query: (id) => `/${id}`,
      providesTags: ["player"],
    }),
    deletePlayer: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["players","player"],
    }),
    addPlayer: builder.mutation({
      query: (body) => ({
        url: "/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["players"],
    }),
  }),
});
// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export default puppyBowlApi;
export const {
  useFetchPlayersQuery,
  useGetPlayerByIdQuery,
  useDeletePlayerMutation,
  useAddPlayerMutation,
} = puppyBowlApi;
