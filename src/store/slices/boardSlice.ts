import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Board } from "../../types";

const boardSlice=createSlice({
    name:"boards",
    initialState:[] as Board[],
    reducers:{
        setBoards:(state, action:PayloadAction<Board[]>)=>{
            return action.payload;
        },

        addBoard:(state, action: PayloadAction<Board>)=>{
            state.push(action.payload)
        }
    }
})

export const {setBoards, addBoard}=boardSlice.actions;
export default boardSlice.reducer;