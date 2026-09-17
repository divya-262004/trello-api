import { createSlice } from "@reduxjs/toolkit";

const listSlice=createSlice({

    name:"lists",

    initialState:{

    },

    reducers:{
        setLists:(state, action)=>{
            state[action.payload.boardId]=action.payload.lists;
        },

        addList:(state, action)=>{
            state[action.payload.boardId].push(action.payload.list)
        }
    }

})

export const {setLists, addList} =listSlice.actions;
export default listSlice.reducer;