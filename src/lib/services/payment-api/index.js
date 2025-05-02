import { base_Url } from "@/lib/utils/base-url";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: base_Url,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("x-auth-token", `${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    createPayment: builder.mutation({
      query: (data) => ({
        url: `/payment/create-payment-intent`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreatePaymentMutation,
  middleware: paymentApiMiddleware,
  reducerPath: paymentApiReducerPath,
  reducer: paymentApiReducer,
} = paymentApi;
