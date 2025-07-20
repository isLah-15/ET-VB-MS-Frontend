import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../../App/Store";
import { ApiDomain } from "../../Utils/ApiDomain";

// Venue type from DB
export type TVenue = {
  venueId: number;
  venueName: string;
  address: number; // Could be a string if address is text in DB
  capacity: number;
  createdAt: string;
  updatedAt: string;
};

// Input type for create/update
export type TVenueInput = Omit<TVenue, "venueId" | "createdAt" | "updatedAt">;

export const venueAPI = createApi({
  reducerPath: "venueApi",
  baseQuery: fetchBaseQuery({
    baseUrl: ApiDomain,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Venue"],

  endpoints: (builder) => ({
    // Create venue
    createVenue: builder.mutation<TVenue, TVenueInput>({
      query: (venueData) => ({
        url: "/venue",
        method: "POST",
        body: venueData,
      }),
      invalidatesTags: ["Venue"],
    }),

    // Get all venues
    getVenues: builder.query<TVenue[], void>({
      query: () => "/venue",
      providesTags: ["Venue"],
    }),

    // Get single venue by ID
    getVenueById: builder.query<TVenue, number>({
      query: (venueId) => `/venue/${venueId}`,
      providesTags: ["Venue"],
    }),

    // Update venue
    updateVenue: builder.mutation<TVenue, Partial<TVenue> & { venueId: number }>({
      query: ({ venueId, ...updates }) => ({
        url: `/venue/${venueId}`,
        method: "PUT",
        body: updates,
      }),
      invalidatesTags: ["Venue"],
    }),

    // Delete venue
    deleteVenue: builder.mutation<{ message: string }, number>({
      query: (venueId) => ({
        url: `/venue/${venueId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Venue"],
    }),
  }),
});

// Export hooks
export const {
  useCreateVenueMutation,
  useGetVenuesQuery,
  useGetVenueByIdQuery,
  useUpdateVenueMutation,
  useDeleteVenueMutation,
} = venueAPI;
