import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../../App/Store";
import { ApiDomain } from "../../Utils/ApiDomain";

// Ticket type from DB
export type TSupportTicket = {
  ticketId: number;
  userId: number;
  subject: string;
  description: string;
  status: "open" | "in_progress" | "resolved";
  createdAt: string;
  updatedAt: string;
};

// Input type for create/update
export type TSupportTicketInput = Omit<TSupportTicket, "ticketId" | "createdAt" | "updatedAt">;

export const customerSupportAPI = createApi({
  reducerPath: "customerSupportApi",
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
  tagTypes: ["SupportTicket"],

  endpoints: (builder) => ({
    // Create support ticket
    createTicket: builder.mutation<TSupportTicket, TSupportTicketInput>({
      query: (ticketData) => ({
        url: "/support",
        method: "POST",
        body: ticketData,
      }),
      invalidatesTags: ["SupportTicket"],
    }),

    // Get all support tickets
    getTickets: builder.query<TSupportTicket[], void>({
      query: () => "/support",
      providesTags: ["SupportTicket"],
    }),

    // Get single ticket
    getTicketById: builder.query<TSupportTicket, number>({
      query: (ticketId) => `/support/${ticketId}`,
      providesTags: ["SupportTicket"],
    }),

    // Update ticket
    updateTicket: builder.mutation<TSupportTicket, Partial<TSupportTicket> & { ticketId: number }>({
      query: ({ ticketId, ...updates }) => ({
        url: `/support/${ticketId}`,
        method: "PUT",
        body: updates,
      }),
      invalidatesTags: ["SupportTicket"],
    }),

    // Delete ticket
    deleteTicket: builder.mutation<{ message: string }, number>({
      query: (ticketId) => ({
        url: `/support/${ticketId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SupportTicket"],
    }),
  }),
});

// Export hooks
export const {
  useCreateTicketMutation,
  useGetTicketsQuery,
  useGetTicketByIdQuery,
  useUpdateTicketMutation,
  useDeleteTicketMutation,
} = customerSupportAPI;
