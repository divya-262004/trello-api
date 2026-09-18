import axios from "axios";

const apiKey=import.meta.env.VITE_TRELLO_API_KEY;
const token=import.meta.env.VITE_TRELLO_TOKEN;
const baseUrl=import.meta.env.VITE_TRELLO_URL;

export const getBoards=()=>{
    return axios.get(`${baseUrl}/members/me/boards`,{
        params:{
            key:apiKey,
            token,
        },
    });
}

export const createBoard=(boardName)=>{
    return axios.post(`${baseUrl}/boards`, null,{
        params:{
            name:boardName,
            key:apiKey,
            token,
        }
    })
}

export const getLists=(boardId)=>{
    return axios.get(`${baseUrl}/boards/${boardId}/lists`,{
        params:{
            key:apiKey,
            token,
        }
    });
    
}

export const getCards=(listId)=>{
    return axios.get(`${baseUrl}/lists/${listId}/cards`,{
        params:{
            key:apiKey,
            token,
        }
    })
}

export const createList=(listName, boardId)=>{
    return axios.post(`${baseUrl}/lists`, null,{
        params:{
            name:listName,
            idBoard:boardId,
            pos:"bottom",
            key:apiKey,
            token,
        }
    })
}

export const closeList = (listId) => {
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

export const createCard=(listId, cardName)=>{
    return axios.post(`${baseUrl}/cards`, null,{
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
    return axios.post(`${baseUrl}/checklists`,null,{
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
    `${baseUrl}/cards/${cardId}/checklists`,
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
    `${baseUrl}/checklists/${checklistId}`,
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
    `${baseUrl}/checklists/${checklistId}/checkItems`,
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

export const updateCheckItem = (cardId, itemId, state) => {
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

export const deleteCheckItem = (checklistId, itemId) => {
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