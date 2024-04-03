import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import List from '../List';

describe('List component', () => {
  const list = {
    id: 1,
    title: 'To Do',
    cards: [
      { id: 1, text: 'Task 1', description: 'Description for Task 1', deadline: '2022-12-31' },
      { id: 2, text: 'Task 2', description: 'Description for Task 2', deadline: '2022-12-31' },
    ],
  };
  const boards = [];
  const setBoards = jest.fn();
  const handleAddCard = jest.fn();
  const handleDeleteCard = jest.fn();

  it('renders the list with cards', () => {
    const { getByText } = render(
      <List list={list} boards={boards} setBoards={setBoards} handleAddCard={handleAddCard} handleDeleteCard={handleDeleteCard} />
    );
    expect(screen.getByText('Task 1')).toBeTruthy();
    expect(screen.getByText('Task 2')).toBeTruthy();
  });

  it('calls handleAddCard on "Add Task" button click', () => {
    const { getByText } = render(
      <List list={list} boards={boards} setBoards={setBoards} handleAddCard={handleAddCard} handleDeleteCard={handleDeleteCard} />
    );
    fireEvent.change(screen.getByPlaceholderText('Enter task name'), { target: { value: 'New Task' } });
    fireEvent.change(screen.getByPlaceholderText('Enter description'), { target: { value: 'New Task Description' } });
  
    fireEvent.click(screen.getByPlaceholderText('Select Deadline'));
    fireEvent.click(screen.getByText('10')); 

    const addTaskButton = screen.getByText('Add Task');
    fireEvent.click(addTaskButton);

    expect(handleAddCard).toHaveBeenCalled();
    expect(handleAddCard).toHaveBeenCalledWith(list.id, expect.objectContaining({
      text: 'New Task',
      description: 'New Task Description',
      deadline: expect.any(String),
    }));
  });
});
