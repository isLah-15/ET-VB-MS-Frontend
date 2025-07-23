import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../../App/Store";
import { ApiDomain } from "../../Utils/ApiDomain";

// Payment type from DB
export type TPayment = {
  newPayment: any;
  paymentId: number;
  bookingId: number;
  userId: number;
  transactionId: number;
  amount: number;
  paymentStatus: "pending" | "completed" | "failed";
  paymentMethod: "credit_card" | "paypal" | "m_pesa";
  createdAt: string;
  updatedAt: string;
};

// Input type for create/update
export type TPaymentInput = Omit<TPayment, "paymentId" | "createdAt" | "updatedAt">;

export const paymentAPI = createApi({
  reducerPath: "paymentApi",
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
  tagTypes: ["Payment"],

  endpoints: (builder) => ({
    // Create Payment
    createPayment: builder.mutation<TPayment, TPaymentInput>({
      query: (paymentData) => ({
        url: "/payment",
        method: "POST",
        body: paymentData,
      }),
      invalidatesTags: ["Payment"],
    }),

    // Get all payments
    getPayments: builder.query<TPayment[], void>({
      query: () => "/payment",
      providesTags: ["Payment"],
    }),

    // Get payment by ID
    getPaymentById: builder.query<TPayment, number>({
      query: (paymentId) => `/payment/${paymentId}`,
      providesTags: ["Payment"],
    }),

    // Update payment
    updatePayment: builder.mutation<TPayment, Partial<TPayment> & { paymentId: number }>({
      query: ({ paymentId, ...updates }) => ({
        url: `/payment/${paymentId}`,
        method: "PUT",
        body: updates,
      }),
      invalidatesTags: ["Payment"],
    }),

    // Delete payment
    deletePayment: builder.mutation<{ message: string }, number>({
      query: (paymentId) => ({
        url: `/payment/${paymentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Payment"],
    }),
  }),
});

// Export RTK Query hooks
export const {
  useCreatePaymentMutation,
  useGetPaymentsQuery,
  useGetPaymentByIdQuery,
  useUpdatePaymentMutation,
  useDeletePaymentMutation,
} = paymentAPI;
