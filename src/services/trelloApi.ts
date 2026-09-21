import axios from "axios";
import type { 
  Board, 
  TrelloCard,
  TrelloList,
  TrelloCheckItem,
  TrelloChecklist,
  CheckItemState } from "../types";
const apiKey=import.meta.env.VITE_TRELLO_API_KEY;
const token=import.meta.env.VITE_TRELLO_TOKEN;
const baseUrl=import.meta.env.VITE_TRELLO_URL;

export const getBoards=()=>{
    return axios.get<Board[]>(`${baseUrl}/members/me/boards`,{
        params:{
            key:apiKey,
            token,
        },
    });
}

export const createBoard=(boardName: string)=>{
    return axios.post<Board>(`${baseUrl}/boards`, null,{
        params:{
            name:boardName,
            key:apiKey,
            token,
        }
    })
}

export const getLists=(boardId : string)=>{
    return axios.get<TrelloList[]>(`${baseUrl}/boards/${boardId}/lists`,{
        params:{
            key:apiKey,
            token,
        }
    });
    
}

export const getCards=(listId : string)=>{
    return axios.get<TrelloCard[]>(`${baseUrl}/lists/${listId}/cards`,{
        params:{
            key:apiKey,
            token,
        }
    })
}

export const createList=(listName : string, boardId :string)=>{
    return axios.post<TrelloList>(`${baseUrl}/lists`, null,{
        params:{
            name:listName,
            idBoard:boardId,
            pos:"bottom",
            key:apiKey,
            token,
        }
    })
}

export const closeList = (listId:string) => {
  return axios.put(
    `${baseUrl}/lists/${listId}/closed`,
    null,
    {
      params: {
        value: true,
        key: apiKey,
        token,
      },
    }
  );
};

export const createCard=(listId:string, cardName :string)=>{
    return axios.post<TrelloCard>(`${baseUrl}/cards`, null,{
        params:{
            name:cardName,
            idList:listId,
            pos:"bottom",
            key:apiKey,
            token,
        }
    })
}

export const createCheckList=(cardId : string, checkListName:string)=>{
    return axios.post<TrelloChecklist>(`${baseUrl}/checklists`,null,{
        params:{
           
            idCard:cardId,
            name:checkListName,
            key:apiKey,
            token,

        }
    })
}

export const getCheckLists = (cardId:string) => {
  return axios.get<TrelloChecklist[]>(
    `${baseUrl}/cards/${cardId}/checklists`,
    {
      params: {
        key: apiKey,
        token,
      },
    }
  );
};

export const deleteChecklist = (checklistId :string) => {
  return axios.delete(
    `${baseUrl}/checklists/${checklistId}`,
    {
      params: {
        key: apiKey,
        token,
      },
    }
  );
};

export const getCheckItems = (checklistId:string) => {
  return axios.get<TrelloCheckItem[]>(
    `${baseUrl}/checklists/${checklistId}/checkItems`,
    {
      params: {
        key: apiKey,
        token,
      },
    }
  );
};

export const createCheckItem = (checklistId:string, itemName:string) => {
  return axios.post<TrelloCheckItem>(
    `${baseUrl}/checklists/${checklistId}/checkItems`,
    null,
    {
      params: {
        name: itemName,
        pos: "bottom",
        key: apiKey,
        token,
      },
    }
  );
};

export const updateCheckItem = (cardId:string, itemId :string, state:CheckItemState) => {
  return axios.put(
    `${baseUrl}/cards/${cardId}/checkItem/${itemId}`,
    null,
    {
      params: {
        state,
        key: apiKey,
        token,
      },
    }
  );
};

export const deleteCheckItem = (checklistId:string, itemId:string) => {
  return axios.delete(
    `${baseUrl}/checklists/${checklistId}/checkItems/${itemId}`,
    {
      params: {
        key: apiKey,
        token,
      },
    }
  );
};