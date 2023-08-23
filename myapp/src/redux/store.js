import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./cartRedux";
import userReducer from "./userRedux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import productReducer from "./productRedux";
import wishListReducer from "./wishListRedux";

const persistConfig = {
  key: "root",
  version: 2,
  storage,
};

const rootReducer = combineReducers(
  {user: userReducer, cart : cartReducer, product : productReducer,
  wishListProducts: wishListReducer})
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    // reducer: {
    //   cart: cartReducer,
    //   user: persistedReducer,
    // },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });

export let persistor = persistStore(store);
