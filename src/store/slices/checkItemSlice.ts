import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { TrelloCheckItem } from "../../types";

type SetItemsPayload = {
  checklistId: string;
  items: TrelloCheckItem[];
};

type AddItemPayload = {
  checklistId: string;
  item: TrelloCheckItem;
};

type UpdateItemPayload = {
  checklistId: string;
  itemId: string;
  state: TrelloCheckItem["state"];
};

type RemoveItemPayload={
    checklistId:string;
    itemId:string;
}

const checkItemSlice=createSlice({
    name:"items",
    initialState:{} as Record<string, TrelloCheckItem[]>,

    reducers:{

        setItems:(state, action:PayloadAction<SetItemsPayload>)=>{
            state[action.payload.checklistId]=action.payload.items;
        },

        addItem:(state, action:PayloadAction<AddItemPayload>)=>{
            state[action.payload.checklistId].push(action.payload.item)
        },


        updateItem:(state, action:PayloadAction<UpdateItemPayload>)=>{
            const {checklistId, itemId, state:newState}=action.payload;

            const item=state[checklistId].find(
                (item)=>item.id===itemId

            )
            if(item){
            item.state=newState;
            }

        },

        removeItem:(state, action:PayloadAction<RemoveItemPayload>)=>{
            const {checklistId, itemId}=action.payload;

            state[checklistId]=state[checklistId].filter(
                (item)=>item.id!==itemId
            )
        },

    }
})

export const {setItems, addItem, updateItem, removeItem}=checkItemSlice.actions;
export default checkItemSlice.reducer;