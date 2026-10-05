import {useNavigate} from 'react-router-dom';
import {Button, Card, Flex, Input, Typography, Modal, message} from 'antd';
import {getBoards, createBoard} from '../services/trelloApi';
import {useState, useEffect} from 'react';
import {setBoards, addBoard} from '../store/slices/boardSlice';

import {useSelector, useDispatch} from 'react-redux';

const BoardsPage = () => {
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);

  const [isModalOpen, setModalOpen] = useState(false);
  const [boardName, setBoardName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const response = await getBoards();

        dispatch(setBoards(response.data));
      } catch {
        message.error('Failed to fetxh boards');
      }
    };

    fetchBoards();
  }, [dispatch]);

  async function handleCreateBoard() {
    if (!boardName.trim()) {
      return;
    }
    try {
      const response = await createBoard(boardName);
      message.success('Created Board');

      setBoardName('');
      setModalOpen(false);

      dispatch(addBoard(response.data));
    } catch {
      message.error('Failed to create board');
    }
  }
  return (
    <div>
      <div className="flex justify-center pt-10">
        <Card className="w-90 shadow-2xl">
          <div className="flex flex-col items-center gap-5 p-4">
            <Typography.Title level={3}>Create a new Board</Typography.Title>
            <Button
              type="primary"
              style={{
                width: '150px',
                display: 'flex',
                gap: '10px',
                justifyContent: 'center',
                padding: '16px',
                fontSize: '16px',
                fontWeight: 600,
              }}
              onClick={() => setModalOpen(true)}
            >
              <span>+</span>
              <span>Create Board</span>
            </Button>
          </div>
        </Card>
      </div>

      <Modal
        title="Board title"
        open={isModalOpen}
        onCancel={() => setModalOpen(false)}
        onOk={handleCreateBoard}
        okText="Create"
      >
        <div className="pt-5 pb-2">
          <Input
            size="large"
            placeholder="Enter board name"
            value={boardName}
            onChange={(e) => setBoardName(e.target.value)}
          />
        </div>
      </Modal>

      <div className="mt-10 pl-10">
        <Flex gap="middle" wrap>
          {boards.map((board) => (
            <Card
              key={board.id}
              hoverable
              onClick={() => navigate(`/boards/${board.id}`)}
              className="w-70 !bg-blue-600"
            >
              <Typography.Title level={5} className="ml-[30%]">
                {board.name}
              </Typography.Title>
            </Card>
          ))}
        </Flex>
      </div>
    </div>
  );
};

export default BoardsPage;
