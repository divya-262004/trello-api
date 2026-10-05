import {createSlice} from '@reduxjs/toolkit';

const cardSlice=createSlice({
  name: 'cards',
  initialState: {},
  reducers: {
    setCards: (state, action)=>{
      state[action.payload.listId]=action.payload.cards;
    },
    addCard: (state, action)=>{
      state[action.payload.listId].push(action.payload.card);
    },
    removeCard: (state, action) => {
      const {listId, cardId} = action.payload;

      state[listId] = state[listId].filter(
          (card) => card.id !== cardId,
      );
    },
  },
});

export const {setCards, addCard, removeCard}=cardSlice.actions;
export default cardSlice.reducer;
