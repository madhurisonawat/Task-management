import React, { useEffect, useState } from 'react';
import TaskModal from './TaskModal';
import './style.css'

const Card = ({ card, listId, handleDeleteCard, setBoards, boards }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState({});
    useEffect(()=>{
        setEditedTask(card)
    },[])
const handleSave = () => {
    const updatedBoards = boards.map((b) => {
      if (b.id === listId) {
        const updatedCards = b.cards.map((card) => {
          if (card.id === editedTask.id) {
            return {
              ...card,
              text: editedTask.text
            };
          }
          return card; 
        });
        return { ...b, cards: updatedCards };
      }
      return b; 
    });
    setBoards(updatedBoards); 
    setIsEditing(false);
    localStorage.setItem('boards', JSON.stringify(updatedBoards));
  };
  const handleDeleteClick = () => {
    handleDeleteCard(listId, card.id);
  };


  return (
    <div className="card">
        <div className='tableBox'>
        <div className='taskBoxHeader'>
        <p>Name</p>
        <p>Description</p>
        <p>Deadline</p>
        </div>
        <div className='taskBoxData'>
        <p>{card.text}</p>
        <p>{card.description}</p>
        <p>{card.deadline}</p>
        </div>
        </div>
     
      <button data-testid= {`delete-button-${card.id}`}className='deleteButton'onClick={handleDeleteClick}>Delete</button>
      <button className='editButton'onClick={() => setIsEditing(true)}>Edit</button>
      {isEditing && (
        <TaskModal
          task={editedTask}
          setTask={setEditedTask}
          onSave={handleSave}
          onCancel={() => setIsEditing(false)}
        />
      )}
    </div>
  );
};

export default Card;
