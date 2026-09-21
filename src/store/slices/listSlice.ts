import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TrelloList } from "../../types";


type SetListsPayload={
    boardId:string;
    lists:TrelloList[];
}

type AddListPayLoad={
    boardId:string;
    list:TrelloList;
}

type RemoveListPayLoad={
    boardId:string;
    listId:string;
}
const listSlice=createSlice({

    name:"lists",

    initialState:{} as Record<string, TrelloList[]>,

    reducers:{
        setLists:(state, action : PayloadAction<SetListsPayload>)=>{
            state[action.payload.boardId]=action.payload.lists;
        },

        addList:(state, action: PayloadAction<AddListPayLoad>)=>{
            state[action.payload.boardId].push(action.payload.list)
        },

        removeList:(state, action:PayloadAction<RemoveListPayLoad>)=>{
            const {boardId, listId}=action.payload;

            state[boardId]=state[boardId].filter((list)=>list.id!==listId)
        },
    }

})

export const {setLists, addList, removeList} =listSlice.actions;
export default listSlice.reducer;