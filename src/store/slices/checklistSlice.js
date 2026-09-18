import { createSlice } from "@reduxjs/toolkit";

const checklistSlice=createSlice({
    name:"checklists",
    initialState:{},
    reducers:{
        setChecklists:(state, action)=>{
            state[action.payload.cardId]=action.payload.checklists;
        },

        addChecklist:(state, action)=>{
            state[action.payload.cardId].push(action.payload.checklist);
        },

        removeChecklist:(state,action)=>{
            const {cardId, checklistId}=action.payload;

            state[cardId]=state[cardId].filter(
                (checklist)=>checklist.id!==checklistId
            )
        }
    }
})

export const {setChecklists, addChecklist, removeChecklist} = checklistSlice.actions;
export default checklistSlice.reducer;