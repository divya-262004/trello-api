import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { TrelloChecklist } from "../../types";

type SetChecklistsPayload={
    cardId:string;
    checklists:TrelloChecklist[];
}

type AddChecklistPayload={
    cardId:string;
    checklist:TrelloChecklist;
}

type RemoveChecklistPayload={
    cardId:string;
    checklistId:string;
}
const checklistSlice=createSlice({
    name:"checklists",
    initialState:{} as Record<string,TrelloChecklist[]>,
    reducers:{
        setChecklists:(state, action:PayloadAction<SetChecklistsPayload>)=>{
            state[action.payload.cardId]=action.payload.checklists;
        },

        addChecklist:(state, action:PayloadAction<AddChecklistPayload>)=>{
            state[action.payload.cardId].push(action.payload.checklist);
        },

        removeChecklist:(state,action:PayloadAction<RemoveChecklistPayload>)=>{
            const {cardId, checklistId}=action.payload;

            state[cardId]=state[cardId].filter(
                (checklist)=>checklist.id!==checklistId
            )
        }
    }
})

export const {setChecklists, addChecklist, removeChecklist} = checklistSlice.actions;
export default checklistSlice.reducer;