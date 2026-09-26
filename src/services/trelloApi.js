import axios from "axios";
import {config} from "../config/config";

const trelloApi=axios.create(
  {
    baseURL:config.baseUrl,
    params:{
      key:config.apiKey,
      token:config.token
    }
  }
)

export const getBoards=()=>{
    return trelloApi.get(`/members/me/boards`);  
}

export const createBoard=(boardName)=>{
 
    return trelloApi.post("/boards", null, {
      params:{
        name:boardName,
      },
    })
}

export const getLists=(boardId)=>{

    return trelloApi.get(`/boards/${boardId}/lists`)  
}

export const getCards=(listId)=>{

    return trelloApi.get(`/lists/${listId}/cards`)
}

export const createList=(listName, boardId)=>{
 
    return trelloApi.post("/lists", null,{
      params:{
        name:listName,
        idBoard:boardId,
        pos:"bottom",
      }
    })
}

export const closeList = (listId) => {

  return trelloApi.put(`/lists/${listId}/closed`,null,{
    params:{
      value: true,
    }
  })
};

export const createCard=(listId, cardName)=>{
   
    return trelloApi.post("/cards", null,{
      params:{
        name:cardName,
        idList:listId,
        pos:"bottom",
      }
    })
}

export const createCheckList=(cardId, checkListName)=>{
 
    return trelloApi.post("/checklists", null,{
      params:{
        idCard:cardId,
        name:checkListName,
      }
    })
}

export const getCheckLists = (cardId) => {

  return trelloApi.get(`/cards/${cardId}/checklists`)
};

export const deleteChecklist = (checklistId) => {

  return trelloApi.delete(`/checklists/${checklistId}`)
};

export const getCheckItems = (checklistId) => {

  return trelloApi.get(`/checklists/${checklistId}/checkItems`)
};

export const createCheckItem = (checklistId, itemName) => {

  return trelloApi.post(`/checklists/${checklistId}/checkItems`, null,{
    params:{
      name: itemName,
       pos: "bottom",
    }
  })
};

export const updateCheckItem = (cardId, itemId, state) => {

  return trelloApi.put(`/cards/${cardId}/checkItem/${itemId}`,null,{
    params:{
      state,
    }
  })
};

export const deleteCheckItem = (checklistId, itemId) => {

  return trelloApi.delete(`/checklists/${checklistId}/checkItems/${itemId}`)
};