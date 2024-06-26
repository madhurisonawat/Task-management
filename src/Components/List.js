import React, { useState } from 'react';
import Card from './Card';
import './style.css'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendarAlt } from 'react-icons/fa';
import {format} from 'date-fns'
import { forwardRef } from 'react';

const CustomDatePickerInput = forwardRef(({ value, onClick }, ref) => (
  <div className="custom-datepicker-input">
    <input
       ref={ref}
      type="text"
      value={value}
      onClick={onClick}
      readOnly
      placeholder="Select Deadline"
    />
    <FaCalendarAlt data-testid='calendar-icon'className="calendar-icon" onClick={onClick} />
  </div>
));

const List = ({ list, boards, setBoards, handleAddCard, handleDeleteCard }) => {
  const [newCardText, setNewCardText] = useState({
    text:'',
    description:'',
    deadline:''
  });
  const [selectedDate, setSelectedDate] = useState(null);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCardText((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };
  const handleAddClick = () => {
    let formattedDeadline = '';
    if (selectedDate) {
      formattedDeadline = format(selectedDate, 'yyyy-MM-dd');
    }
    const currentNewCardText = {
      text: newCardText.text,
      description: newCardText.description,
      deadline: formattedDeadline
    };
    handleAddCard(list.id, currentNewCardText);

    setNewCardText({
      text: '',
      description: '',
      deadline: '',
    });
  };
  return (
    <div className="list">
        {!list.cards.length>0?
      <div>No task</div>:
      list.cards.map((card) => (
        <Card key={card.id} card={card} listId={list.id} handleDeleteCard={handleDeleteCard}setBoards={setBoards}boards={boards} />
      ))
}
      <div className="new-card">
        <input type="text" name='text' placeholder={"Enter task name"}value={newCardText.text} onChange={handleInputChange} />
        <input type="text" name='description'placeholder={"Enter description"}value={newCardText.description} onChange={handleInputChange} />
        <DatePicker
      selected={selectedDate}
      onChange={(date) => setSelectedDate(date)}
      customInput={<CustomDatePickerInput />}
      dateFormat="yyyy-MM-dd"
      minDate={new Date()}
    />
        <button data-testid={`add-task-button-${list.id}`} onClick={handleAddClick}>Add Task</button>
      </div>
    </div>
  );
};

export default List;
