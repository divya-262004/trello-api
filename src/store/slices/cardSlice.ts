import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TrelloCard} from "../../types";

type setCardsPayload={
    listId:string;
    cards:TrelloCard[];
}

type AddCardpayload={
    listId:string;
    card:TrelloCard;
}
const cardSlice=createSlice({
    name:"cards",
    initialState:{} as Record<string, TrelloCard[]>,
    reducers:{
        setCards:(state,action:PayloadAction<setCardsPayload>)=>{
            state[action.payload.listId]=action.payload.cards;
        },
        addCard:(state, action: PayloadAction<AddCardpayload>)=>{
            state[action.payload.listId].push(action.payload.card);
        }
    },
})

export const {setCards, addCard}=cardSlice.actions;
export default cardSlice.reducer;