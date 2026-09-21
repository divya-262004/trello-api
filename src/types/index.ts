export interface Board{
    id:string;
    name:string;
}

export interface TrelloList{
    id:string;
    name:string;
    idBoard:string;
}

export interface TrelloCard{
    id: string;
    name:string;
    idList:string;
}

export interface TrelloChecklist{
    id:string;
    name:string;
    idCard:string;
}

export type CheckItemState="complete" | "incomplete";

export interface TrelloCheckItem{
    id:string;
    name:string;
    state:CheckItemState;
}