import {createSlice} from '@reduxjs/toolkit';

const checkItemSlice=createSlice({
  name: 'items',
  initialState: {},
  reducers: {

    setItems: (state, action)=>{
      state[action.payload.checklistId]=action.payload.items;
    },

    addItem: (state, action)=>{
      state[action.payload.checklistId].push(action.payload.item);
    },


    updateItem: (state, action)=>{
      const {checklistId, itemId, state: newSate}=action.payload;

      const item=state[checklistId].find(
          (item)=>item.id===itemId,

      );

      item.state=newSate;
    },

    removeItem: (state, action)=>{
      const {checklistId, itemId}=action.payload;

      state[checklistId]=state[checklistId].filter(
          (item)=>item.id!==itemId,
      );
    },

  },
});

export const {setItems, addItem, updateItem, removeItem}=checkItemSlice.actions;
export default checkItemSlice.reducer;
