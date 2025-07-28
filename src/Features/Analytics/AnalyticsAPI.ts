
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const analyticsAPI = createApi({
  reducerPath: 'analyticsAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8081' }), // Change this URL if needed
  endpoints: (builder) => ({
    getTotalRevenue: builder.query<number, void>({
      query: () => '/analytics/revenue',
    }),
    getTotalBookings: builder.query<number, void>({
      query: () => '/analytics/bookings',
    }),
    getTopEvents: builder.query<
      { eventId: number; eventName: string; ticketsSold: number }[],
      void
    >({
      query: () => '/analytics/events/top',
    }),
    getTotalUsers: builder.query<number, void>({
      query: () => '/analytics/users',
    }),
    getBookingStatusStats: builder.query<
      { status: string; count: number }[],
      void
    >({
      query: () => '/analytics/booking-status',
    }),
    getPaymentMethodStats: builder.query<
      { method: string; count: number }[],
      void
    >({
      query: () => '/analytics/payments-methods',
    }),
  }),
});

export const {
  useGetTotalRevenueQuery,
  useGetTotalBookingsQuery,
  useGetTopEventsQuery,
  useGetTotalUsersQuery,
  useGetBookingStatusStatsQuery,
  useGetPaymentMethodStatsQuery,
} = analyticsAPI;
