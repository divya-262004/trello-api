import { Button, Input, message, Modal } from "antd";
import { useEffect, useState } from "react";
import {
  getCheckLists,
  createCheckList,
  deleteChecklist,
  deleteCard,
} from "../services/trelloApi";
import Checklist from "./Checklist";
import { removeCard } from "../store/slices/cardSlice";
import {
  setChecklists,
  addChecklist,
  removeChecklist,
} from "../store/slices/checklistSlice";
import { useDispatch, useSelector } from "react-redux";

import type { TrelloCard } from "../types";
import type { RootState, AppDispatch } from "../store/store";

const Card = ({ card }: { card: TrelloCard }) => {
  const dispatch: AppDispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const checklists = useSelector(
    (state: RootState) => state.checklists[card.id],
  );
  const [isAddingChecklist, setIsAddingChecklist] = useState(false);
  const [checklistName, setChecklistName] = useState("");

  const fetchChecklists = async () => {
    try {
      const response = await getCheckLists(card.id);
      dispatch(
        setChecklists({
          cardId: card.id,
          checklists: response.data,
        }),
      );
    } catch {
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
      const response = await createCheckList(card.id, checklistName);

      dispatch(
        addChecklist({
          cardId: card.id,
          checklist: response.data,
        }),
      );

      setChecklistName("");
      setIsAddingChecklist(false);

      message.success("Checklist created");
    } catch {
      message.error("Failed to create checklist");
    }
  };

  const handleDeleteChecklist = async (checklistId: string) => {
    try {
      await deleteChecklist(checklistId);

      dispatch(
        removeChecklist({
          cardId: card.id,
          checklistId,
        }),
      );

      message.success("Checklist deleted");
    } catch {
      message.error("Failed to delete checklist");
    }
  };

  const handleDeleteCard = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.stopPropagation();

    try {
      await deleteCard(card.id);

      dispatch(
        removeCard({
          listId: card.idList,
          cardId: card.id,
        }),
      );

      message.success("Card deleted");
    } catch {
      message.error("Failed to delete card");
    }
  };

  return (
    <>
      <div
        className="flex justify-between cursor-pointer rounded-lg bg-white p-3 shadow-sm"
        onClick={() => setIsModalOpen(true)}
      >
        <span>{card.name}</span>

        <Button 
          type="text" 
          className="text-gray-500!" 
          onClick={handleDeleteCard}>
          ✕
        </Button>
      </div>

      <Modal
        title={card.name}
        open={isModalOpen}
        footer={null}
        onCancel={() => setIsModalOpen(false)}
      >
        {(checklists || []).map((checklist) => (
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
              <Button type="primary" onClick={handleCreateChecklist}>
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
