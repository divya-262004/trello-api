import { Button, Input, message, Modal } from "antd";
import { useEffect, useState } from "react";
import {
  getCheckLists,
  createCheckList,
  deleteChecklist,
} from "../services/trelloApi";
import Checklist from "./Checklist";

const Card = ({ card }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [checklists, setChecklists] = useState([]);
  const [isAddingChecklist, setIsAddingChecklist] = useState(false);
  const [checklistName, setChecklistName] = useState("");


  const fetchChecklists = async () => {
    try {
      const response = await getCheckLists(card.id);
      setChecklists(response.data);
    } catch{
      message.error("Failed to fetch checklists");
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      fetchChecklists();
    }
  }, [isModalOpen]);


  const handleCreateChecklist = async () => {
    if (!checklistName.trim()) return;

    try {
      await createCheckList(card.id, checklistName);

      await fetchChecklists();

      setChecklistName("");
      setIsAddingChecklist(false);

      message.success("Checklist created");
    } catch (error) {
      message.error("Failed to create checklist");
    }
  };

  const handleDeleteChecklist = async (checklistId) => {
    try {
      await deleteChecklist(checklistId);

      setChecklists((prev) =>
        prev.filter((checklist) => checklist.id !== checklistId),
      );

      message.success("Checklist deleted");
    } catch{
      message.error("Failed to delete checklist");
    }
  };

  return (
    <>
    
      <div
        className="cursor-pointer rounded-lg bg-white p-3 shadow-sm"
        onClick={() => setIsModalOpen(true)}
      >
        {card.name}
      </div>

      <Modal
        title={card.name}
        open={isModalOpen}
        footer={null}
        onCancel={() => setIsModalOpen(false)}
      >
    
        {checklists.map((checklist) => (
          <Checklist
            key={checklist.id}
            checklist={checklist}
            cardId={card.id}
            onDelete={handleDeleteChecklist}
          />
        ))}

        {isAddingChecklist ? (
          <div className="flex flex-col gap-2">
            <Input
              placeholder="Checklist"
              value={checklistName}
              onChange={(e) => setChecklistName(e.target.value)}
              onPressEnter={handleCreateChecklist}
              autoFocus
            />

            <div className="flex gap-3">
              <Button
                type="primary"
                onClick={handleCreateChecklist}
              >
                Add
              </Button>

              <Button
                onClick={() => {
                  setIsAddingChecklist(false);
                  setChecklistName("");
                }}
              >
                ✕
              </Button>
            </div>
          </div>
        ) : (
          <Button onClick={() => setIsAddingChecklist(true)}>
            + Add Checklist
          </Button>
        )}
      </Modal>
    </>
  );
};

export default Card;

