import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "./slices/boardSlice.js";
import listReducer from "./slices/listSlice.js";
import checklistReducer from "./slices/checklistSlice.js"
import checkItemReducer from "./slices/checkItemSlice.js"
import cardReducer from "./slices/cardSlice.js"

export const store=configureStore({
    reducer:{
        boards:boardReducer,
        lists:listReducer,
        cards:cardReducer,
        checklists:checklistReducer,
        items:checkItemReducer,
    }
})

