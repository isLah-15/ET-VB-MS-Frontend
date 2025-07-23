import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../../App/Store";
import { ApiDomain } from "../../Utils/ApiDomain";

// Booking type definition
export type TBooking = {
  newBooking: any;
  bookingId: number;
  userId: number;
  eventId: number;
  quantity: number;
  totalAmount: number;
  bookingStatus: "pending" | "confirmed" | "cancelled";
  createdAt: string;
  updatedAt: string;
};

// Create type for POST or PUT
export type TBookingInput = Omit<TBooking, "bookingId" | "createdAt" | "updatedAt">;

// RTK Query for Booking
export const bookingAPI = createApi({
  reducerPath: "bookingApi",
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
  tagTypes: ["Booking"],

  endpoints: (builder) => ({
    // Create a booking
    createBooking: builder.mutation<TBooking, TBookingInput>({
      query: (bookingData) => ({
        url: "/booking",
        method: "POST",
        body: bookingData,
      }),
      invalidatesTags: ["Booking"],
    }),

    // Get all bookings
    getBookings: builder.query<TBooking[], void>({
      query: () => "/booking",
      providesTags: ["Booking"],
    }),

    // Get booking by ID
    getBookingById: builder.query<TBooking, number>({
      query: (bookingId) => `/booking/${bookingId}`,
      providesTags: ["Booking"],
    }),

    // Update booking
    updateBooking: builder.mutation<TBooking, Partial<TBooking> & { bookingId: number }>({
      query: ({ bookingId, ...updates }) => ({
        url: `/booking/${bookingId}`,
        method: "PUT",
        body: updates,
      }),
      invalidatesTags: ["Booking"],
    }),

    // Delete booking
    deleteBooking: builder.mutation<{ message: string }, number>({
      query: (bookingId) => ({
        url: `/booking/${bookingId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Booking"],
    }),
  }),
});

// Export hooks
export const {
  useCreateBookingMutation,
  useGetBookingsQuery,
  useGetBookingByIdQuery,
  useUpdateBookingMutation,
  useDeleteBookingMutation,
} = bookingAPI;
