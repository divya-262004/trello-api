import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "./slices/boardSlice";
import listReducer from "./slices/listSlice";
import checklistReducer from "./slices/checklistSlice"
import checkItemReducer from "./slices/checkItemSlice"
import cardReducer from "./slices/cardSlice"

export const store=configureStore({
    reducer:{
        boards:boardReducer,
        lists:listReducer,
        cards:cardReducer,
        checklists:checklistReducer,
        items:checkItemReducer,
    }
})

export type RootState=ReturnType<typeof store.getState>;

export type AppDispatch=typeof store.dispatch;