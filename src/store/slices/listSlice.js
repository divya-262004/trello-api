import {createSlice} from '@reduxjs/toolkit';

const listSlice=createSlice({

  name: 'lists',

  initialState: {

  },

  reducers: {
    setLists: (state, action)=>{
      state[action.payload.boardId]=action.payload.lists;
    },

    addList: (state, action)=>{
      state[action.payload.boardId].push(action.payload.list);
    },

    removeList: (state, action)=>{
      const {boardId, listId}=action.payload;

      state[boardId]=state[boardId].filter((list)=>list.id!==listId);
    },
  },

});

export const {setLists, addList, removeList} =listSlice.actions;
export default listSlice.reducer;
