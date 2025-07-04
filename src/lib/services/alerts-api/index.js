import { base_Url } from "@/lib/utils/base-url";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const alertsApi = createApi({
  reducerPath: "alertsApi",
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
  tagTypes: ["alerts","forcast"],
  endpoints: (builder) => ({
    stockOutAlerts: builder.query({

      query: (filters) => {
        const queryString = new URLSearchParams(filters).toString();
      return  {
        url: `/alert/all?${queryString}`,
        method: "GET",
      }
    },
    providesTags: ["alerts"],
    }),
    topSellings: builder.query({
      query: () => ({
        url: `/sale/top-selling-products`,
        method: "GET",
      }),
      providesTags: ["alerts"],
      
    }),
    getFilterData: builder.query({
      query: ({ sku, category, from, to }) => ({
        url: `/forcast/all?sku=${sku}&category=${category}&startDate=${from}&endDate=${to}`,
        method: "GET",
      }),
      transformResponse: (response) => response.data,
    }),
    getforcast: builder.query({
      query: (filters) => {
        const queryString = new URLSearchParams(filters).toString();
        return {
          url: `/forcast/all?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["forcast"],
    }),
    updateInventory: builder.mutation({
      query: (data) => ({
        url: `/inventory/upload`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["alerts"],
    }),
    updateInventoryStock: builder.mutation({
      query: (data) => ({
        url: `inventory/uploadInventory`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["alerts"],
    }),
    getLowStock: builder.query({
      query: () => ({
        url: `/inventory/lowstock`,
        method: "GET",
      }),
      transformResponse: (response) => response.data,
    }),
    updateStock: builder.mutation({
      query: (data) => ({
        url: `/inventory/update`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["alerts"],
    }),
    deleteForcast: builder.mutation({
      query: (id) => ({
        url: `/forcast/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["forcast"],
    }),
    deleteAllForcast: builder.mutation({
      query: (ids) => ({
        url: `/forcast/allDelete`,
        method: "DELETE",
        body: ids,
      }),
      invalidatesTags: ["forcast"],
    }),
    deleteAlert: builder.mutation({
      query: ({id,type}) => {
      console.log("id",id,"type",type)  
       return {
        url: `/alert/delete/${id}/${type}`,
        method: "DELETE",
      }
      },
      invalidatesTags: ["alerts"],
    }),
    deleteAllAlerts: builder.mutation({
      query: ({type,ids}) => ({
        url: `/alert/allDelete`,
        method: "DELETE",
        body:{type,ids}
      }),
      invalidatesTags: ["alerts"],
    }),
    deleteAllSale: builder.mutation({
      query: (skus) => ({
        url: `/sale/allDelete`,
        method: "DELETE",
        body: skus,
      }),
      invalidatesTags: ["alerts"],
    }),
    getNotifications: builder.query({
      query: () => ({
        url: `/notification/all`,
        method: "GET",
      }),
      transformResponse: (response) => response.data,
    }),
    updateNotification: builder.mutation({
      query: ({ id, body }) => {
        console.log(id, body);
        return { url: `/notification/update/${id}`, method: "PUT", body: body };
      },
    }),
  }),
});

export const {
  useStockOutAlertsQuery,
  useTopSellingsQuery,
  useUpdateInventoryMutation,
  useLazyGetFilterDataQuery,
  useGetLowStockQuery,
  useGetNotificationsQuery,
  useUpdateStockMutation,
  useDeleteForcastMutation,
  useGetforcastQuery,
  useDeleteAllAlertsMutation,
  useDeleteAlertMutation,
  useDeleteAllForcastMutation,
  useDeleteAllSaleMutation,
  useUpdateNotificationMutation,
  useUpdateInventoryStockMutation,
  middleware: alertsApiMiddleware,
  reducerPath: alertsApiReducerPath,
  reducer: alertsApiReducer,
} = alertsApi;
