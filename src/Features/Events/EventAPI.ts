import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../../App/Store";
import { ApiDomain } from "../../Utils/ApiDomain";

// Event type definition based on your schema
export type TEvent = {
  eventId: number;
  eventName: string;
  venueId: number;
  category: string;
  eventDate: string; // ISO format expected
  startTime: string;
  endTime: string;
  description: string;
  ticketPrice: number;
  ticketsTotal: number;
  ticketsAvailable: number;
  ticketsSold: number;
  imageUrl: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

// RTK Query API definition
export const eventAPI = createApi({
  reducerPath: "eventApi",
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
  tagTypes: ["Event"],

  endpoints: (builder) => ({
    // Create Event
    createEvent: builder.mutation<TEvent, Partial<TEvent>>({
      query: (newEvent) => ({
        url: "/event",
        method: "POST",
        body: newEvent,
      }),
      invalidatesTags: ["Event"],
    }),

    // Get All Events
    getEvents: builder.query<TEvent[], void>({
      query: () => "/event",
      providesTags: ["Event"],
    }),

    // Get Event by ID
    getEventById: builder.query<TEvent, number>({
      query: (eventId) => `/event/${eventId}`,
      providesTags: ["Event"],
    }),

    // Update Event by ID
    updateEventById: builder.mutation<TEvent, Partial<TEvent> & { eventId: number }>({
      query: ({ eventId, ...updates }) => ({
        url: `/event/${eventId}`,
        method: "PUT",
        body: updates,
      }),
      invalidatesTags: ["Event"],
    }),

    // Delete Event by ID
    deleteEventById: builder.mutation<{ message: string }, number>({
      query: (eventId) => ({
        url: `/event/${eventId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Event"],
    }),
  }),
});

// Export hooks
export const {
  useGetEventsQuery,
  useGetEventByIdQuery,
  useCreateEventMutation,
  useUpdateEventByIdMutation,
  useDeleteEventByIdMutation,
} = eventAPI;
