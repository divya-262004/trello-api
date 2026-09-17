import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "./slices/boardSlice.js";
import listReducer from "./slices/listSlice.js";

export const store=configureStore({
    reducer:{
        boards:boardReducer,
        lists:listReducer,
    }
})

