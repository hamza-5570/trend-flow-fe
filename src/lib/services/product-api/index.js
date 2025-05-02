import { base_Url } from "@/lib/utils/base-url";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const productApi = createApi({
  reducerPath: "productApi",
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
    createProduct: builder.mutation({
      query: (data) => ({
        url: `/product/upload`,
        method: "POST",
        body: data,
      }),
    }),

    postSales: builder.mutation({
      query: (data) => ({
        url: `/sale/uploadCsvSales`,
        method: "POST",
        body: data,
      }),
    }),
    getCategory: builder.query({
      query: () => ({
        url: `/category`,
        method: "GET",
      }),
    }),
    getProduct: builder.query({
      query: () => ({
        url: `/product`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetProductQuery,
  usePostSalesMutation,
  useGetCategoryQuery,
  middleware: productApiMiddleware,
  reducerPath: productApiReducerPath,
  reducer: productApiReducer,
} = productApi;
