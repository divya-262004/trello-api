import axios from "axios";

const apiKey=import.meta.env.VITE_TRELLO_API_KEY;
const token=import.meta.env.VITE_TRELLO_TOKEN;

export const getBoards=()=>{
    return axios.get("https://api.trello.com/1/members/me/boards",{
        params:{
            key:apiKey,
            token,
        },
    });
}

export const createBoard=(boardName)=>{
    return axios.post("https://api.trello.com/1/boards", null,{
        params:{
            name:boardName,
            key:apiKey,
            token,
        }
    })
}

export const getLists=(boardId)=>{
    return axios.get(`https://api.trello.com/1/boards/${boardId}/lists`,{
        params:{
            key:apiKey,
            token,
        }
    });
    
}

export const getCards=(listId)=>{
    return axios.get(`https://api.trello.com/1/lists/${listId}/cards`,{
        params:{
            key:apiKey,
            token,
        }
    })
}

export const createList=(listName, boardId)=>{
    return axios.post("https://api.trello.com/1/lists", null,{
        params:{
            name:listName,
            idBoard:boardId,
            pos:"bottom",
            key:apiKey,
            token,
        }
    })
}

export const deleteList=(listId)=>{
    return axios.delete(`https://api.trello.com/1/lists/${listId}`,{
        params:{
            key:apiKey,
            token,
        }
    })
}

export const closeList = (listId) => {
  return axios.put(
    `https://api.trello.com/1/lists/${listId}/closed`,
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

export const createCard=(listId, cardName)=>{
    return axios.post(`https://api.trello.com/1/cards`, null,{
        params:{
            name:cardName,
            idList:listId,
            pos:"bottom",
            key:apiKey,
            token,
        }
    })
}

export const createCheckList=(cardId, checkListName)=>{
    return axios.post("https://api.trello.com/1/checklists",null,{
        params:{
           
            idCard:cardId,
            name:checkListName,
            key:apiKey,
            token,

        }
    })
}

export const getCheckLists = (cardId) => {
  return axios.get(
    `https://api.trello.com/1/cards/${cardId}/checklists`,
    {
      params: {
        key: apiKey,
        token,
      },
    }
  );
};

export const deleteChecklist = (checklistId) => {
  return axios.delete(
    `https://api.trello.com/1/checklists/${checklistId}`,
    {
      params: {
        key: apiKey,
        token,
      },
    }
  );
};

export const getCheckItems = (checklistId) => {
  return axios.get(
    `https://api.trello.com/1/checklists/${checklistId}/checkItems`,
    {
      params: {
        key: apiKey,
        token,
      },
    }
  );
};

export const createCheckItem = (checklistId, itemName) => {
  return axios.post(
    `https://api.trello.com/1/checklists/${checklistId}/checkItems`,
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

export const updateCheckItem = (cardId, itemId, state) => {
  return axios.put(
    `https://api.trello.com/1/cards/${cardId}/checkItem/${itemId}`,
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

export const deleteCheckItem = (checklistId, itemId) => {
  return axios.delete(
    `https://api.trello.com/1/checklists/${checklistId}/checkItems/${itemId}`,
    {
      params: {
        key: apiKey,
        token,
      },
    }
  );
};