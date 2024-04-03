import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import List from '../List';

describe('List', () => {
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

  it('should render list with cards', () => {
    const { getByText } = render(
      <List list={list} boards={boards} setBoards={setBoards} handleAddCard={handleAddCard} handleDeleteCard={handleDeleteCard} />
    );
    expect(screen.getByText('Task 1')).toBeTruthy();
    expect(screen.getByText('Task 2')).toBeTruthy();
  });

  it('should handle input changes for adding a new task', () => {
    const { getByPlaceholderText } = render(
      <List list={list} boards={boards} setBoards={setBoards} handleAddCard={handleAddCard} handleDeleteCard={handleDeleteCard} />
    );
    fireEvent.change(screen.getByPlaceholderText('Enter list name'), { target: { value: 'New Task' } });
    fireEvent.change(screen.getByPlaceholderText('Enter description'), { target: { value: 'New Task Description' } });
    fireEvent.change(screen.getByPlaceholderText('Enter deadline'), { target: { value: '2023-01-01' } });
    expect(screen.getByPlaceholderText('Enter list name').value).toBe('New Task');
    expect(screen.getByPlaceholderText('Enter description').value).toBe('New Task Description');
    expect(screen.getByPlaceholderText('Enter deadline').value).toBe('2023-01-01');
  });
it('Calls handleAddCard on "Add Task" button click', () => {
    const mockHandleAddCard = jest.fn();
    const mockList = { id: 1, cards: [] };
    render(<List list={mockList} handleAddCard={mockHandleAddCard} />);

    const textInput = screen.getByPlaceholderText('Enter list name');
    fireEvent.change(textInput, { target: { value: 'New Task' } });
    const descriptionInput = screen.getByPlaceholderText('Enter description');
    fireEvent.change(descriptionInput, { target: { value: 'New Task Description' } });
    const deadlineInput = screen.getByPlaceholderText('Enter deadline');  // Assuming a deadline input exists
    fireEvent.change(deadlineInput, { target: { value: '2023-01-01' } });

    const addButton = screen.getByTestId(`add-task-button-${mockList.id}`);
    fireEvent.click(addButton);
    expect(mockHandleAddCard).toHaveBeenCalledWith(mockList.id,  {
        text: 'New Task',
        description: 'New Task Description',
        deadline: '2023-01-01',
      });
});
});
