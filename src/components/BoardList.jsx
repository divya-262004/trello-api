import { Button, Input, message } from "antd";
import { useEffect, useState } from "react";
import { getCards, createCard } from "../services/trelloApi";
import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { setCards, addCard } from "../store/slices/cardSlice";

const BoardList = ({ list, onDelete }) => {
  const dispatch = useDispatch();

  const cards = useSelector((state) => state.cards[list.id] || []);
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [cardName, setCardName] = useState("");

  const fetchCards = async () => {
    try {
      const response = await getCards(list.id);

      dispatch(
        setCards({
          listId: list.id,
          cards: response.data,
        }),
      );
    } catch (error) {
      message.error("Failed to fetch cards");
    }
  };

  useEffect(() => {
    fetchCards();
  }, [list.id]);

  const handleCreateCard = async () => {
    if (!cardName.trim()) return;

    try {
      const response =await createCard(list.id, cardName);

      dispatch(addCard({
        listId:list.id,
        card:response.data
      }))

      setCardName("");
      setIsAddingCard(false);

      message.success("Card added");
    } catch (error) {
      message.error("Failed to create card");
    }
  };

  return (
    <div className="w-60 shrink-0 rounded-lg bg-gray-200 p-3">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-semibold">{list.name}</h3>

        <button
          type="button"
          onClick={() => onDelete(list.id)}
          className="rounded p-1 text-gray-500 hover:bg-gray-300 hover:text-gray-800"
        >
          ✕
        </button>
      </div>

      <div className="flex flex-col gap-2">
        {cards.map((card) => (
          <Card key={card.id} card={card} />
        ))}

        {isAddingCard ? (
          <div className="flex flex-col gap-2">
            <Input
              value={cardName}
              placeholder="Enter a title..."
              onChange={(e) => setCardName(e.target.value)}
              onPressEnter={handleCreateCard}
              autoFocus
            />

            <div className="flex gap-3">
              <Button type="primary" onClick={handleCreateCard}>
                Add Card
              </Button>

              <Button
                onClick={() => {
                  setIsAddingCard(false);
                  setCardName("");
                }}
              >
                ✕
              </Button>
            </div>
          </div>
        ) : (
          <Button
            className="!bg-gray-300"
            onClick={() => setIsAddingCard(true)}
          >
            + Add Card
          </Button>
        )}
      </div>
    </div>
  );
};

export default BoardList;
