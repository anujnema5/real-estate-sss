import configReducer from "@/features/config/configSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer : {
        config: configReducer
    },
})

export default store;