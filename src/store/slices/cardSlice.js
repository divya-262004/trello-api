import { createSlice } from "@reduxjs/toolkit";

const cardSlice=createSlice({
    name:"cards",
    initialState:{},
    reducers:{
        setCards:(state,action)=>{
            state[action.payload.listId]=action.payload.cards;
        },
        addCard:(state, action)=>{
            state[action.payload.listId].push(action.payload.card);
        }
    },
})

export const {setCards, addCard}=cardSlice.actions;
export default cardSlice.reducer;