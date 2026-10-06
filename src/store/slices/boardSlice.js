import {createSlice} from '@reduxjs/toolkit';

const boardSlice=createSlice({
  name: 'boards',
  initialState: [],
  reducers: {
    setBoards: (state, action)=>{
      return action.payload;
    },

    addBoard: (state, action)=>{
      state.push(action.payload);
    },
  },
});

export const {setBoards, addBoard}=boardSlice.actions;
export default boardSlice.reducer;
