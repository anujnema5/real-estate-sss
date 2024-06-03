import { configureStore } from "@reduxjs/toolkit";

import configReducer from "@/features/config/config-slice";
import authReducer from '@/features/auth/auth-slice';
import apiSlice from "./api/api-slice";

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        config: configReducer,
        auth: authReducer
    },

    devTools: true, // ONLY FOR DEV

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }).concat(apiSlice.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type DispatchType = typeof store.dispatch

export default store;