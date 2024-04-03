import React from 'react';
import List from './List';
import { v4 as uuid } from 'uuid';

const Board = ({ board, boards, setBoards }) => {
  const handleAddCard = (listId, text) => {
    const updatedBoards = boards.map((b) => {
      if (b.id === listId) {
        return {
          ...b,
          cards: [...b.cards, { id: uuid(), ...text }],
        };
      }
      return b;
    });
    setBoards(updatedBoards);
    localStorage.setItem('boards', JSON.stringify(updatedBoards));
  };

  const handleDeleteCard = (listId, cardId) => {
    const updatedBoards = boards.map((b) => {
      if (b.id === listId) {
        return {
          ...b,
          cards: b.cards.filter((card) => card.id !== cardId),
        };
      }
      return b;
    });
    setBoards(updatedBoards);
    localStorage.setItem('boards', JSON.stringify(updatedBoards));
  };
  return (
    <div className="board">
      <h2>{board.title}</h2>
      <List
        list={board}
        boards={boards}
        setBoards={setBoards}
        handleAddCard={handleAddCard}
        handleDeleteCard={handleDeleteCard}
      />
    </div>
  );
};

export default Board;
