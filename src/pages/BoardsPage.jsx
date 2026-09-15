import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Flex, Input, Typography, Modal } from "antd";
import { getBoards, createBoard } from "../services/trelloApi";
import { useState, useEffect } from "react";
import { message } from "antd";

const BoardsPage = () => {
  const [boards, setBoards] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [boardName, setBoardName] = useState("");
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchBoards = async () => {
      const response = await getBoards();

      setBoards(response.data);
    };

    fetchBoards();
  }, []);

  async function handleCreateBoard() {
    if (!boardName.trim()) {
      return;
    }
    try {
      await createBoard(boardName);
      message.success("Created Board")

      setBoardName("");
      setModalOpen(false);

      const response = await getBoards();
      setBoards(response.data);
    } catch (error) {
      console.log("Failed to create board", error);
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
                width: "150px",
                display: "flex",
                gap: "10px",
                justifyContent: "center",
                padding: "16px",
                fontSize: "16px",
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
