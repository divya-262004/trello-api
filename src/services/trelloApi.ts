import axios from "axios";
import type { 
  Board, 
  TrelloCard,
  TrelloList,
  TrelloCheckItem,
  TrelloChecklist,
  CheckItemState } from "../types";
  
import {config} from "../config/config"

const trelloApi=axios.create({
  baseURL: config.baseUrl,
  params: {
    key: config.apiKey,
    token: config.token,
  },
})

export const getBoards=()=>{
    return trelloApi.get<Board[]>("/members/me/boards")      
}

export const createBoard=(boardName: string)=>{
    return trelloApi.post<Board>("/boards", null,{
        params:{
            name:boardName,
            
        }
    })
}

export const getLists=(boardId : string)=>{
    return trelloApi.get<TrelloList[]>(`/boards/${boardId}/lists`);
    
}

export const getCards=(listId : string)=>{
    return trelloApi.get<TrelloCard[]>(`/lists/${listId}/cards`)
}

export const createList=(listName : string, boardId :string)=>{
    return trelloApi.post<TrelloList>("/lists", null,{
        params:{
            name:listName,
            idBoard:boardId,
            pos:"bottom",
        
        }
    })
}

export const closeList = (listId:string) => {
  return trelloApi.put( `/lists/${listId}/closed`, null,
    {
      params: {
        value: true,
      },
    }
  );
};

export const createCard=(listId:string, cardName :string)=>{
    return trelloApi.post<TrelloCard>("/cards", null,{
        params:{
            name:cardName,
            idList:listId,
            pos:"bottom",
            
        }
    })
}

export const deleteCard = (cardId: string) => {
  return trelloApi.delete(`/cards/${cardId}`);
};

export const createCheckList=(cardId : string, checkListName:string)=>{
    return trelloApi.post<TrelloChecklist>("/checklists",null,{
        params:{
           
            idCard:cardId,
            name:checkListName,

        }
    })
}

export const getCheckLists = (cardId:string) => {
  return trelloApi.get<TrelloChecklist[]>(`/cards/${cardId}/checklists`);
};

export const deleteChecklist = (checklistId :string) => {
  return trelloApi.delete(`/checklists/${checklistId}`);
};

export const getCheckItems = (checklistId:string) => {
  return trelloApi.get<TrelloCheckItem[]>(`/checklists/${checklistId}/checkItems`);
};

export const createCheckItem = (
  checklistId: string,
  itemName: string,
) => {
  return trelloApi.post<TrelloCheckItem>(
    `/checklists/${checklistId}/checkItems`,
    null,
    {
      params: {
        name: itemName,
        pos: "bottom",
      },
    },
  );
};

export const updateCheckItem = (
  cardId: string,
  itemId: string,
  state: CheckItemState,
) => {
  return trelloApi.put(
    `/cards/${cardId}/checkItem/${itemId}`,
    null,
    {
      params: {
        state,
      },
    },
  );
};

export const deleteCheckItem = (
  checklistId: string,
  itemId: string,
) => {
  return trelloApi.delete(
    `/checklists/${checklistId}/checkItems/${itemId}`,
  );
};