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

type RemoveCardPayload = {
  listId: string;
  cardId: string;
};

const cardSlice=createSlice({
    name:"cards",
    initialState:{} as Record<string, TrelloCard[]>,
    reducers:{
        setCards:(state,action:PayloadAction<setCardsPayload>)=>{
            state[action.payload.listId]=action.payload.cards;
        },
        addCard:(state, action: PayloadAction<AddCardpayload>)=>{
            state[action.payload.listId].push(action.payload.card);
        },
        removeCard:(state, action: PayloadAction<RemoveCardPayload>) => {
            const { listId, cardId } = action.payload;

            state[listId] = state[listId].filter(
                (card) => card.id !== cardId,
            );
        },
    },
})

export const {setCards, addCard, removeCard}=cardSlice.actions;
export default cardSlice.reducer;