import { configureStore } from "@reduxjs/toolkit";
import transactionsReducer from "../features/Transaction/transactionsSlice";

export const store = configureStore({
    reducer: {
        transaction: transactionsReducer
    },
});
