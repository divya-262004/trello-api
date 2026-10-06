import {useParams} from 'react-router-dom';
import {
  getLists,
  createList,
  closeList,
} from '../services/trelloApi';
import {useState, useEffect} from 'react';
import BoardList from '../components/BoardList';
import {Button, Flex, message} from 'antd';

const BoardPage = () => {
  const {boardId} = useParams();
  const [lists, setLists] = useState([]);
  const [isAddingList, setIsAddingList] = useState(false);
  const [listName, setListName] = useState('');

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const response = await getLists(boardId);
        setLists(response.data);
      } catch {
        message.error('Failed to Fetch Lists');
      }
    };
    fetchLists();
  }, [boardId]);

  const handleCreateList = async () => {
    if (!listName.trim()) {
      return;
    }

    try {
      await createList(listName, boardId);
      setListName('');
      setIsAddingList(false);

      const response = await getLists(boardId);
      setLists(response.data);

      message.success('List Added');
    } catch {
      message.error('Failed to Create List');
    }
  };

  const handleDeleteList = async (listId) => {
    try {
      await closeList(listId);

      message.success('List Deleted');

      setLists((prevLists) => prevLists.filter((list) => list.id !== listId));
    } catch {
      message.error('Failed to delete list');
    }
  };
  return (
    <Flex
      gap="middle"
      wrap={false}
      className="items-start overflow-x-auto hide-scrollbar  p-5! min-h-screen bg-blue-900"
    >
      {lists.map((list) => (
        <BoardList key={list.id} list={list} onDelete={handleDeleteList} />
      ))}

      {isAddingList ? (
        <div className="w-60! shrink-0">
          <input
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            placeholder="Enter list title..."
            className="w-full rounded-md border p-2"
            autoFocus
          />

          <div className="mt-2 flex gap-2">
            <Button type="primary" onClick={handleCreateList}>
              Add List
            </Button>

            <Button
              onClick={() => {
                setIsAddingList(false);
                setListName('');
              }}
            >
              ✕
            </Button>
          </div>
        </div>
      ) : (
        <Button
          size="large"
          className="w-60!
         text-white!
         font-semibold
          bg-gray-400!"
          onClick={() => setIsAddingList(true)}
        >
          + Add another list
        </Button>
      )}
    </Flex>
  );
};

export default BoardPage;
