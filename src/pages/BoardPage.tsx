import { useParams } from "react-router-dom";
import {
  getLists,
  createList,
  closeList,
} from "../services/trelloApi";
import { useState, useEffect } from "react";
import BoardList from "../components/BoardList";
import { Button, Flex, message, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setLists, addList, removeList } from "../store/slices/listSlice";
import type { RootState, AppDispatch } from "../store/store";

const BoardPage = () => {
  const { boardId } = useParams<{boardId:string}>();

  const dispatch: AppDispatch= useDispatch();
  const lists = useSelector((state:RootState) => state.lists[boardId??""]);

  const [isAddingList, setIsAddingList] = useState(false);
  const [listName, setListName] = useState("");

  useEffect(() => {
    if(!boardId) return ;
    const fetchLists = async () => {
      try{
        const response = await getLists(boardId);
      dispatch(
        setLists({
          boardId,
          lists: response.data,
        }),
      );
    }catch(error){
      message.error("Failed to fetch lists");
    }
      }
      
    fetchLists();
  }, [boardId]);

  const handleCreateList = async () => {
    if (!boardId||!listName.trim()) {
      return;
    }

    try {
      const response= await createList(listName, boardId);
      setListName("");
      setIsAddingList(false);

      
      dispatch(addList({
        boardId,
        list:response.data}));

      message.success("List Added");
    } catch (error) {
      message.error("Failed to Create List");
    }
  };

  const handleDeleteList = async (listId:string) => {
    if(!boardId) return;
    try {
      await closeList(listId);
   
      message.success("List Deleted");

      dispatch(removeList({
        boardId,
        listId
      }))

    } catch (error) {
      message.error("Failed to delete list");
    }
  };
  return (
    <Flex
      gap="middle"
      wrap={false}
      className="items-start overflow-x-auto pb-4 hide-scrollbar  !p-5 min-h-screen bg-blue-800"
    >
      {(lists||[]).map((list) => (
        <BoardList key={list.id} list={list} onDelete={handleDeleteList} />
      ))}

      {isAddingList ? (
        <div className="!w-60 shrink-0">
          <Input
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            placeholder="Enter list title..."
            className="w-full rounded-md border p-2"
            autoFocus
            onPressEnter={handleCreateList}
          />

          <div className="mt-2 flex gap-2">
            <Button type="primary" onClick={handleCreateList}>
              Add List
            </Button>

            <Button
              onClick={() => {
                setIsAddingList(false);
                setListName("");
              }}
            >
              ✕
            </Button>
          </div>
        </div>
      ) : (
        <Button
          size="large"
          className="!w-60 
         !text-white 
         font-semibold
          !bg-gray-400"
          onClick={() => setIsAddingList(true)}
          
        >
          + Add another list
        </Button>
      )}
    </Flex>
  );
};

export default BoardPage;
