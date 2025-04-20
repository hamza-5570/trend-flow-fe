import { configureStore } from "@reduxjs/toolkit";
import {
  authApiMiddleware,
  authApiReducer,
  authApiReducerPath,
} from "./services/auth-api";
import {
  productApiMiddleware,
  productApiReducer,
  productApiReducerPath,
} from "./services/product-api";
import {
  paymentApiMiddleware,
  paymentApiReducer,
  paymentApiReducerPath,
} from "./services/payment-api";
import {
  alertsApiMiddleware,
  alertsApiReducer,
  alertsApiReducerPath,
} from "./services/alerts-api";

const store = configureStore({
  reducer: {
    [authApiReducerPath]: authApiReducer,
    [productApiReducerPath]: productApiReducer,
    [paymentApiReducerPath]: paymentApiReducer,
    [alertsApiReducerPath]: alertsApiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApiMiddleware)
      .concat(productApiMiddleware)
      .concat(paymentApiMiddleware)
      .concat(alertsApiMiddleware),
});

export default store;
