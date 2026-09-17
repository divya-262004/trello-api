import { Button, Input, message } from "antd";
import { useEffect, useState } from "react";
import {
  getCheckItems,
  createCheckItem,
  updateCheckItem,
  deleteCheckItem,
} from "../services/trelloApi";

const Checklist = ({ checklist, cardId, onDelete }) => {
  const [items, setItems] = useState([]);
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [itemName, setItemName] = useState("");

  const fetchItems = async () => {
    try {
      const response = await getCheckItems(checklist.id);
      setItems(response.data);
    } catch (error) {
      message.error("Failed to fetch checklist items");
    }
  };

  useEffect(() => {
    fetchItems();
  }, [checklist.id]);

  const handleCreateItem = async () => {
    if (!itemName.trim()) return;

    try {
      await createCheckItem(checklist.id, itemName);

      await fetchItems();

      setItemName("");
      setIsAddingItem(false);

      message.success("Item added");
    } catch (error) {
      message.error("Failed to create checklist item");
    }
  };

  const handleToggleItem = async (item) => {
    try {
      const newState = item.state === "complete" ? "incomplete" : "complete";

      await updateCheckItem(cardId, item.id, newState);

      await fetchItems();
    } catch (error) {
      message.error("Failed to update checklist item");
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      await deleteCheckItem(checklist.id, itemId);

      await fetchItems();

      message.success("Item deleted");
    } catch (error) {
      message.error("Failed to delete checklist item");
    }
  };

  const completedItems = items.filter(
    (item) => item.state === "complete",
  ).length;

  const progress =
    items.length === 0 ? 0 : Math.round((completedItems / items.length) * 100);

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between">
        <p className="font-semibold">{checklist.name}</p>

        <Button type="text" danger onClick={() => onDelete(checklist.id)}>
          ✕
        </Button>
      </div>

      <div className="mt-2 mb-3 flex items-center gap-3">
        <span className="text-sm text-gray-500">{progress}%</span>

        <div className="h-2 flex-1 rounded-full bg-gray-300">
          <div
            className={`h-2 rounded-full ${
              progress === 100 ? "bg-green-500" : "bg-blue-500"
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="mt-2">
        {items.map((item) => (
          <div
            key={item.id}
            className="group/item mb-2 flex items-center gap-2"
          >
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={item.state === "complete"}
                onChange={() => handleToggleItem(item)}
              />

              <span
                className={
                  item.state === "complete" ? "text-gray-400 line-through" : ""
                }
              >
                {item.name}
              </span>
            </div>

            <Button
              type="text"
              danger
              onClick={() => handleDeleteItem(item.id)}
              className="opacity-0! group-hover/item:opacity-100!"
            >
              x
            </Button>
          </div>
        ))}

        {isAddingItem ? (
          <div className="mt-2">
            <Input
              placeholder="Add an item"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              onPressEnter={handleCreateItem}
              autoFocus
            />

            <div className="mt-2 flex gap-2">
              <Button type="primary" onClick={handleCreateItem}>
                Add
              </Button>

              <Button
                type="text"
                onClick={() => {
                  setIsAddingItem(false);
                  setItemName("");
                }}
              >
                x
              </Button>
            </div>
          </div>
        ) : (
          <Button onClick={() => setIsAddingItem(true)}>+ Add an item</Button>
        )}
      </div>
    </div>
  );
};

export default Checklist;
