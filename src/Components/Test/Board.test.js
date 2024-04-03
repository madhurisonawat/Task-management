import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // For custom matchers like toHaveTextContent
import Board from '../Board';

// Mocked data for testing
const mockBoard = {
  id: 1,
  title: 'Test Board',
  cards: [
    { id: '1', text: 'Task 1' },
    { id: '2', text: 'Task 2' },
  ],
};
const mockBoards = [mockBoard];
const mockSetBoards = jest.fn();

describe('Board component', () => {
  it('should render board title and list of cards', () => {
    const { getByText } = render(<Board board={mockBoard} boards={mockBoards} setBoards={mockSetBoards} />);
    expect(screen.getByText('Test Board')).toBeInTheDocument();
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
  });

  it('should add a new card to the list', () => {
    const { getByText } = render(<Board board={mockBoard} boards={mockBoards} setBoards={mockSetBoards} />);
    const addButton = screen.getByText('Add Task');
    fireEvent.click(addButton);
    expect(mockSetBoards).toHaveBeenCalled();
  });
});


